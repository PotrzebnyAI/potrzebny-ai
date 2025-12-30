/**
 * Google APIs - Main Export
 *
 * Full integration with Google Workspace APIs for potrzebny.ai
 *
 * Service Account: gmail-full-access-service-acco@potrzebny-ai-prod.iam.gserviceaccount.com
 * Client ID: 116898976924675896210
 * Project: potrzebny-ai-prod
 *
 * Available APIs:
 * - Gmail: Full email management
 * - Drive: File storage and sharing
 * - Calendar: Event and schedule management
 * - Sheets: Spreadsheet operations
 * - Docs: Document creation and editing
 */

// ===== CONFIGURATION =====
export {
  GOOGLE_PROJECT_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_CLIENT_ID,
  DEFAULT_DOMAIN,
  GOOGLE_SCOPES,
  ALL_SCOPES,
  SCOPE_PRESETS,
  getServiceAccountKey,
  createAuthClient,
  createGmailAuth,
  createDriveAuth,
  createCalendarAuth,
  createSheetsAuth,
  createDocsAuth,
  createAdminAuth,
  createFullAccessAuth,
  validateServiceAccountKey,
  testConnection,
} from './config'

export type { ServiceAccountKey } from './config'

// ===== GMAIL =====
export {
  GmailService,
  createGmailService,
  sendEmail,
  setVacation,
  disableVacation,
} from './gmail'

export type {
  EmailAddress,
  EmailMessage,
  EmailAttachment,
  VacationSettings,
  EmailFilter,
  EmailListOptions,
  ParsedEmail,
} from './gmail'

// ===== DRIVE =====
export {
  DriveService,
  createDriveService,
  uploadFile,
  downloadFile,
  shareFile,
  createFolder,
  listFolder,
  searchFiles,
  MIME_TYPES,
  EXPORT_FORMATS,
} from './drive'

export type {
  DriveFile,
  FileListOptions,
  FileCreateOptions,
  FileUpdateOptions,
  Permission,
  ExportFormat,
} from './drive'

// ===== CALENDAR =====
export {
  CalendarService,
  createCalendarService,
  createMeeting,
  scheduleMeeting,
  getTodaySchedule,
  isUserFree,
  RECURRENCE,
} from './calendar'

export type {
  CalendarEvent,
  EventAttendee,
  EventReminder,
  CalendarListEntry,
  EventListOptions,
  FreeBusyOptions,
  FreeBusyResult,
} from './calendar'

// ===== SHEETS =====
export {
  SheetsService,
  createSheetsService,
  readSheet,
  writeSheet,
  appendToSheet,
  createSpreadsheet,
  columnToLetter,
  letterToColumn,
  rangeToA1,
} from './sheets'

export type {
  CellValue,
  CellRange,
  SheetInfo,
  SpreadsheetInfo,
  CellFormat,
} from './sheets'

// ===== DOCS =====
export {
  DocsService,
  createDocsService,
  createDocument,
  readDocument,
  appendToDocument,
  replaceInDocument,
  createFromTemplate,
} from './docs'

export type {
  DocumentInfo,
  TextStyle,
  ParagraphStyle,
  TableSpec,
  InsertPosition,
} from './docs'

// ===== AUTOMATION =====
export {
  createAutomationContext,
  processUnreadEmails,
  setVacationAutoReply,
  sendTemplatedEmail,
  organizeFilesByType,
  backupFiles,
  scheduleRecurringMeeting,
  getDailyCalendarDigest,
  generateWeeklyReport,
  createProjectWorkspace,
  archiveProject,
  getDailyDigest,
  runForAllUsers,
} from './automation'

export type {
  AutomationContext,
  EmailAnalysis,
  DailyDigest,
  WorkflowResult,
} from './automation'
