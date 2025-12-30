/**
 * Google Docs API Service
 *
 * Full access to Google Docs API for potrzebny.ai domain users.
 * Uses Domain-Wide Delegation for impersonation.
 *
 * Features:
 * - Create/read/update documents
 * - Insert/delete/replace text
 * - Formatting (bold, italic, colors, etc.)
 * - Insert images, tables, page breaks
 * - Find and replace
 * - Named styles and headers/footers
 */

import { google, docs_v1 } from 'googleapis'
import { createDocsAuth, createAuthClient, GOOGLE_SCOPES } from './config'

// ===== TYPES =====

export interface DocumentInfo {
  documentId: string
  title: string
  body: docs_v1.Schema$Body | null
  headers: Record<string, docs_v1.Schema$Header>
  footers: Record<string, docs_v1.Schema$Footer>
  namedStyles: docs_v1.Schema$NamedStyles | null
}

export interface TextStyle {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  fontSize?: number
  fontFamily?: string
  foregroundColor?: { red: number; green: number; blue: number }
  backgroundColor?: { red: number; green: number; blue: number }
  link?: string
}

export interface ParagraphStyle {
  alignment?: 'START' | 'CENTER' | 'END' | 'JUSTIFIED'
  lineSpacing?: number
  spaceAbove?: number
  spaceBelow?: number
  indentFirstLine?: number
  indentStart?: number
  indentEnd?: number
  namedStyleType?: 'NORMAL_TEXT' | 'TITLE' | 'SUBTITLE' | 'HEADING_1' | 'HEADING_2' | 'HEADING_3' | 'HEADING_4' | 'HEADING_5' | 'HEADING_6'
}

export interface TableSpec {
  rows: number
  columns: number
  columnWidths?: number[]
}

export interface InsertPosition {
  index?: number
  endOfSegment?: boolean
  atStart?: boolean
}

// ===== DOCS SERVICE CLASS =====

export class DocsService {
  private docs: docs_v1.Docs
  private userEmail: string

  constructor(userEmail: string, scopes?: string[]) {
    this.userEmail = userEmail
    const auth = scopes
      ? createAuthClient(userEmail, scopes)
      : createDocsAuth(userEmail)
    this.docs = google.docs({ version: 'v1', auth })
  }

  // ===== DOCUMENT OPERATIONS =====

  /**
   * Get a document
   */
  async getDocument(documentId: string): Promise<DocumentInfo> {
    const response = await this.docs.documents.get({ documentId })
    const doc = response.data

    return {
      documentId: doc.documentId!,
      title: doc.title!,
      body: doc.body || null,
      headers: doc.headers || {},
      footers: doc.footers || {},
      namedStyles: doc.namedStyles || null,
    }
  }

  /**
   * Create a new document
   */
  async createDocument(title: string): Promise<DocumentInfo> {
    const response = await this.docs.documents.create({
      requestBody: { title },
    })

    return {
      documentId: response.data.documentId!,
      title: response.data.title!,
      body: response.data.body || null,
      headers: response.data.headers || {},
      footers: response.data.footers || {},
      namedStyles: response.data.namedStyles || null,
    }
  }

  /**
   * Get document text content
   */
  async getDocumentText(documentId: string): Promise<string> {
    const doc = await this.getDocument(documentId)
    return this.extractText(doc.body)
  }

  /**
   * Get document structure (paragraphs, headings, etc.)
   */
  async getDocumentStructure(documentId: string): Promise<Array<{
    type: string
    text: string
    startIndex: number
    endIndex: number
  }>> {
    const doc = await this.getDocument(documentId)
    const structure: Array<{
      type: string
      text: string
      startIndex: number
      endIndex: number
    }> = []

    if (!doc.body?.content) return structure

    for (const element of doc.body.content) {
      if (element.paragraph) {
        const para = element.paragraph
        const namedStyleType = para.paragraphStyle?.namedStyleType || 'NORMAL_TEXT'
        const text = this.extractParagraphText(para)

        structure.push({
          type: namedStyleType,
          text,
          startIndex: element.startIndex || 0,
          endIndex: element.endIndex || 0,
        })
      } else if (element.table) {
        structure.push({
          type: 'TABLE',
          text: `[Table with ${element.table.tableRows?.length || 0} rows]`,
          startIndex: element.startIndex || 0,
          endIndex: element.endIndex || 0,
        })
      }
    }

    return structure
  }

  // ===== TEXT OPERATIONS =====

