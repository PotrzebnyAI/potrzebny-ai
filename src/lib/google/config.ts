/**
 * Google APIs Configuration
 *
 * Service Account: gmail-full-access-service-acco@potrzebny-ai-prod.iam.gserviceaccount.com
 * Client ID: 116898976924675896210
 * Project: potrzebny-ai-prod
 *
 * Domain-Wide Delegation Scopes:
 * - Gmail: full access, settings, compose, send
 * - Drive: full access, files, metadata
 * - Calendar: events, readonly
 * - Sheets: full access
 * - Docs: full access
 * - Admin: directory, users
 */

import { google, Auth } from 'googleapis'

// ===== CONFIGURATION =====

export const GOOGLE_PROJECT_ID = 'potrzebny-ai-prod'
export const GOOGLE_SERVICE_ACCOUNT_EMAIL =
  'gmail-full-access-service-acco@potrzebny-ai-prod.iam.gserviceaccount.com'
export const GOOGLE_CLIENT_ID = '116898976924675896210'

// Default domain for impersonation
export const DEFAULT_DOMAIN = 'potrzebny.ai'

// ===== SCOPES =====

export const GOOGLE_SCOPES = {
  // Gmail API Scopes
  GMAIL_FULL: 'https://mail.google.com/',
  GMAIL_SETTINGS_BASIC: 'https://www.googleapis.com/auth/gmail.settings.basic',
  GMAIL_SETTINGS_SHARING: 'https://www.googleapis.com/auth/gmail.settings.sharing',
  GMAIL_READONLY: 'https://www.googleapis.com/auth/gmail.readonly',
  GMAIL_MODIFY: 'https://www.googleapis.com/auth/gmail.modify',
  GMAIL_COMPOSE: 'https://www.googleapis.com/auth/gmail.compose',
  GMAIL_SEND: 'https://www.googleapis.com/auth/gmail.send',

  // Google Drive API Scopes
  DRIVE_FULL: 'https://www.googleapis.com/auth/drive',
  DRIVE_FILE: 'https://www.googleapis.com/auth/drive.file',
  DRIVE_READONLY: 'https://www.googleapis.com/auth/drive.readonly',
  DRIVE_METADATA: 'https://www.googleapis.com/auth/drive.metadata',
  DRIVE_METADATA_READONLY: 'https://www.googleapis.com/auth/drive.metadata.readonly',

  // Google Calendar API Scopes
  CALENDAR_FULL: 'https://www.googleapis.com/auth/calendar',
  CALENDAR_EVENTS: 'https://www.googleapis.com/auth/calendar.events',
  CALENDAR_READONLY: 'https://www.googleapis.com/auth/calendar.readonly',

  // Google Sheets API Scopes
  SHEETS_FULL: 'https://www.googleapis.com/auth/spreadsheets',
  SHEETS_READONLY: 'https://www.googleapis.com/auth/spreadsheets.readonly',

  // Google Docs API Scopes
  DOCS_FULL: 'https://www.googleapis.com/auth/documents',
  DOCS_READONLY: 'https://www.googleapis.com/auth/documents.readonly',

  // Google Slides API Scopes
  PRESENTATIONS_FULL: 'https://www.googleapis.com/auth/presentations',
  PRESENTATIONS_READONLY: 'https://www.googleapis.com/auth/presentations.readonly',

  // Admin SDK Scopes
  ADMIN_DIRECTORY_USER: 'https://www.googleapis.com/auth/admin.directory.user',
  ADMIN_DIRECTORY_USER_READONLY: 'https://www.googleapis.com/auth/admin.directory.user.readonly',
  ADMIN_DIRECTORY_GROUP: 'https://www.googleapis.com/auth/admin.directory.group',
  ADMIN_DIRECTORY_ORGUNIT: 'https://www.googleapis.com/auth/admin.directory.orgunit',
} as const

// All scopes for full access
export const ALL_SCOPES = Object.values(GOOGLE_SCOPES)

// Common scope combinations
export const SCOPE_PRESETS = {
  GMAIL_FULL_ACCESS: [
    GOOGLE_SCOPES.GMAIL_FULL,
    GOOGLE_SCOPES.GMAIL_SETTINGS_BASIC,
    GOOGLE_SCOPES.GMAIL_SETTINGS_SHARING,
    GOOGLE_SCOPES.GMAIL_READONLY,
    GOOGLE_SCOPES.GMAIL_MODIFY,
    GOOGLE_SCOPES.GMAIL_COMPOSE,
    GOOGLE_SCOPES.GMAIL_SEND,
  ],
  DRIVE_FULL_ACCESS: [
    GOOGLE_SCOPES.DRIVE_FULL,
    GOOGLE_SCOPES.DRIVE_FILE,
    GOOGLE_SCOPES.DRIVE_READONLY,
    GOOGLE_SCOPES.DRIVE_METADATA,
    GOOGLE_SCOPES.DRIVE_METADATA_READONLY,
  ],
  CALENDAR_FULL_ACCESS: [
    GOOGLE_SCOPES.CALENDAR_FULL,
    GOOGLE_SCOPES.CALENDAR_EVENTS,
    GOOGLE_SCOPES.CALENDAR_READONLY,
  ],
  SHEETS_FULL_ACCESS: [GOOGLE_SCOPES.SHEETS_FULL, GOOGLE_SCOPES.SHEETS_READONLY],
  DOCS_FULL_ACCESS: [GOOGLE_SCOPES.DOCS_FULL, GOOGLE_SCOPES.DOCS_READONLY],
  ADMIN_ACCESS: [
    GOOGLE_SCOPES.ADMIN_DIRECTORY_USER,
    GOOGLE_SCOPES.ADMIN_DIRECTORY_USER_READONLY,
    GOOGLE_SCOPES.ADMIN_DIRECTORY_GROUP,
    GOOGLE_SCOPES.ADMIN_DIRECTORY_ORGUNIT,
  ],
} as const

