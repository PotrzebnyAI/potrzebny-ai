/**
 * Google Sheets API Service
 *
 * Full access to Google Sheets API for potrzebny.ai domain users.
 * Uses Domain-Wide Delegation for impersonation.
 *
 * Features:
 * - Read/write cell data
 * - Manage sheets within a spreadsheet
 * - Formatting and styling
 * - Named ranges
 * - Charts and filters
 * - Batch operations
 */

import { google, sheets_v4 } from 'googleapis'
import { createSheetsAuth, createAuthClient, GOOGLE_SCOPES } from './config'

// ===== TYPES =====

export type CellValue = string | number | boolean | null

export interface CellRange {
  sheetName?: string
  startRow: number
  startCol: number
  endRow?: number
  endCol?: number
}

export interface SheetInfo {
  sheetId: number
  title: string
  index: number
  rowCount: number
  columnCount: number
  hidden?: boolean
  frozenRowCount?: number
  frozenColumnCount?: number
}

export interface SpreadsheetInfo {
  spreadsheetId: string
  title: string
  locale: string
  timeZone: string
  sheets: SheetInfo[]
}

export interface CellFormat {
  backgroundColor?: { red: number; green: number; blue: number }
  textFormat?: {
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    underline?: boolean
    fontSize?: number
    foregroundColor?: { red: number; green: number; blue: number }
    fontFamily?: string
  }
  horizontalAlignment?: 'LEFT' | 'CENTER' | 'RIGHT'
  verticalAlignment?: 'TOP' | 'MIDDLE' | 'BOTTOM'
  wrapStrategy?: 'OVERFLOW_CELL' | 'CLIP' | 'WRAP'
  numberFormat?: {
    type: 'TEXT' | 'NUMBER' | 'PERCENT' | 'CURRENCY' | 'DATE' | 'TIME' | 'DATE_TIME' | 'SCIENTIFIC'
    pattern?: string
  }
}

// ===== HELPER FUNCTIONS =====

/**
 * Convert column number to letter (1 -> A, 27 -> AA)
 */
export function columnToLetter(column: number): string {
  let result = ''
  let n = column
  while (n > 0) {
    n--
    result = String.fromCharCode((n % 26) + 65) + result
    n = Math.floor(n / 26)
  }
  return result
}

/**
 * Convert column letter to number (A -> 1, AA -> 27)
 */
export function letterToColumn(letter: string): number {
  let result = 0
  for (let i = 0; i < letter.length; i++) {
    result = result * 26 + (letter.charCodeAt(i) - 64)
  }
  return result
}

/**
 * Convert CellRange to A1 notation
 */
