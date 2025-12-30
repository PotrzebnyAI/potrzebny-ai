/**
 * Gmail API Service
 *
 * Full access to Gmail API for potrzebny.ai domain users.
 * Uses Domain-Wide Delegation for impersonation.
 *
 * Features:
 * - Read/send emails
 * - Manage vacation/auto-reply settings
 * - Manage filters, labels, signatures
 * - Forward settings
 * - Draft management
 */

import { google, gmail_v1 } from 'googleapis'
import { createGmailAuth, createAuthClient, GOOGLE_SCOPES } from './config'

// ===== TYPES =====

export interface EmailAddress {
  name?: string
  email: string
}

export interface EmailMessage {
  to: EmailAddress[]
  cc?: EmailAddress[]
  bcc?: EmailAddress[]
  subject: string
  body: string
  isHtml?: boolean
  replyTo?: string
  attachments?: EmailAttachment[]
}

export interface EmailAttachment {
  filename: string
  mimeType: string
  content: string | Buffer // Base64 encoded or Buffer
}

export interface VacationSettings {
  enabled: boolean
  subject?: string
  message: string
  startTime?: Date
  endTime?: Date
  restrictToContacts?: boolean
  restrictToDomain?: boolean
}

export interface EmailFilter {
  from?: string
  to?: string
  subject?: string
  hasWords?: string
  excludeWords?: string
  addLabel?: string
  removeLabel?: string
  markAsRead?: boolean
  star?: boolean
  archive?: boolean
  delete?: boolean
  forward?: string
}

export interface EmailListOptions {
  query?: string
  maxResults?: number
  pageToken?: string
  labelIds?: string[]
  includeSpamTrash?: boolean
}

export interface ParsedEmail {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  from?: EmailAddress
  to?: EmailAddress[]
  cc?: EmailAddress[]
  subject?: string
  date?: Date
  body?: {
    plain?: string
    html?: string
  }
  attachments?: Array<{
    filename: string
    mimeType: string
    size: number
    attachmentId: string
  }>
}

// ===== GMAIL SERVICE CLASS =====

export class GmailService {
  private gmail: gmail_v1.Gmail
  private userEmail: string

  constructor(userEmail: string, scopes?: string[]) {
    this.userEmail = userEmail
    const auth = scopes
      ? createAuthClient(userEmail, scopes)
      : createGmailAuth(userEmail)
    this.gmail = google.gmail({ version: 'v1', auth })
  }

  // ===== PROFILE =====

  /**
   * Get user's Gmail profile
   */
  async getProfile(): Promise<gmail_v1.Schema$Profile> {
    const response = await this.gmail.users.getProfile({ userId: 'me' })
    return response.data
  }

  // ===== MESSAGES =====

  /**
   * List messages in the mailbox
   */
  async listMessages(options: EmailListOptions = {}): Promise<{
    messages: gmail_v1.Schema$Message[]
    nextPageToken?: string
  }> {
    const response = await this.gmail.users.messages.list({
      userId: 'me',
      q: options.query,
      maxResults: options.maxResults || 10,
      pageToken: options.pageToken,
      labelIds: options.labelIds,
      includeSpamTrash: options.includeSpamTrash,
    })

    return {
      messages: response.data.messages || [],
      nextPageToken: response.data.nextPageToken || undefined,
    }
  }