  /**
   * Insert text at a position
   */
  async insertText(
    documentId: string,
    text: string,
    position: InsertPosition = { endOfSegment: true }
  ): Promise<void> {
    let location: docs_v1.Schema$Location

    if (position.atStart) {
      location = { index: 1 }
    } else if (position.index !== undefined) {
      location = { index: position.index }
    } else {
      // Get document to find end position
      const doc = await this.getDocument(documentId)
      const endIndex = this.getEndIndex(doc.body)
      location = { index: endIndex }
    }

    await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location,
              text,
            },
          },
        ],
      },
    })
  }

  /**
   * Insert text with formatting
   */
  async insertFormattedText(
    documentId: string,
    text: string,
    style: TextStyle,
    position: InsertPosition = { endOfSegment: true }
  ): Promise<void> {
    // First insert the text
    let insertIndex: number

    if (position.atStart) {
      insertIndex = 1
    } else if (position.index !== undefined) {
      insertIndex = position.index
    } else {
      const doc = await this.getDocument(documentId)
      insertIndex = this.getEndIndex(doc.body)
    }

    await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: insertIndex },
              text,
            },
          },
          {
            updateTextStyle: {
              range: {
                startIndex: insertIndex,
                endIndex: insertIndex + text.length,
              },
              textStyle: this.mapTextStyle(style),
              fields: this.getTextStyleFields(style),
            },
          },
        ],
      },
    })
  }

  /**
   * Delete text in a range
   */
  async deleteText(documentId: string, startIndex: number, endIndex: number): Promise<void> {
    await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            deleteContentRange: {
              range: { startIndex, endIndex },
            },
          },
        ],
      },
    })
  }

  /**
   * Replace text in the document
   */
  async replaceText(
    documentId: string,
    searchText: string,
    replaceText: string,
    matchCase = true
  ): Promise<number> {
    const response = await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            replaceAllText: {
              containsText: {
                text: searchText,
                matchCase,
              },
              replaceText,
            },
          },
        ],
      },
    })

    return response.data.replies?.[0]?.replaceAllText?.occurrencesChanged || 0
  }

  /**
   * Find all occurrences of text
   */
  async findText(documentId: string, searchText: string): Promise<Array<{
    startIndex: number
    endIndex: number
  }>> {
    const content = await this.getDocumentText(documentId)
    const results: Array<{ startIndex: number; endIndex: number }> = []

    let index = 0
    while ((index = content.indexOf(searchText, index)) !== -1) {
      results.push({
        startIndex: index + 1, // Google Docs uses 1-based indexing
        endIndex: index + searchText.length + 1,
      })
      index += 1
    }

    return results
  }

  // ===== FORMATTING =====

  /**
   * Apply text style to a range
   */
  async applyTextStyle(
    documentId: string,
    startIndex: number,
    endIndex: number,
    style: TextStyle
  ): Promise<void> {
    await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            updateTextStyle: {
              range: { startIndex, endIndex },
              textStyle: this.mapTextStyle(style),
              fields: this.getTextStyleFields(style),
            },
          },
        ],
      },
    })
  }

  /**
   * Apply paragraph style to a range
   */
  async applyParagraphStyle(
    documentId: string,
    startIndex: number,
    endIndex: number,
    style: ParagraphStyle
  ): Promise<void> {
    await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            updateParagraphStyle: {
              range: { startIndex, endIndex },
              paragraphStyle: this.mapParagraphStyle(style),
              fields: this.getParagraphStyleFields(style),
            },
          },
        ],
      },
    })
  }

  /**
   * Make text bold
   */
  async makeBold(documentId: string, startIndex: number, endIndex: number): Promise<void> {
    await this.applyTextStyle(documentId, startIndex, endIndex, { bold: true })
  }

  /**
   * Make text italic
   */
  async makeItalic(documentId: string, startIndex: number, endIndex: number): Promise<void> {
    await this.applyTextStyle(documentId, startIndex, endIndex, { italic: true })
  }

  /**
   * Add a link to text
   */
  async addLink(
    documentId: string,
    startIndex: number,
    endIndex: number,
    url: string
  ): Promise<void> {
    await this.applyTextStyle(documentId, startIndex, endIndex, { link: url })
  }

  // ===== STRUCTURAL ELEMENTS =====

  /**
   * Insert a page break
   */
  async insertPageBreak(documentId: string, index?: number): Promise<void> {
    const insertIndex = index || (await this.getDocument(documentId).then(doc => this.getEndIndex(doc.body)))

    await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertPageBreak: {
              location: { index: insertIndex },
            },
          },
        ],
      },
    })
  }

  /**
   * Insert a section break
   */
  async insertSectionBreak(
    documentId: string,
    index?: number,
    type: 'NEXT_PAGE' | 'CONTINUOUS' = 'NEXT_PAGE'
  ): Promise<void> {
    const insertIndex = index || (await this.getDocument(documentId).then(doc => this.getEndIndex(doc.body)))

    await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertSectionBreak: {
              location: { index: insertIndex },
              sectionType: type,
            },
          },
        ],
      },
    })
  }

  /**
   * Insert a table
   */
  async insertTable(
    documentId: string,
    spec: TableSpec,
    index?: number
  ): Promise<void> {
    const insertIndex = index || (await this.getDocument(documentId).then(doc => this.getEndIndex(doc.body)))

    await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertTable: {
              location: { index: insertIndex },
              rows: spec.rows,
              columns: spec.columns,
            },
          },
        ],
      },
    })
  }

  /**
   * Insert an image from URL
   */
  async insertImage(
    documentId: string,
    imageUrl: string,
    index?: number,
    size?: { width: number; height: number }
  ): Promise<void> {
    const insertIndex = index || (await this.getDocument(documentId).then(doc => this.getEndIndex(doc.body)))

    const insertRequest: docs_v1.Schema$InsertInlineImageRequest = {
      location: { index: insertIndex },
      uri: imageUrl,
    }

    if (size) {
      insertRequest.objectSize = {
        width: { magnitude: size.width, unit: 'PT' },
        height: { magnitude: size.height, unit: 'PT' },
      }
    }

    await this.docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [{ insertInlineImage: insertRequest }],
      },
    })
  }

  // ===== BATCH OPERATIONS =====

  /**
   * Execute multiple updates in a single batch
   */
  async batchUpdate(
    documentId: string,
    requests: docs_v1.Schema$Request[]
  ): Promise<docs_v1.Schema$BatchUpdateDocumentResponse> {
    const response = await this.docs.documents.batchUpdate({
      documentId,
      requestBody: { requests },
    })
    return response.data
  }

  // ===== HELPER METHODS =====

  private extractText(body: docs_v1.Schema$Body | null): string {
    if (!body?.content) return ''

    let text = ''
    for (const element of body.content) {
      if (element.paragraph) {
        text += this.extractParagraphText(element.paragraph)
      } else if (element.table) {
        for (const row of element.table.tableRows || []) {
          for (const cell of row.tableCells || []) {
            if (cell.content) {
              for (const cellElement of cell.content) {
                if (cellElement.paragraph) {
                  text += this.extractParagraphText(cellElement.paragraph)
                }
              }
            }
          }
        }
      }
    }
    return text
  }

  private extractParagraphText(para: docs_v1.Schema$Paragraph): string {
    let text = ''
    for (const element of para.elements || []) {
      if (element.textRun) {
        text += element.textRun.content || ''
      }
    }
    return text
  }

  private getEndIndex(body: docs_v1.Schema$Body | null): number {
    if (!body?.content || body.content.length === 0) return 1

    const lastElement = body.content[body.content.length - 1]
    // Subtract 1 to insert before the final newline
    return Math.max(1, (lastElement.endIndex || 1) - 1)
  }

  private mapTextStyle(style: TextStyle): docs_v1.Schema$TextStyle {
    const result: docs_v1.Schema$TextStyle = {}

    if (style.bold !== undefined) result.bold = style.bold
    if (style.italic !== undefined) result.italic = style.italic
    if (style.underline !== undefined) result.underline = style.underline
    if (style.strikethrough !== undefined) result.strikethrough = style.strikethrough

    if (style.fontSize !== undefined) {
      result.fontSize = { magnitude: style.fontSize, unit: 'PT' }
    }

    if (style.fontFamily !== undefined) {
      result.weightedFontFamily = { fontFamily: style.fontFamily }
    }

    if (style.foregroundColor) {
      result.foregroundColor = {
        color: {
          rgbColor: {
            red: style.foregroundColor.red,
            green: style.foregroundColor.green,
            blue: style.foregroundColor.blue,
          },
        },
      }
    }

    if (style.backgroundColor) {
      result.backgroundColor = {
        color: {
          rgbColor: {
            red: style.backgroundColor.red,
            green: style.backgroundColor.green,
            blue: style.backgroundColor.blue,
          },
        },
      }
    }

    if (style.link) {
      result.link = { url: style.link }
    }

    return result
  }

  private getTextStyleFields(style: TextStyle): string {
    const fields: string[] = []

    if (style.bold !== undefined) fields.push('bold')
    if (style.italic !== undefined) fields.push('italic')
    if (style.underline !== undefined) fields.push('underline')
    if (style.strikethrough !== undefined) fields.push('strikethrough')
    if (style.fontSize !== undefined) fields.push('fontSize')
    if (style.fontFamily !== undefined) fields.push('weightedFontFamily')
    if (style.foregroundColor !== undefined) fields.push('foregroundColor')
    if (style.backgroundColor !== undefined) fields.push('backgroundColor')
    if (style.link !== undefined) fields.push('link')

    return fields.join(',')
  }

  private mapParagraphStyle(style: ParagraphStyle): docs_v1.Schema$ParagraphStyle {
    const result: docs_v1.Schema$ParagraphStyle = {}

    if (style.alignment !== undefined) result.alignment = style.alignment
    if (style.namedStyleType !== undefined) result.namedStyleType = style.namedStyleType

    if (style.lineSpacing !== undefined) {
      result.lineSpacing = style.lineSpacing
    }

    if (style.spaceAbove !== undefined) {
      result.spaceAbove = { magnitude: style.spaceAbove, unit: 'PT' }
    }

    if (style.spaceBelow !== undefined) {
      result.spaceBelow = { magnitude: style.spaceBelow, unit: 'PT' }
    }

    if (style.indentFirstLine !== undefined) {
      result.indentFirstLine = { magnitude: style.indentFirstLine, unit: 'PT' }
    }

    if (style.indentStart !== undefined) {
      result.indentStart = { magnitude: style.indentStart, unit: 'PT' }
    }

    if (style.indentEnd !== undefined) {
      result.indentEnd = { magnitude: style.indentEnd, unit: 'PT' }
    }

    return result
  }

  private getParagraphStyleFields(style: ParagraphStyle): string {
    const fields: string[] = []

    if (style.alignment !== undefined) fields.push('alignment')
    if (style.namedStyleType !== undefined) fields.push('namedStyleType')
    if (style.lineSpacing !== undefined) fields.push('lineSpacing')
    if (style.spaceAbove !== undefined) fields.push('spaceAbove')
    if (style.spaceBelow !== undefined) fields.push('spaceBelow')
    if (style.indentFirstLine !== undefined) fields.push('indentFirstLine')
    if (style.indentStart !== undefined) fields.push('indentStart')
    if (style.indentEnd !== undefined) fields.push('indentEnd')

    return fields.join(',')
  }
}