export function rangeToA1(range: CellRange): string {
  const startCol = columnToLetter(range.startCol)
  const endCol = range.endCol ? columnToLetter(range.endCol) : startCol
  const endRow = range.endRow || range.startRow

  const a1Range = `${startCol}${range.startRow}:${endCol}${endRow}`

  if (range.sheetName) {
    // Escape single quotes in sheet name
    const escapedName = range.sheetName.replace(/'/g, "''")
    return `'${escapedName}'!${a1Range}`
  }

  return a1Range
}

// ===== SHEETS SERVICE CLASS =====

export class SheetsService {
  private sheets: sheets_v4.Sheets
  private userEmail: string

  constructor(userEmail: string, scopes?: string[]) {
    this.userEmail = userEmail
    const auth = scopes
      ? createAuthClient(userEmail, scopes)
      : createSheetsAuth(userEmail)
    this.sheets = google.sheets({ version: 'v4', auth })
  }

  // ===== SPREADSHEET OPERATIONS =====

  /**
   * Get spreadsheet metadata
   */
  async getSpreadsheet(spreadsheetId: string): Promise<SpreadsheetInfo> {
    const response = await this.sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: false,
    })

    const data = response.data
    return {
      spreadsheetId: data.spreadsheetId!,
      title: data.properties?.title || '',
      locale: data.properties?.locale || 'en_US',
      timeZone: data.properties?.timeZone || 'UTC',
      sheets: (data.sheets || []).map((s) => ({
        sheetId: s.properties?.sheetId || 0,
        title: s.properties?.title || '',
        index: s.properties?.index || 0,
        rowCount: s.properties?.gridProperties?.rowCount || 0,
        columnCount: s.properties?.gridProperties?.columnCount || 0,
        hidden: s.properties?.hidden || false,
        frozenRowCount: s.properties?.gridProperties?.frozenRowCount || undefined,
        frozenColumnCount: s.properties?.gridProperties?.frozenColumnCount || undefined,
      })),
    }
  }

  /**
   * Create a new spreadsheet
   */
  async createSpreadsheet(
    title: string,
    sheetTitles?: string[]
  ): Promise<SpreadsheetInfo> {
    const requestBody: sheets_v4.Schema$Spreadsheet = {
      properties: {
        title,
        locale: 'pl_PL',
        timeZone: 'Europe/Warsaw',
      },
    }

    if (sheetTitles && sheetTitles.length > 0) {
      requestBody.sheets = sheetTitles.map((sheetTitle, index) => ({
        properties: {
          title: sheetTitle,
          index,
        },
      }))
    }

    const response = await this.sheets.spreadsheets.create({
      requestBody,
    })

    return this.getSpreadsheet(response.data.spreadsheetId!)
  }

  /**
   * Rename a spreadsheet
   */
  async renameSpreadsheet(spreadsheetId: string, newTitle: string): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            updateSpreadsheetProperties: {
              properties: { title: newTitle },
              fields: 'title',
            },
          },
        ],
      },
    })
  }

  // ===== SHEET OPERATIONS =====

  /**
   * Add a new sheet to a spreadsheet
   */
  async addSheet(
    spreadsheetId: string,
    title: string,
    options?: {
      rowCount?: number
      columnCount?: number
    }
  ): Promise<SheetInfo> {
    const response = await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title,
                gridProperties: {
                  rowCount: options?.rowCount || 1000,
                  columnCount: options?.columnCount || 26,
                },
              },
            },
          },
        ],
      },
    })

    const addedSheet = response.data.replies?.[0]?.addSheet
    return {
      sheetId: addedSheet?.properties?.sheetId || 0,
      title: addedSheet?.properties?.title || title,
      index: addedSheet?.properties?.index || 0,
      rowCount: addedSheet?.properties?.gridProperties?.rowCount || 1000,
      columnCount: addedSheet?.properties?.gridProperties?.columnCount || 26,
    }
  }

  /**
   * Delete a sheet from a spreadsheet
   */
  async deleteSheet(spreadsheetId: string, sheetId: number): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ deleteSheet: { sheetId } }],
      },
    })
  }

  /**
   * Rename a sheet
   */
  async renameSheet(spreadsheetId: string, sheetId: number, newTitle: string): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            updateSheetProperties: {
              properties: { sheetId, title: newTitle },
              fields: 'title',
            },
          },
        ],
      },
    })
  }

  /**
   * Duplicate a sheet
   */
  async duplicateSheet(
    spreadsheetId: string,
    sheetId: number,
    newTitle?: string
  ): Promise<SheetInfo> {
    const response = await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            duplicateSheet: {
              sourceSheetId: sheetId,
              newSheetName: newTitle,
            },
          },
        ],
      },
    })

    const duplicatedSheet = response.data.replies?.[0]?.duplicateSheet
    return {
      sheetId: duplicatedSheet?.properties?.sheetId || 0,
      title: duplicatedSheet?.properties?.title || '',
      index: duplicatedSheet?.properties?.index || 0,
      rowCount: duplicatedSheet?.properties?.gridProperties?.rowCount || 0,
      columnCount: duplicatedSheet?.properties?.gridProperties?.columnCount || 0,
    }
  }

  // ===== DATA OPERATIONS =====

  /**
   * Read values from a range
   */
  async getValues(
    spreadsheetId: string,
    range: string
  ): Promise<CellValue[][]> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      valueRenderOption: 'UNFORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING',
    })

    return (response.data.values || []) as CellValue[][]
  }

  /**
   * Read values as formatted strings
   */
  async getFormattedValues(
    spreadsheetId: string,
    range: string
  ): Promise<string[][]> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      valueRenderOption: 'FORMATTED_VALUE',
    })

    return (response.data.values || []) as string[][]
  }

  /**
   * Read a single cell value
   */
  async getCellValue(
    spreadsheetId: string,
    sheetName: string,
    row: number,
    col: number
  ): Promise<CellValue> {
    const range = rangeToA1({ sheetName, startRow: row, startCol: col })
    const values = await this.getValues(spreadsheetId, range)
    return values[0]?.[0] ?? null
  }

  /**
   * Write values to a range
   */
  async setValues(
    spreadsheetId: string,
    range: string,
    values: CellValue[][]
  ): Promise<void> {
    await this.sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    })
  }

  /**
   * Write raw values (no parsing)
   */
  async setRawValues(
    spreadsheetId: string,
    range: string,
    values: CellValue[][]
  ): Promise<void> {
    await this.sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: { values },
    })
  }

  /**
   * Write a single cell value
   */
  async setCellValue(
    spreadsheetId: string,
    sheetName: string,
    row: number,
    col: number,
    value: CellValue
  ): Promise<void> {
    const range = rangeToA1({ sheetName, startRow: row, startCol: col })
    await this.setValues(spreadsheetId, range, [[value]])
  }

  /**
   * Append rows to a sheet
   */
  async appendRows(
    spreadsheetId: string,
    range: string,
    values: CellValue[][]
  ): Promise<{ updatedRange: string; updatedRows: number }> {
    const response = await this.sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values },
    })

    return {
      updatedRange: response.data.updates?.updatedRange || '',
      updatedRows: response.data.updates?.updatedRows || 0,
    }
  }

  /**
   * Clear values in a range
   */
  async clearValues(spreadsheetId: string, range: string): Promise<void> {
    await this.sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    })
  }

  /**
   * Batch get multiple ranges
   */
  async batchGetValues(
    spreadsheetId: string,
    ranges: string[]
  ): Promise<Map<string, CellValue[][]>> {
    const response = await this.sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
      valueRenderOption: 'UNFORMATTED_VALUE',
    })

    const result = new Map<string, CellValue[][]>()
    for (const valueRange of response.data.valueRanges || []) {
      if (valueRange.range) {
        result.set(valueRange.range, (valueRange.values || []) as CellValue[][])
      }
    }

    return result
  }

  /**
   * Batch update multiple ranges
   */
  async batchSetValues(
    spreadsheetId: string,
    data: Array<{ range: string; values: CellValue[][] }>
  ): Promise<void> {
    await this.sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data: data.map((d) => ({
          range: d.range,
          values: d.values,
        })),
      },
    })
  }

  // ===== ROW/COLUMN OPERATIONS =====

  /**
   * Insert rows
   */
  async insertRows(
    spreadsheetId: string,
    sheetId: number,
    startIndex: number,
    count: number
  ): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            insertDimension: {
              range: {
                sheetId,
                dimension: 'ROWS',
                startIndex,
                endIndex: startIndex + count,
              },
            },
          },
        ],
      },
    })
  }

  /**
   * Insert columns
   */
  async insertColumns(
    spreadsheetId: string,
    sheetId: number,
    startIndex: number,
    count: number
  ): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            insertDimension: {
              range: {
                sheetId,
                dimension: 'COLUMNS',
                startIndex,
                endIndex: startIndex + count,
              },
            },
          },
        ],
      },
    })
  }

  /**
   * Delete rows
   */
  async deleteRows(
    spreadsheetId: string,
    sheetId: number,
    startIndex: number,
    count: number
  ): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: 'ROWS',
                startIndex,
                endIndex: startIndex + count,
              },
            },
          },
        ],
      },
    })
  }

  /**
   * Delete columns
   */
  async deleteColumns(
    spreadsheetId: string,
    sheetId: number,
    startIndex: number,
    count: number
  ): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: 'COLUMNS',
                startIndex,
                endIndex: startIndex + count,
              },
            },
          },
        ],
      },
    })
  }

  // ===== FORMATTING =====

  /**
   * Format a range of cells
   */
  async formatRange(
    spreadsheetId: string,
    sheetId: number,
    range: CellRange,
    format: CellFormat
  ): Promise<void> {
    const cellFormat: sheets_v4.Schema$CellFormat = {}
    const fields: string[] = []

    if (format.backgroundColor) {
      cellFormat.backgroundColor = {
        red: format.backgroundColor.red,
        green: format.backgroundColor.green,
        blue: format.backgroundColor.blue,
      }
      fields.push('backgroundColor')
    }

    if (format.textFormat) {
      cellFormat.textFormat = {
        bold: format.textFormat.bold,
        italic: format.textFormat.italic,
        strikethrough: format.textFormat.strikethrough,
        underline: format.textFormat.underline,
        fontSize: format.textFormat.fontSize,
        fontFamily: format.textFormat.fontFamily,
      }
      if (format.textFormat.foregroundColor) {
        cellFormat.textFormat.foregroundColor = {
          red: format.textFormat.foregroundColor.red,
          green: format.textFormat.foregroundColor.green,
          blue: format.textFormat.foregroundColor.blue,
        }
      }
      fields.push('textFormat')
    }

    if (format.horizontalAlignment) {
      cellFormat.horizontalAlignment = format.horizontalAlignment
      fields.push('horizontalAlignment')
    }

    if (format.verticalAlignment) {
      cellFormat.verticalAlignment = format.verticalAlignment
      fields.push('verticalAlignment')
    }

    if (format.wrapStrategy) {
      cellFormat.wrapStrategy = format.wrapStrategy
      fields.push('wrapStrategy')
    }

    if (format.numberFormat) {
      cellFormat.numberFormat = format.numberFormat
      fields.push('numberFormat')
    }

    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: range.startRow - 1,
                endRowIndex: (range.endRow || range.startRow),
                startColumnIndex: range.startCol - 1,
                endColumnIndex: (range.endCol || range.startCol),
              },
              cell: { userEnteredFormat: cellFormat },
              fields: `userEnteredFormat(${fields.join(',')})`,
            },
          },
        ],
      },
    })
  }

  /**
   * Set column width
   */
  async setColumnWidth(
    spreadsheetId: string,
    sheetId: number,
    columnIndex: number,
    width: number
  ): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            updateDimensionProperties: {
              range: {
                sheetId,
                dimension: 'COLUMNS',
                startIndex: columnIndex,
                endIndex: columnIndex + 1,
              },
              properties: { pixelSize: width },
              fields: 'pixelSize',
            },
          },
        ],
      },
    })
  }

  /**
   * Set row height
   */
  async setRowHeight(
    spreadsheetId: string,
    sheetId: number,
    rowIndex: number,
    height: number
  ): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            updateDimensionProperties: {
              range: {
                sheetId,
                dimension: 'ROWS',
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              },
              properties: { pixelSize: height },
              fields: 'pixelSize',
            },
          },
        ],
      },
    })
  }

  /**
   * Freeze rows
   */
  async freezeRows(spreadsheetId: string, sheetId: number, count: number): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            updateSheetProperties: {
              properties: {
                sheetId,
                gridProperties: { frozenRowCount: count },
              },
              fields: 'gridProperties.frozenRowCount',
            },
          },
        ],
      },
    })
  }

  /**
   * Freeze columns
   */
  async freezeColumns(spreadsheetId: string, sheetId: number, count: number): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            updateSheetProperties: {
              properties: {
                sheetId,
                gridProperties: { frozenColumnCount: count },
              },
              fields: 'gridProperties.frozenColumnCount',
            },
          },
        ],
      },
    })
  }

  // ===== NAMED RANGES =====

  /**
   * Create a named range
   */
  async createNamedRange(
    spreadsheetId: string,
    name: string,
    sheetId: number,
    range: CellRange
  ): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addNamedRange: {
              namedRange: {
                name,
                range: {
                  sheetId,
                  startRowIndex: range.startRow - 1,
                  endRowIndex: (range.endRow || range.startRow),
                  startColumnIndex: range.startCol - 1,
                  endColumnIndex: (range.endCol || range.startCol),
                },
              },
            },
          },
        ],
      },
    })
  }

  /**
   * Delete a named range
   */
  async deleteNamedRange(spreadsheetId: string, namedRangeId: string): Promise<void> {
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ deleteNamedRange: { namedRangeId } }],
      },
    })
  }
}