  /**
   * Get a single message by ID
   */
  async getMessage(
    messageId: string,
    format: 'minimal' | 'full' | 'raw' | 'metadata' = 'full'
  ): Promise<gmail_v1.Schema$Message> {
    const response = await this.gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format,
    })
    return response.data
  }

  /**
   * Parse a message into a more usable format
   */
  async getMessageParsed(messageId: string): Promise<ParsedEmail> {
    const message = await this.getMessage(messageId, 'full')
    return this.parseMessage(message)
  }

  /**
   * Get unread messages
   */
  async getUnreadMessages(maxResults = 10): Promise<ParsedEmail[]> {
    const { messages } = await this.listMessages({
      query: 'is:unread',
      maxResults,
    })

    const parsed: ParsedEmail[] = []
    for (const msg of messages) {
      if (msg.id) {
        parsed.push(await this.getMessageParsed(msg.id))
      }
    }
    return parsed
  }

  /**
   * Send an email
   */
  async sendEmail(email: EmailMessage): Promise<gmail_v1.Schema$Message> {
    const raw = this.createRawEmail(email)

    const response = await this.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(raw).toString('base64url'),
      },
    })

    return response.data
  }

  /**
   * Send a reply to a thread
   */
  async sendReply(
    threadId: string,
    messageId: string,
    email: Omit<EmailMessage, 'to'> & { to?: EmailAddress[] }
  ): Promise<gmail_v1.Schema$Message> {
    const originalMessage = await this.getMessage(messageId)
    const headers = this.getHeaders(originalMessage)

    // Get the original sender as the reply recipient
    const to = email.to || [this.parseEmailAddress(headers.from || '')]
    const subject = email.subject || `Re: ${headers.subject || ''}`

    const raw = this.createRawEmail({
      ...email,
      to,
      subject,
    }, {
      threadId,
      inReplyTo: headers.messageId,
      references: headers.messageId,
    })

    const response = await this.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(raw).toString('base64url'),
        threadId,
      },
    })

    return response.data
  }

  /**
   * Mark message as read
   */
  async markAsRead(messageId: string): Promise<void> {
    await this.gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: {
        removeLabelIds: ['UNREAD'],
      },
    })
  }

  /**
   * Mark message as unread
   */
  async markAsUnread(messageId: string): Promise<void> {
    await this.gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: {
        addLabelIds: ['UNREAD'],
      },
    })
  }

  /**
   * Archive a message (remove from inbox)
   */
  async archive(messageId: string): Promise<void> {
    await this.gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: {
        removeLabelIds: ['INBOX'],
      },
    })
  }

  /**
   * Move message to trash
   */
  async trash(messageId: string): Promise<void> {
    await this.gmail.users.messages.trash({
      userId: 'me',
      id: messageId,
    })
  }

  /**
   * Permanently delete a message
   */
  async delete(messageId: string): Promise<void> {
    await this.gmail.users.messages.delete({
      userId: 'me',
      id: messageId,
    })
  }

  // ===== LABELS =====

  /**
   * List all labels
   */
  async listLabels(): Promise<gmail_v1.Schema$Label[]> {
    const response = await this.gmail.users.labels.list({ userId: 'me' })
    return response.data.labels || []
  }

  /**
   * Create a new label
   */
  async createLabel(
    name: string,
    options?: {
      labelListVisibility?: 'labelShow' | 'labelHide' | 'labelShowIfUnread'
      messageListVisibility?: 'show' | 'hide'
      backgroundColor?: string
      textColor?: string
    }
  ): Promise<gmail_v1.Schema$Label> {
    const response = await this.gmail.users.labels.create({
      userId: 'me',
      requestBody: {
        name,
        labelListVisibility: options?.labelListVisibility,
        messageListVisibility: options?.messageListVisibility,
        color: options?.backgroundColor
          ? {
              backgroundColor: options.backgroundColor,
              textColor: options.textColor || '#000000',
            }
          : undefined,
      },
    })
    return response.data
  }

  /**
   * Add labels to a message
   */
  async addLabels(messageId: string, labelIds: string[]): Promise<void> {
    await this.gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: {
        addLabelIds: labelIds,
      },
    })
  }

  /**
   * Remove labels from a message
   */
  async removeLabels(messageId: string, labelIds: string[]): Promise<void> {
    await this.gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: {
        removeLabelIds: labelIds,
      },
    })
  }

  // ===== VACATION / AUTO-REPLY =====

  /**
   * Get vacation/auto-reply settings
   */
  async getVacationSettings(): Promise<VacationSettings> {
    const response = await this.gmail.users.settings.getVacation({ userId: 'me' })
    const data = response.data

    return {
      enabled: data.enableAutoReply || false,
      subject: data.responseSubject || undefined,
      message: data.responseBodyPlainText || data.responseBodyHtml || '',
      startTime: data.startTime ? new Date(parseInt(data.startTime)) : undefined,
      endTime: data.endTime ? new Date(parseInt(data.endTime)) : undefined,
      restrictToContacts: data.restrictToContacts || false,
      restrictToDomain: data.restrictToDomain || false,
    }
  }

  /**
   * Update vacation/auto-reply settings
   */
  async setVacationSettings(settings: VacationSettings): Promise<void> {
    await this.gmail.users.settings.updateVacation({
      userId: 'me',
      requestBody: {
        enableAutoReply: settings.enabled,
        responseSubject: settings.subject,
        responseBodyPlainText: settings.message,
        startTime: settings.startTime?.getTime().toString(),
        endTime: settings.endTime?.getTime().toString(),
        restrictToContacts: settings.restrictToContacts,
        restrictToDomain: settings.restrictToDomain,
      },
    })
  }

  /**
   * Disable vacation/auto-reply
   */
  async disableVacation(): Promise<void> {
    await this.setVacationSettings({
      enabled: false,
      message: '',
    })
  }

  // ===== SIGNATURE =====

  /**
   * Get send-as aliases (including signatures)
   */
  async getSendAsAliases(): Promise<gmail_v1.Schema$SendAs[]> {
    const response = await this.gmail.users.settings.sendAs.list({ userId: 'me' })
    return response.data.sendAs || []
  }

  /**
   * Get signature for primary email
   */
  async getSignature(): Promise<string> {
    const aliases = await this.getSendAsAliases()
    const primary = aliases.find((a) => a.isPrimary)
    return primary?.signature || ''
  }

  /**
   * Update signature for primary email
   */
  async setSignature(signature: string): Promise<void> {
    const profile = await this.getProfile()
    await this.gmail.users.settings.sendAs.update({
      userId: 'me',
      sendAsEmail: profile.emailAddress!,
      requestBody: {
        signature,
      },
    })
  }

  // ===== FILTERS =====

  /**
   * List all filters
   */
  async listFilters(): Promise<gmail_v1.Schema$Filter[]> {
    const response = await this.gmail.users.settings.filters.list({ userId: 'me' })
    return response.data.filter || []
  }

  /**
   * Create a filter
   */
  async createFilter(filter: EmailFilter): Promise<gmail_v1.Schema$Filter> {
    const response = await this.gmail.users.settings.filters.create({
      userId: 'me',
      requestBody: {
        criteria: {
          from: filter.from,
          to: filter.to,
          subject: filter.subject,
          query: filter.hasWords,
          negatedQuery: filter.excludeWords,
        },
        action: {
          addLabelIds: filter.addLabel ? [filter.addLabel] : undefined,
          removeLabelIds: filter.removeLabel ? [filter.removeLabel] : undefined,
          forward: filter.forward,
        },
      },
    })
    return response.data
  }

  /**
   * Delete a filter
   */
  async deleteFilter(filterId: string): Promise<void> {
    await this.gmail.users.settings.filters.delete({
      userId: 'me',
      id: filterId,
    })
  }

  // ===== DRAFTS =====

  /**
   * List drafts
   */
  async listDrafts(maxResults = 10): Promise<gmail_v1.Schema$Draft[]> {
    const response = await this.gmail.users.drafts.list({
      userId: 'me',
      maxResults,
    })
    return response.data.drafts || []
  }

  /**
   * Create a draft
   */
  async createDraft(email: EmailMessage): Promise<gmail_v1.Schema$Draft> {
    const raw = this.createRawEmail(email)

    const response = await this.gmail.users.drafts.create({
      userId: 'me',
      requestBody: {
        message: {
          raw: Buffer.from(raw).toString('base64url'),
        },
      },
    })
    return response.data
  }

  /**
   * Send a draft
   */
  async sendDraft(draftId: string): Promise<gmail_v1.Schema$Message> {
    const response = await this.gmail.users.drafts.send({
      userId: 'me',
      requestBody: {
        id: draftId,
      },
    })
    return response.data
  }

  // ===== THREADS =====

  /**
   * Get a thread with all messages
   */
  async getThread(threadId: string): Promise<gmail_v1.Schema$Thread> {
    const response = await this.gmail.users.threads.get({
      userId: 'me',
      id: threadId,
    })
    return response.data
  }

  /**
   * Archive a thread
   */
  async archiveThread(threadId: string): Promise<void> {
    await this.gmail.users.threads.modify({
      userId: 'me',
      id: threadId,
      requestBody: {
        removeLabelIds: ['INBOX'],
      },
    })
  }

  // ===== HELPER METHODS =====

  private createRawEmail(
    email: EmailMessage,
    options?: {
      threadId?: string
      inReplyTo?: string
      references?: string
    }
  ): string {
    const boundary = `boundary_${Date.now()}`
    const toHeader = email.to.map((a) => this.formatEmailAddress(a)).join(', ')
    const ccHeader = email.cc?.map((a) => this.formatEmailAddress(a)).join(', ')
    const bccHeader = email.bcc?.map((a) => this.formatEmailAddress(a)).join(', ')

    let headers = [
      `To: ${toHeader}`,
      `Subject: ${email.subject}`,
      `MIME-Version: 1.0`,
    ]

    if (ccHeader) headers.push(`Cc: ${ccHeader}`)
    if (bccHeader) headers.push(`Bcc: ${bccHeader}`)
    if (email.replyTo) headers.push(`Reply-To: ${email.replyTo}`)
    if (options?.inReplyTo) headers.push(`In-Reply-To: ${options.inReplyTo}`)
    if (options?.references) headers.push(`References: ${options.references}`)

    if (email.attachments && email.attachments.length > 0) {
      headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`)

      let body = headers.join('\r\n') + '\r\n\r\n'
      body += `--${boundary}\r\n`
      body += `Content-Type: ${email.isHtml ? 'text/html' : 'text/plain'}; charset="UTF-8"\r\n\r\n`
      body += email.body + '\r\n'

      for (const attachment of email.attachments) {
        const content =
          typeof attachment.content === 'string'
            ? attachment.content
            : attachment.content.toString('base64')

        body += `--${boundary}\r\n`
        body += `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"\r\n`
        body += `Content-Disposition: attachment; filename="${attachment.filename}"\r\n`
        body += `Content-Transfer-Encoding: base64\r\n\r\n`
        body += content + '\r\n'
      }

      body += `--${boundary}--`
      return body
    } else {
      headers.push(`Content-Type: ${email.isHtml ? 'text/html' : 'text/plain'}; charset="UTF-8"`)
      return headers.join('\r\n') + '\r\n\r\n' + email.body
    }
  }

  private formatEmailAddress(addr: EmailAddress): string {
    if (addr.name) {
      return `"${addr.name}" <${addr.email}>`
    }
    return addr.email
  }

  private parseEmailAddress(raw: string): EmailAddress {
    const match = raw.match(/"?([^"<]*)"?\s*<?([^>]+)>?/)
    if (match) {
      return {
        name: match[1]?.trim() || undefined,
        email: match[2]?.trim() || raw.trim(),
      }
    }
    return { email: raw.trim() }
  }

  private getHeaders(message: gmail_v1.Schema$Message): Record<string, string> {
    const headers: Record<string, string> = {}
    for (const header of message.payload?.headers || []) {
      if (header.name && header.value) {
        headers[header.name.toLowerCase()] = header.value
      }
    }
    return headers
  }

  private parseMessage(message: gmail_v1.Schema$Message): ParsedEmail {
    const headers = this.getHeaders(message)

    const result: ParsedEmail = {
      id: message.id!,
      threadId: message.threadId!,
      labelIds: message.labelIds || [],
      snippet: message.snippet || '',
      from: headers.from ? this.parseEmailAddress(headers.from) : undefined,
      to: headers.to?.split(',').map((e) => this.parseEmailAddress(e)),
      cc: headers.cc?.split(',').map((e) => this.parseEmailAddress(e)),
      subject: headers.subject,
      date: headers.date ? new Date(headers.date) : undefined,
      body: {},
      attachments: [],
    }

    // Parse body
    const payload = message.payload
    if (payload) {
      if (payload.mimeType === 'text/plain' && payload.body?.data) {
        result.body!.plain = Buffer.from(payload.body.data, 'base64').toString('utf-8')
      } else if (payload.mimeType === 'text/html' && payload.body?.data) {
        result.body!.html = Buffer.from(payload.body.data, 'base64').toString('utf-8')
      } else if (payload.parts) {
        for (const part of payload.parts) {
          if (part.mimeType === 'text/plain' && part.body?.data) {
            result.body!.plain = Buffer.from(part.body.data, 'base64').toString('utf-8')
          } else if (part.mimeType === 'text/html' && part.body?.data) {
            result.body!.html = Buffer.from(part.body.data, 'base64').toString('utf-8')
          } else if (part.filename && part.body?.attachmentId) {
            result.attachments!.push({
              filename: part.filename,
              mimeType: part.mimeType || 'application/octet-stream',
              size: part.body.size || 0,
              attachmentId: part.body.attachmentId,
            })
          }
        }
      }
    }

    return result
  }

  /**
   * Download an attachment
   */
  async getAttachment(messageId: string, attachmentId: string): Promise<Buffer> {
    const response = await this.gmail.users.messages.attachments.get({
      userId: 'me',
      messageId,
      id: attachmentId,
    })
    return Buffer.from(response.data.data || '', 'base64')
  }
}

