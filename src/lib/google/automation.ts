/**
 * Google Workspace Automation Orchestrator
 *
 * High-level automation functions that combine multiple Google APIs
 * for common workflows at potrzebny.ai
 *
 * Features:
 * - Smart email processing with AI-powered categorization
 * - Automated file organization
 * - Meeting scheduling and coordination
 * - Report generation and distribution
 * - Cross-service workflows
 */

import { GmailService, ParsedEmail, VacationSettings } from './gmail'
import { DriveService, DriveFile, MIME_TYPES } from './drive'
import { CalendarService, CalendarEvent } from './calendar'
import { SheetsService, CellValue } from './sheets'
import { DocsService } from './docs'
import { createFullAccessAuth } from './config'

// ===== TYPES =====

export interface AutomationContext {
  userEmail: string
  services: {
    gmail: GmailService
    drive: DriveService
    calendar: CalendarService
    sheets: SheetsService
    docs: DocsService
  }
}

export interface EmailAnalysis {
  email: ParsedEmail
  category: 'urgent' | 'normal' | 'newsletter' | 'notification' | 'spam'
  requiresResponse: boolean
  suggestedAction?: string
  summary?: string
}

export interface DailyDigest {
  date: Date
  emails: {
    total: number
    unread: number
    urgent: number
  }
  calendar: {
    events: number
    nextMeeting?: {
      summary: string
      start: Date
      attendees: number
    }
  }
  files: {
    recentlyModified: number
    sharedWithMe: number
  }
}

export interface WorkflowResult {
  success: boolean
  message: string
  data?: unknown
  errors?: string[]
}

// ===== AUTOMATION CONTEXT =====

/**
 * Create an automation context with all services initialized
 */
export function createAutomationContext(userEmail: string): AutomationContext {
  return {
    userEmail,
    services: {
      gmail: new GmailService(userEmail),
      drive: new DriveService(userEmail),
      calendar: new CalendarService(userEmail),
      sheets: new SheetsService(userEmail),
      docs: new DocsService(userEmail),
    },
  }
}

// ===== EMAIL AUTOMATION =====

/**
 * Process unread emails with categorization
 */
export async function processUnreadEmails(
  ctx: AutomationContext,
  options?: {
    maxEmails?: number
    autoLabel?: boolean
    urgentLabelId?: string
  }
): Promise<EmailAnalysis[]> {
  const { gmail } = ctx.services
  const maxEmails = options?.maxEmails || 50

  // Get unread emails
  const unreadEmails = await gmail.getUnreadMessages(maxEmails)
  const analyses: EmailAnalysis[] = []

  for (const email of unreadEmails) {
    // Simple categorization based on sender and content
    const analysis = categorizeEmail(email)
    analyses.push(analysis)

    // Auto-label urgent emails if configured
    if (options?.autoLabel && analysis.category === 'urgent' && options.urgentLabelId) {
      await gmail.addLabels(email.id, [options.urgentLabelId])
    }
  }

  return analyses
}

/**
 * Simple email categorization (can be enhanced with AI)
 */
function categorizeEmail(email: ParsedEmail): EmailAnalysis {
  const subject = email.subject?.toLowerCase() || ''
  const snippet = email.snippet.toLowerCase()
  const from = email.from?.email.toLowerCase() || ''

  // Check for urgent indicators
  const urgentKeywords = ['urgent', 'pilne', 'asap', 'immediately', 'natychmiast', 'ważne']
  const isUrgent = urgentKeywords.some((kw) => subject.includes(kw) || snippet.includes(kw))

  // Check for newsletter patterns
  const newsletterPatterns = ['unsubscribe', 'newsletter', 'weekly update', 'digest']
  const isNewsletter = newsletterPatterns.some((p) => snippet.includes(p))

  // Check for automated notifications
  const notificationPatterns = ['noreply', 'no-reply', 'notification', 'automated', 'alert']
  const isNotification = notificationPatterns.some((p) => from.includes(p) || subject.includes(p))

  // Determine category
  let category: EmailAnalysis['category'] = 'normal'
  if (isUrgent) category = 'urgent'
  else if (isNewsletter) category = 'newsletter'
  else if (isNotification) category = 'notification'

  // Check if response is likely needed
  const questionIndicators = ['?', 'please', 'could you', 'can you', 'would you', 'proszę', 'czy']
  const requiresResponse = !isNewsletter && !isNotification &&
    questionIndicators.some((q) => snippet.includes(q))

  return {
    email,
    category,
    requiresResponse,
    summary: email.snippet.slice(0, 200),
  }
}

/**
 * Set vacation auto-reply for a user
 */