// ===== CONVENIENCE FUNCTIONS =====

/**
 * Create a Sheets service instance for a user
 */
export function createSheetsService(userEmail: string): SheetsService {
  return new SheetsService(userEmail)
}

/**
 * Read data from a spreadsheet
 */
export async function readSheet(
  userEmail: string,
  spreadsheetId: string,
  range: string
): Promise<CellValue[][]> {
  const sheets = new SheetsService(userEmail)
  return sheets.getValues(spreadsheetId, range)
}

/**
 * Write data to a spreadsheet
 */
export async function writeSheet(
  userEmail: string,
  spreadsheetId: string,
  range: string,
  values: CellValue[][]
): Promise<void> {
  const sheets = new SheetsService(userEmail)
  await sheets.setValues(spreadsheetId, range, values)
}

/**
 * Append rows to a spreadsheet
 */
export async function appendToSheet(
  userEmail: string,
  spreadsheetId: string,
  sheetName: string,
  values: CellValue[][]
): Promise<void> {
  const sheets = new SheetsService(userEmail)
  await sheets.appendRows(spreadsheetId, sheetName, values)
}

/**
 * Create a new spreadsheet
 */
export async function createSpreadsheet(
  userEmail: string,
  title: string,
  sheetTitles?: string[]
): Promise<SpreadsheetInfo> {
  const sheets = new SheetsService(userEmail)
  return sheets.createSpreadsheet(title, sheetTitles)
}