// ===== CONVENIENCE FUNCTIONS =====

/**
 * Create a Gmail service instance for a user
 */
export function createGmailService(userEmail: string): GmailService {
  return new GmailService(userEmail)
}

/**
 * Send a quick email
 */
export async function sendEmail(
  fromUserEmail: string,
  to: string | string[],
  subject: string,
  body: string,
  options?: {
    isHtml?: boolean
    cc?: string[]
    bcc?: string[]
  }
): Promise<gmail_v1.Schema$Message> {
  const gmail = new GmailService(fromUserEmail)
  const toAddresses = (Array.isArray(to) ? to : [to]).map((email) => ({ email }))
  const ccAddresses = options?.cc?.map((email) => ({ email }))
  const bccAddresses = options?.bcc?.map((email) => ({ email }))

  return gmail.sendEmail({
    to: toAddresses,
    cc: ccAddresses,
    bcc: bccAddresses,
    subject,
    body,
    isHtml: options?.isHtml,
  })
}

/**
 * Set vacation auto-reply for a user
 */
export async function setVacation(
  userEmail: string,
  message: string,
  options?: {
    subject?: string
    startTime?: Date
    endTime?: Date
    restrictToContacts?: boolean
    restrictToDomain?: boolean
  }
): Promise<void> {
  const gmail = new GmailService(userEmail)
  await gmail.setVacationSettings({
    enabled: true,
    message,
    subject: options?.subject,
    startTime: options?.startTime,
    endTime: options?.endTime,
    restrictToContacts: options?.restrictToContacts,
    restrictToDomain: options?.restrictToDomain,
  })
}

/**
 * Disable vacation auto-reply for a user
 */
export async function disableVacation(userEmail: string): Promise<void> {
  const gmail = new GmailService(userEmail)
  await gmail.disableVacation()
}