// ===== SERVICE ACCOUNT KEY TYPE =====

export interface ServiceAccountKey {
  type: 'service_account'
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
  universe_domain?: string
}

// ===== AUTH HELPER =====

let cachedServiceAccountKey: ServiceAccountKey | null = null

/**
 * Get the Service Account Key from environment variable
 * The key should be stored as a JSON string in GOOGLE_SERVICE_ACCOUNT_KEY
 */
export function getServiceAccountKey(): ServiceAccountKey {
  if (cachedServiceAccountKey) {
    return cachedServiceAccountKey
  }

  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

  if (!keyJson) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set. ' +
        'Please add the service account JSON key to your environment variables.'
    )
  }

  try {
    cachedServiceAccountKey = JSON.parse(keyJson) as ServiceAccountKey
    return cachedServiceAccountKey
  } catch {
    throw new Error(
      'Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY. ' + 'Make sure it contains valid JSON.'
    )
  }
}

/**
 * Create a JWT auth client for impersonating a user
 *
 * @param userEmail - The email of the user to impersonate (must be in the domain)
 * @param scopes - The OAuth2 scopes to request
 * @returns JWT client ready for use with Google APIs
 *
 * @example
 * ```typescript
 * const auth = createAuthClient('ai@potrzebny.ai', [GOOGLE_SCOPES.GMAIL_FULL]);
 * const gmail = google.gmail({ version: 'v1', auth });
 * ```
 */
export function createAuthClient(
  userEmail: string,
  scopes: string[] = ALL_SCOPES
): Auth.JWT {
  const key = getServiceAccountKey()

  const jwtClient = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: scopes,
    subject: userEmail, // This is the user to impersonate
  })

  return jwtClient
}

/**
 * Create an auth client with default scopes for a specific service
 */
export function createGmailAuth(userEmail: string): Auth.JWT {
  return createAuthClient(userEmail, [...SCOPE_PRESETS.GMAIL_FULL_ACCESS])
}

export function createDriveAuth(userEmail: string): Auth.JWT {
  return createAuthClient(userEmail, [...SCOPE_PRESETS.DRIVE_FULL_ACCESS])
}

export function createCalendarAuth(userEmail: string): Auth.JWT {
  return createAuthClient(userEmail, [...SCOPE_PRESETS.CALENDAR_FULL_ACCESS])
}

export function createSheetsAuth(userEmail: string): Auth.JWT {
  return createAuthClient(userEmail, [...SCOPE_PRESETS.SHEETS_FULL_ACCESS])
}

export function createDocsAuth(userEmail: string): Auth.JWT {
  return createAuthClient(userEmail, [...SCOPE_PRESETS.DOCS_FULL_ACCESS])
}

export function createAdminAuth(userEmail: string): Auth.JWT {
  return createAuthClient(userEmail, [...SCOPE_PRESETS.ADMIN_ACCESS])
}

/**
 * Create a full-access auth client with all scopes
 */
export function createFullAccessAuth(userEmail: string): Auth.JWT {
  return createAuthClient(userEmail, ALL_SCOPES)
}

// ===== VALIDATION =====

/**
 * Validate that the service account key is properly configured
 */
export async function validateServiceAccountKey(): Promise<{
  valid: boolean
  email?: string
  projectId?: string
  error?: string
}> {
  try {
    const key = getServiceAccountKey()

    if (!key.private_key || !key.client_email) {
      return {
        valid: false,
        error: 'Service account key is missing required fields (private_key or client_email)',
      }
    }

    return {
      valid: true,
      email: key.client_email,
      projectId: key.project_id,
    }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Test the connection to Google APIs
 */
export async function testConnection(userEmail: string): Promise<{
  success: boolean
  services: {
    gmail: boolean
    drive: boolean
    calendar: boolean
  }
  errors: string[]
}> {
  const errors: string[] = []
  const results = {
    gmail: false,
    drive: false,
    calendar: false,
  }

  try {
    // Test Gmail
    const gmailAuth = createGmailAuth(userEmail)
    const gmail = google.gmail({ version: 'v1', auth: gmailAuth })
    await gmail.users.getProfile({ userId: 'me' })
    results.gmail = true
  } catch (error) {
    errors.push(`Gmail: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  try {
    // Test Drive
    const driveAuth = createDriveAuth(userEmail)
    const drive = google.drive({ version: 'v3', auth: driveAuth })
    await drive.about.get({ fields: 'user' })
    results.drive = true
  } catch (error) {
    errors.push(`Drive: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  try {
    // Test Calendar
    const calendarAuth = createCalendarAuth(userEmail)
    const calendar = google.calendar({ version: 'v3', auth: calendarAuth })
    await calendar.calendarList.list({ maxResults: 1 })
    results.calendar = true
  } catch (error) {
    errors.push(`Calendar: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  return {
    success: results.gmail && results.drive && results.calendar,
    services: results,
    errors,
  }
}