export async function setVacationAutoReply(
  ctx: AutomationContext,
  settings: {
    message: string
    subject?: string
    startDate?: Date
    endDate?: Date
    restrictToContacts?: boolean
  }
): Promise<WorkflowResult> {
  try {
    const { gmail } = ctx.services
    await gmail.setVacationSettings({
      enabled: true,
      message: settings.message,
      subject: settings.subject,
      startTime: settings.startDate,
      endTime: settings.endDate,
      restrictToContacts: settings.restrictToContacts,
      restrictToDomain: false,
    })

    return {
      success: true,
      message: `Vacation auto-reply set for ${ctx.userEmail}`,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to set vacation auto-reply',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}

/**
 * Send a templated email
 */
export async function sendTemplatedEmail(
  ctx: AutomationContext,
  templateDocId: string,
  recipients: string[],
  subject: string,
  replacements: Record<string, string>
): Promise<WorkflowResult> {
  try {
    const { gmail, docs } = ctx.services

    // Get template content
    let content = await docs.getDocumentText(templateDocId)

    // Apply replacements
    for (const [key, value] of Object.entries(replacements)) {
      content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value)
    }

    // Send to each recipient
    for (const recipient of recipients) {
      await gmail.sendEmail({
        to: [{ email: recipient }],
        subject,
        body: content,
        isHtml: false,
      })
    }

    return {
      success: true,
      message: `Sent templated email to ${recipients.length} recipients`,
      data: { recipients },
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send templated emails',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}

// ===== FILE AUTOMATION =====

/**
 * Auto-organize files in a folder based on type
 */
export async function organizeFilesByType(
  ctx: AutomationContext,
  sourceFolderId: string,
  createSubfolders = true
): Promise<WorkflowResult> {
  try {
    const { drive } = ctx.services

    // Get files in source folder
    const files = await drive.listFolder(sourceFolderId)
    const organized: Record<string, DriveFile[]> = {}

    // Categorize files
    for (const file of files) {
      if (file.mimeType === MIME_TYPES.FOLDER) continue

      let category = 'Other'
      if (file.mimeType.includes('document') || file.mimeType.includes('word')) {
        category = 'Documents'
      } else if (file.mimeType.includes('spreadsheet') || file.mimeType.includes('excel')) {
        category = 'Spreadsheets'
      } else if (file.mimeType.includes('presentation') || file.mimeType.includes('powerpoint')) {
        category = 'Presentations'
      } else if (file.mimeType.includes('image')) {
        category = 'Images'
      } else if (file.mimeType.includes('pdf')) {
        category = 'PDFs'
      }

      if (!organized[category]) {
        organized[category] = []
      }
      organized[category].push(file)
    }

    // Create subfolders and move files
    if (createSubfolders) {
      for (const [category, categoryFiles] of Object.entries(organized)) {
        if (categoryFiles.length === 0) continue

        // Create subfolder
        const subfolder = await drive.createFolder(category, sourceFolderId)

        // Move files
        for (const file of categoryFiles) {
          await drive.moveFile(file.id, subfolder.id, sourceFolderId)
        }
      }
    }

    return {
      success: true,
      message: `Organized ${files.length} files into ${Object.keys(organized).length} categories`,
      data: Object.fromEntries(
        Object.entries(organized).map(([k, v]) => [k, v.length])
      ),
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to organize files',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}

/**
 * Backup important files to a designated folder
 */
export async function backupFiles(
  ctx: AutomationContext,
  sourceQuery: string,
  backupFolderId: string
): Promise<WorkflowResult> {
  try {
    const { drive } = ctx.services

    // Find files matching query
    const { files } = await drive.listFiles({ query: sourceQuery, pageSize: 100 })
    let backedUp = 0

    // Copy each file to backup folder
    for (const file of files) {
      const backupName = `${new Date().toISOString().split('T')[0]}_${file.name}`
      await drive.copyFile(file.id, backupName, backupFolderId)
      backedUp++
    }

    return {
      success: true,
      message: `Backed up ${backedUp} files`,
      data: { count: backedUp },
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to backup files',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}

// ===== CALENDAR AUTOMATION =====

/**
 * Schedule a recurring team meeting
 */
export async function scheduleRecurringMeeting(
  ctx: AutomationContext,
  config: {
    summary: string
    description?: string
    attendees: string[]
    durationMinutes: number
    recurrence: string
    preferredTime?: { hour: number; minute: number }
  }
): Promise<WorkflowResult> {
  try {
    const { calendar } = ctx.services

    // Find the first available slot
    const slot = await calendar.findFreeSlot(
      [ctx.userEmail, ...config.attendees],
      config.durationMinutes,
      {
        workingHoursStart: config.preferredTime?.hour || 9,
        workingHoursEnd: 17,
      }
    )

    if (!slot) {
      return {
        success: false,
        message: 'No available slot found in the next 7 days',
      }
    }

    // Create the event
    const event = await calendar.createEvent({
      summary: config.summary,
      description: config.description,
      start: slot.start,
      end: slot.end,
      attendees: config.attendees.map((email) => ({ email })),
      recurrence: [config.recurrence],
      conferenceData: true,
    })

    return {
      success: true,
      message: `Scheduled recurring meeting: ${config.summary}`,
      data: {
        eventId: event.id,
        start: slot.start,
        meetLink: event.conferenceData?.entryPoints?.[0]?.uri,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to schedule meeting',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}

/**
 * Get a daily calendar digest
 */
export async function getDailyCalendarDigest(
  ctx: AutomationContext
): Promise<{
  events: Array<{
    summary: string
    start: Date
    end: Date
    location?: string
    attendees: string[]
    meetLink?: string
  }>
  freeSlots: Array<{ start: Date; end: Date }>
}> {
  const { calendar } = ctx.services
  const events = await calendar.getTodayEvents()

  const mappedEvents = events.map((e) => ({
    summary: e.summary || 'No title',
    start: new Date(e.start?.dateTime || e.start?.date || ''),
    end: new Date(e.end?.dateTime || e.end?.date || ''),
    location: e.location || undefined,
    attendees: (e.attendees || []).map((a) => a.email || ''),
    meetLink: e.conferenceData?.entryPoints?.[0]?.uri || undefined,
  }))

  // Calculate free slots (simplified)
  const freeSlots: Array<{ start: Date; end: Date }> = []
  const now = new Date()
  const endOfDay = new Date(now)
  endOfDay.setHours(17, 0, 0, 0)

  let current = new Date(now)
  current.setHours(Math.max(9, now.getHours()), 0, 0, 0)

  for (const event of mappedEvents.sort((a, b) => a.start.getTime() - b.start.getTime())) {
    if (event.start > current && event.start < endOfDay) {
      freeSlots.push({ start: new Date(current), end: new Date(event.start) })
    }
    if (event.end > current) {
      current = new Date(event.end)
    }
  }

  if (current < endOfDay) {
    freeSlots.push({ start: current, end: endOfDay })
  }

  return { events: mappedEvents, freeSlots }
}

// ===== REPORT AUTOMATION =====

/**
 * Generate a weekly activity report
 */
export async function generateWeeklyReport(
  ctx: AutomationContext,
  options?: {
    spreadsheetId?: string
    sheetName?: string
  }
): Promise<WorkflowResult> {
  try {
    const { gmail, drive, calendar, sheets } = ctx.services
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Gather data
    const [emailStats, driveFiles, calendarEvents] = await Promise.all([
      // Email stats
      gmail.listMessages({ maxResults: 100 }).then((result) => ({
        total: result.messages.length,
      })),
      // Drive activity
      drive.listFiles({
        query: `modifiedTime > '${weekAgo.toISOString()}'`,
        pageSize: 100,
      }),
      // Calendar events
      calendar.listEvents({
        timeMin: weekAgo,
        timeMax: now,
      }),
    ])

    // Prepare report data
    const reportData: CellValue[][] = [
      ['Weekly Activity Report', '', '', ''],
      ['Period:', `${weekAgo.toLocaleDateString()} - ${now.toLocaleDateString()}`, '', ''],
      ['', '', '', ''],
      ['Metric', 'Count', 'Details', ''],
      ['Emails Received', emailStats.total, '', ''],
      ['Files Modified', driveFiles.files.length, '', ''],
      ['Calendar Events', calendarEvents.events.length, '', ''],
    ]

    if (options?.spreadsheetId) {
      // Update existing spreadsheet
      await sheets.setValues(
        options.spreadsheetId,
        `${options.sheetName || 'Report'}!A1`,
        reportData
      )

      return {
        success: true,
        message: 'Weekly report updated in spreadsheet',
        data: { spreadsheetId: options.spreadsheetId },
      }
    } else {
      // Create new spreadsheet
      const newSheet = await sheets.createSpreadsheet(
        `Weekly Report - ${now.toLocaleDateString()}`,
        ['Report']
      )
      await sheets.setValues(newSheet.spreadsheetId, 'Report!A1', reportData)

      return {
        success: true,
        message: 'Weekly report created',
        data: { spreadsheetId: newSheet.spreadsheetId },
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to generate weekly report',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}

// ===== CROSS-SERVICE WORKFLOWS =====

/**
 * Create a project workspace with folder, calendar, and document
 */
export async function createProjectWorkspace(
  ctx: AutomationContext,
  projectName: string,
  teamMembers: string[],
  kickoffDate?: Date
): Promise<WorkflowResult> {
  try {
    const { drive, calendar, docs } = ctx.services

    // Create project folder
    const projectFolder = await drive.createFolder(projectName)

    // Create subfolders
    const [documentsFolder, assetsFolder, deliveryFolder] = await Promise.all([
      drive.createFolder('Documents', projectFolder.id),
      drive.createFolder('Assets', projectFolder.id),
      drive.createFolder('Delivery', projectFolder.id),
    ])

    // Create project brief document
    const projectDoc = await docs.createDocument(`${projectName} - Project Brief`)
    await docs.insertText(projectDoc.documentId, `
# ${projectName}

## Project Overview
[Add project overview here]

## Team Members
${teamMembers.map((m) => `- ${m}`).join('\n')}

## Timeline
[Add project timeline here]

## Deliverables
[Add deliverables here]

## Notes
[Add notes here]
    `, { atStart: true })

    // Move document to project folder
    await drive.moveFile(projectDoc.documentId, documentsFolder.id)

    // Share folder with team members
    for (const member of teamMembers) {
      await drive.shareWithUser(projectFolder.id, member, 'writer')
    }

    // Schedule kickoff meeting if date provided
    let kickoffEvent
    if (kickoffDate) {
      const endDate = new Date(kickoffDate.getTime() + 60 * 60 * 1000) // 1 hour
      kickoffEvent = await calendar.createEvent({
        summary: `${projectName} - Kickoff Meeting`,
        description: `Kickoff meeting for project: ${projectName}`,
        start: kickoffDate,
        end: endDate,
        attendees: teamMembers.map((email) => ({ email })),
        conferenceData: true,
      })
    }

    return {
      success: true,
      message: `Project workspace created: ${projectName}`,
      data: {
        folderId: projectFolder.id,
        folderUrl: projectFolder.webViewLink,
        documentId: projectDoc.documentId,
        subfolders: {
          documents: documentsFolder.id,
          assets: assetsFolder.id,
          delivery: deliveryFolder.id,
        },
        kickoffEventId: kickoffEvent?.id,
        sharedWith: teamMembers,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create project workspace',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}

/**
 * Archive completed project
 */
export async function archiveProject(
  ctx: AutomationContext,
  projectFolderId: string,
  archiveFolderId: string
): Promise<WorkflowResult> {
  try {
    const { drive } = ctx.services

    // Get project folder info
    const projectFolder = await drive.getFile(projectFolderId)

    // Create archive copy with date
    const archiveName = `[ARCHIVED ${new Date().toISOString().split('T')[0]}] ${projectFolder.name}`

    // Move to archive folder
    await drive.moveFile(projectFolderId, archiveFolderId)
    await drive.renameFile(projectFolderId, archiveName)

    return {
      success: true,
      message: `Project archived: ${projectFolder.name}`,
      data: { archivedName: archiveName },
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to archive project',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}

/**
 * Get daily digest across all services
 */
export async function getDailyDigest(ctx: AutomationContext): Promise<DailyDigest> {
  const { gmail, drive, calendar } = ctx.services
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // Parallel fetch
  const [emails, events, recentFiles] = await Promise.all([
    gmail.listMessages({ maxResults: 50 }),
    calendar.getTodayEvents(),
    drive.listFiles({
      query: `modifiedTime > '${startOfDay.toISOString()}'`,
      pageSize: 20,
    }),
  ])

  // Count unread
  const unreadEmails = await gmail.getUnreadMessages(50)

  // Find next meeting
  const upcomingEvents = events
    .filter((e) => new Date(e.start?.dateTime || e.start?.date || 0) > now)
    .sort((a, b) =>
      new Date(a.start?.dateTime || a.start?.date || 0).getTime() -
      new Date(b.start?.dateTime || b.start?.date || 0).getTime()
    )

  const nextMeeting = upcomingEvents[0]

  return {
    date: now,
    emails: {
      total: emails.messages.length,
      unread: unreadEmails.length,
      urgent: unreadEmails.filter((e) =>
        e.subject?.toLowerCase().includes('urgent') ||
        e.subject?.toLowerCase().includes('pilne')
      ).length,
    },
    calendar: {
      events: events.length,
      nextMeeting: nextMeeting ? {
        summary: nextMeeting.summary || 'No title',
        start: new Date(nextMeeting.start?.dateTime || nextMeeting.start?.date || 0),
        attendees: nextMeeting.attendees?.length || 0,
      } : undefined,
    },
    files: {
      recentlyModified: recentFiles.files.length,
      sharedWithMe: 0, // Would need separate query
    },
  }
}

// ===== BATCH OPERATIONS =====

/**
 * Run multiple automations for a list of users
 */
export async function runForAllUsers(
  userEmails: string[],
  automation: (ctx: AutomationContext) => Promise<WorkflowResult>
): Promise<Map<string, WorkflowResult>> {
  const results = new Map<string, WorkflowResult>()

  for (const email of userEmails) {
    try {
      const ctx = createAutomationContext(email)
      const result = await automation(ctx)
      results.set(email, result)
    } catch (error) {
      results.set(email, {
        success: false,
        message: 'Automation failed',
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      })
    }
  }

  return results
}