// ===== CONVENIENCE FUNCTIONS =====

/**
 * Create a Docs service instance for a user
 */
export function createDocsService(userEmail: string): DocsService {
  return new DocsService(userEmail)
}

/**
 * Create a new document
 */
export async function createDocument(
  userEmail: string,
  title: string,
  content?: string
): Promise<DocumentInfo> {
  const docs = new DocsService(userEmail)
  const doc = await docs.createDocument(title)

  if (content) {
    await docs.insertText(doc.documentId, content, { atStart: true })
  }

  return doc
}

/**
 * Read document text content
 */
export async function readDocument(userEmail: string, documentId: string): Promise<string> {
  const docs = new DocsService(userEmail)
  return docs.getDocumentText(documentId)
}

/**
 * Append text to a document
 */
export async function appendToDocument(
  userEmail: string,
  documentId: string,
  text: string
): Promise<void> {
  const docs = new DocsService(userEmail)
  await docs.insertText(documentId, text, { endOfSegment: true })
}

/**
 * Replace all occurrences of text in a document
 */
export async function replaceInDocument(
  userEmail: string,
  documentId: string,
  searchText: string,
  replaceText: string
): Promise<number> {
  const docs = new DocsService(userEmail)
  return docs.replaceText(documentId, searchText, replaceText)
}

/**
 * Create a document from a template by replacing placeholders
 */
export async function createFromTemplate(
  userEmail: string,
  templateDocId: string,
  newTitle: string,
  replacements: Record<string, string>
): Promise<DocumentInfo> {
  // First, use Drive to copy the template
  const { google: googleApi } = await import('googleapis')
  const auth = createDocsAuth(userEmail)
  const drive = googleApi.drive({ version: 'v3', auth })

  // Copy the template
  const copy = await drive.files.copy({
    fileId: templateDocId,
    requestBody: { name: newTitle },
  })

  const newDocId = copy.data.id!

  // Replace all placeholders
  const docs = new DocsService(userEmail)
  for (const [placeholder, value] of Object.entries(replacements)) {
    await docs.replaceText(newDocId, placeholder, value)
  }

  return docs.getDocument(newDocId)
}
