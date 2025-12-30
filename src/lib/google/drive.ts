/**
 * Google Drive API Service
 *
 * Full access to Google Drive API for potrzebny.ai domain users.
 * Uses Domain-Wide Delegation for impersonation.
 *
 * Features:
 * - List/search files and folders
 * - Upload/download files
 * - Create/delete/move files and folders
 * - Manage permissions and sharing
 * - Copy/export files
 * - Manage metadata
 */

import { google, drive_v3 } from 'googleapis'
import { Readable } from 'stream'
import { createDriveAuth, createAuthClient, GOOGLE_SCOPES } from './config'

// ===== TYPES =====

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  size?: number
  createdTime?: Date
  modifiedTime?: Date
  parents?: string[]
  webViewLink?: string
  webContentLink?: string
  iconLink?: string
  thumbnailLink?: string
  owners?: Array<{ email: string; displayName?: string }>
  shared?: boolean
  starred?: boolean
  trashed?: boolean
}

export interface FileListOptions {
  query?: string
  pageSize?: number
  pageToken?: string
  orderBy?: string
  fields?: string
  spaces?: 'drive' | 'appDataFolder' | 'photos'
  includeTeamDriveItems?: boolean
  folderId?: string
}

export interface FileCreateOptions {
  name: string
  mimeType?: string
  parents?: string[]
  description?: string
  starred?: boolean
  content?: string | Buffer | Readable
  contentMimeType?: string
}

export interface FileUpdateOptions {
  name?: string
  description?: string
  starred?: boolean
  trashed?: boolean
  addParents?: string[]
  removeParents?: string[]
  content?: string | Buffer | Readable
  contentMimeType?: string
}

export interface Permission {
  type: 'user' | 'group' | 'domain' | 'anyone'
  role: 'owner' | 'organizer' | 'fileOrganizer' | 'writer' | 'commenter' | 'reader'
  emailAddress?: string
  domain?: string
  allowFileDiscovery?: boolean
  expirationTime?: Date
}

export interface ExportFormat {
  mimeType: string
  extension: string
}

// Google Workspace MIME types
export const MIME_TYPES = {
  // Folders
  FOLDER: 'application/vnd.google-apps.folder',

  // Google Docs
  DOCUMENT: 'application/vnd.google-apps.document',
  SPREADSHEET: 'application/vnd.google-apps.spreadsheet',
  PRESENTATION: 'application/vnd.google-apps.presentation',
  FORM: 'application/vnd.google-apps.form',
  DRAWING: 'application/vnd.google-apps.drawing',
  SCRIPT: 'application/vnd.google-apps.script',
  SITE: 'application/vnd.google-apps.site',

  // Common export formats
  PDF: 'application/pdf',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  CSV: 'text/csv',
  TSV: 'text/tab-separated-values',
  HTML: 'text/html',
  TXT: 'text/plain',
  JSON: 'application/json',
  ZIP: 'application/zip',

  // Images
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  SVG: 'image/svg+xml',
} as const

// Export formats for Google Workspace files
export const EXPORT_FORMATS: Record<string, ExportFormat[]> = {
  [MIME_TYPES.DOCUMENT]: [
    { mimeType: MIME_TYPES.PDF, extension: '.pdf' },
    { mimeType: MIME_TYPES.DOCX, extension: '.docx' },
    { mimeType: MIME_TYPES.HTML, extension: '.html' },
    { mimeType: MIME_TYPES.TXT, extension: '.txt' },
  ],
  [MIME_TYPES.SPREADSHEET]: [
    { mimeType: MIME_TYPES.PDF, extension: '.pdf' },
    { mimeType: MIME_TYPES.XLSX, extension: '.xlsx' },
    { mimeType: MIME_TYPES.CSV, extension: '.csv' },
  ],
  [MIME_TYPES.PRESENTATION]: [
    { mimeType: MIME_TYPES.PDF, extension: '.pdf' },
    { mimeType: MIME_TYPES.PPTX, extension: '.pptx' },
  ],
  [MIME_TYPES.DRAWING]: [
    { mimeType: MIME_TYPES.PDF, extension: '.pdf' },
    { mimeType: MIME_TYPES.PNG, extension: '.png' },
    { mimeType: MIME_TYPES.SVG, extension: '.svg' },
  ],
}

// ===== DRIVE SERVICE CLASS =====

export class DriveService {
  private drive: drive_v3.Drive
  private userEmail: string

  constructor(userEmail: string, scopes?: string[]) {
    this.userEmail = userEmail
    const auth = scopes
      ? createAuthClient(userEmail, scopes)
      : createDriveAuth(userEmail)
    this.drive = google.drive({ version: 'v3', auth })
  }

  // ===== ABOUT =====

  /**
   * Get information about the user's Drive
   */
  async getAbout(): Promise<drive_v3.Schema$About> {
    const response = await this.drive.about.get({
      fields: 'user,storageQuota,maxUploadSize',
    })
    return response.data
  }

  /**
   * Get storage quota information
   */
  async getStorageQuota(): Promise<{
    limit: number
    usage: number
    usageInDrive: number
    usageInDriveTrash: number
    percentUsed: number
  }> {
    const about = await this.getAbout()
    const quota = about.storageQuota!

    const limit = parseInt(quota.limit || '0')
    const usage = parseInt(quota.usage || '0')

    return {
      limit,
      usage,
      usageInDrive: parseInt(quota.usageInDrive || '0'),
      usageInDriveTrash: parseInt(quota.usageInDriveTrash || '0'),
      percentUsed: limit > 0 ? (usage / limit) * 100 : 0,
    }
  }

  // ===== FILES =====

  /**
   * List files in Drive
   */
  async listFiles(options: FileListOptions = {}): Promise<{
    files: DriveFile[]
    nextPageToken?: string
  }> {
    let query = options.query || ''

    // If folderId is specified, add parent filter
    if (options.folderId) {
      const parentQuery = `'${options.folderId}' in parents`
      query = query ? `${query} and ${parentQuery}` : parentQuery
    }

    // Exclude trashed files by default
    if (!query.includes('trashed')) {
      query = query ? `${query} and trashed=false` : 'trashed=false'
    }

    const response = await this.drive.files.list({
      q: query || undefined,
      pageSize: options.pageSize || 100,
      pageToken: options.pageToken,
      orderBy: options.orderBy || 'modifiedTime desc',
      fields:
        options.fields ||
        'nextPageToken,files(id,name,mimeType,size,createdTime,modifiedTime,parents,webViewLink,webContentLink,iconLink,thumbnailLink,owners,shared,starred,trashed)',
      spaces: options.spaces || 'drive',
      includeItemsFromAllDrives: options.includeTeamDriveItems,
      supportsAllDrives: options.includeTeamDriveItems,
    })

    return {
      files: (response.data.files || []).map(this.mapFile),
      nextPageToken: response.data.nextPageToken || undefined,
    }
  }

  /**
   * Search files by name
   */
  async searchByName(name: string, options?: Omit<FileListOptions, 'query'>): Promise<DriveFile[]> {
    const { files } = await this.listFiles({
      ...options,
      query: `name contains '${name.replace(/'/g, "\\'")}'`,
    })
    return files
  }

  /**
   * List files in a folder
   */
  async listFolder(folderId: string, options?: Omit<FileListOptions, 'folderId'>): Promise<DriveFile[]> {
    const { files } = await this.listFiles({
      ...options,
      folderId,
    })
    return files
  }

  /**
   * Get file by ID
   */
  async getFile(fileId: string): Promise<DriveFile> {
    const response = await this.drive.files.get({
      fileId,
      fields:
        'id,name,mimeType,size,createdTime,modifiedTime,parents,webViewLink,webContentLink,iconLink,thumbnailLink,owners,shared,starred,trashed',
      supportsAllDrives: true,
    })
    return this.mapFile(response.data)
  }

  /**
   * Create a new file or folder
   */
  async createFile(options: FileCreateOptions): Promise<DriveFile> {
    const requestBody: drive_v3.Schema$File = {
      name: options.name,
      mimeType: options.mimeType,
      parents: options.parents,
      description: options.description,
      starred: options.starred,
    }

    let response: { data: drive_v3.Schema$File }

    if (options.content) {
      const media = {
        mimeType: options.contentMimeType || options.mimeType || 'application/octet-stream',
        body:
          options.content instanceof Readable
            ? options.content
            : typeof options.content === 'string'
              ? Readable.from([options.content])
              : Readable.from([options.content]),
      }

      response = await this.drive.files.create({
        requestBody,
        media,
        fields: 'id,name,mimeType,size,createdTime,modifiedTime,parents,webViewLink,webContentLink',
        supportsAllDrives: true,
      })
    } else {
      response = await this.drive.files.create({
        requestBody,
        fields: 'id,name,mimeType,size,createdTime,modifiedTime,parents,webViewLink,webContentLink',
        supportsAllDrives: true,
      })
    }

    return this.mapFile(response.data)
  }

  /**
   * Create a folder
   */
  async createFolder(name: string, parentId?: string): Promise<DriveFile> {
    return this.createFile({
      name,
      mimeType: MIME_TYPES.FOLDER,
      parents: parentId ? [parentId] : undefined,
    })
  }

  /**
   * Upload a file
   */
  async uploadFile(
    name: string,
    content: string | Buffer | Readable,
    mimeType: string,
    parentId?: string
  ): Promise<DriveFile> {
    return this.createFile({
      name,
      content,
      contentMimeType: mimeType,
      parents: parentId ? [parentId] : undefined,
    })
  }

  /**
   * Update a file
   */
  async updateFile(fileId: string, options: FileUpdateOptions): Promise<DriveFile> {
    const requestBody: drive_v3.Schema$File = {}

    if (options.name !== undefined) requestBody.name = options.name
    if (options.description !== undefined) requestBody.description = options.description
    if (options.starred !== undefined) requestBody.starred = options.starred
    if (options.trashed !== undefined) requestBody.trashed = options.trashed

    let response: { data: drive_v3.Schema$File }

    if (options.content) {
      const media = {
        mimeType: options.contentMimeType || 'application/octet-stream',
        body:
          options.content instanceof Readable
            ? options.content
            : typeof options.content === 'string'
              ? Readable.from([options.content])
              : Readable.from([options.content]),
      }

      response = await this.drive.files.update({
        fileId,
        requestBody,
        media,
        addParents: options.addParents?.join(','),
        removeParents: options.removeParents?.join(','),
        fields: 'id,name,mimeType,size,createdTime,modifiedTime,parents,webViewLink,webContentLink',
        supportsAllDrives: true,
      })
    } else {
      response = await this.drive.files.update({
        fileId,
        requestBody,
        addParents: options.addParents?.join(','),
        removeParents: options.removeParents?.join(','),
        fields: 'id,name,mimeType,size,createdTime,modifiedTime,parents,webViewLink,webContentLink',
        supportsAllDrives: true,
      })
    }

    return this.mapFile(response.data)
  }

  /**
   * Move a file to a different folder
   */
  async moveFile(fileId: string, newParentId: string, currentParentId?: string): Promise<DriveFile> {
    // If current parent not specified, get it from the file
    if (!currentParentId) {
      const file = await this.getFile(fileId)
      currentParentId = file.parents?.[0]
    }

    return this.updateFile(fileId, {
      addParents: [newParentId],
      removeParents: currentParentId ? [currentParentId] : undefined,
    })
  }

  /**
   * Rename a file
   */
  async renameFile(fileId: string, newName: string): Promise<DriveFile> {
    return this.updateFile(fileId, { name: newName })
  }

  /**
   * Copy a file
   */
  async copyFile(fileId: string, newName?: string, parentId?: string): Promise<DriveFile> {
    const requestBody: drive_v3.Schema$File = {}
    if (newName) requestBody.name = newName
    if (parentId) requestBody.parents = [parentId]

    const response = await this.drive.files.copy({
      fileId,
      requestBody,
      fields: 'id,name,mimeType,size,createdTime,modifiedTime,parents,webViewLink,webContentLink',
      supportsAllDrives: true,
    })

    return this.mapFile(response.data)
  }

  /**
   * Delete a file (move to trash)
   */
  async trashFile(fileId: string): Promise<void> {
    await this.updateFile(fileId, { trashed: true })
  }

  /**
   * Permanently delete a file
   */
  async deleteFile(fileId: string): Promise<void> {
    await this.drive.files.delete({
      fileId,
      supportsAllDrives: true,
    })
  }

  /**
   * Empty trash
   */
  async emptyTrash(): Promise<void> {
    await this.drive.files.emptyTrash({})
  }

  // ===== DOWNLOAD / EXPORT =====

  /**
   * Download a file content
   */
  async downloadFile(fileId: string): Promise<Buffer> {
    const response = await this.drive.files.get(
      {
        fileId,
        alt: 'media',
        supportsAllDrives: true,
      },
      { responseType: 'arraybuffer' }
    )
    return Buffer.from(response.data as ArrayBuffer)
  }

  /**
   * Export a Google Workspace file to a different format
   */
  async exportFile(fileId: string, mimeType: string): Promise<Buffer> {
    const response = await this.drive.files.export(
      {
        fileId,
        mimeType,
      },
      { responseType: 'arraybuffer' }
    )
    return Buffer.from(response.data as ArrayBuffer)
  }

  /**
   * Export Google Doc to PDF
   */
  async exportToPdf(fileId: string): Promise<Buffer> {
    return this.exportFile(fileId, MIME_TYPES.PDF)
  }

  /**
   * Export Google Sheet to Excel
   */
  async exportToExcel(fileId: string): Promise<Buffer> {
    return this.exportFile(fileId, MIME_TYPES.XLSX)
  }

  /**
   * Export Google Sheet to CSV (first sheet only)
   */
  async exportToCsv(fileId: string): Promise<Buffer> {
    return this.exportFile(fileId, MIME_TYPES.CSV)
  }

  // ===== PERMISSIONS =====

  /**
   * List permissions on a file
   */
  async listPermissions(fileId: string): Promise<drive_v3.Schema$Permission[]> {
    const response = await this.drive.permissions.list({
      fileId,
      fields: 'permissions(id,type,role,emailAddress,domain,expirationTime,displayName)',
      supportsAllDrives: true,
    })
    return response.data.permissions || []
  }

  /**
   * Share a file with a user
   */
  async shareWithUser(
    fileId: string,
    email: string,
    role: Permission['role'] = 'reader',
    sendNotification = true
  ): Promise<drive_v3.Schema$Permission> {
    const response = await this.drive.permissions.create({
      fileId,
      requestBody: {
        type: 'user',
        role,
        emailAddress: email,
      },
      sendNotificationEmail: sendNotification,
      supportsAllDrives: true,
    })
    return response.data
  }

  /**
   * Share a file with a domain
   */
  async shareWithDomain(
    fileId: string,
    domain: string,
    role: Permission['role'] = 'reader'
  ): Promise<drive_v3.Schema$Permission> {
    const response = await this.drive.permissions.create({
      fileId,
      requestBody: {
        type: 'domain',
        role,
        domain,
      },
      supportsAllDrives: true,
    })
    return response.data
  }

  /**
   * Make a file publicly accessible
   */
  async makePublic(
    fileId: string,
    role: 'reader' | 'commenter' = 'reader'
  ): Promise<drive_v3.Schema$Permission> {
    const response = await this.drive.permissions.create({
      fileId,
      requestBody: {
        type: 'anyone',
        role,
      },
      supportsAllDrives: true,
    })
    return response.data
  }

  /**
   * Remove a permission from a file
   */
  async removePermission(fileId: string, permissionId: string): Promise<void> {
    await this.drive.permissions.delete({
      fileId,
      permissionId,
      supportsAllDrives: true,
    })
  }

  /**
   * Transfer ownership of a file
   */
  async transferOwnership(fileId: string, newOwnerEmail: string): Promise<void> {
    await this.drive.permissions.create({
      fileId,
      requestBody: {
        type: 'user',
        role: 'owner',
        emailAddress: newOwnerEmail,
      },
      transferOwnership: true,
      supportsAllDrives: true,
    })
  }

  // ===== SHARED DRIVES =====

  /**
   * List shared drives
   */
  async listSharedDrives(): Promise<drive_v3.Schema$Drive[]> {
    const response = await this.drive.drives.list({
      fields: 'drives(id,name,createdTime,hidden)',
    })
    return response.data.drives || []
  }

  /**
   * Get a shared drive by ID
   */
  async getSharedDrive(driveId: string): Promise<drive_v3.Schema$Drive> {
    const response = await this.drive.drives.get({
      driveId,
      fields: 'id,name,createdTime,hidden',
    })
    return response.data
  }

  // ===== HELPER METHODS =====

  private mapFile(file: drive_v3.Schema$File): DriveFile {
    return {
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
      size: file.size ? parseInt(file.size) : undefined,
      createdTime: file.createdTime ? new Date(file.createdTime) : undefined,
      modifiedTime: file.modifiedTime ? new Date(file.modifiedTime) : undefined,
      parents: file.parents || undefined,
      webViewLink: file.webViewLink || undefined,
      webContentLink: file.webContentLink || undefined,
      iconLink: file.iconLink || undefined,
      thumbnailLink: file.thumbnailLink || undefined,
      owners: file.owners?.map((o) => ({
        email: o.emailAddress!,
        displayName: o.displayName || undefined,
      })),
      shared: file.shared || false,
      starred: file.starred || false,
      trashed: file.trashed || false,
    }
  }
}

// ===== CONVENIENCE FUNCTIONS =====

/**
 * Create a Drive service instance for a user
 */
export function createDriveService(userEmail: string): DriveService {
  return new DriveService(userEmail)
}

/**
 * Upload a file to Drive
 */
export async function uploadFile(
  userEmail: string,
  name: string,
  content: string | Buffer,
  mimeType: string,
  folderId?: string
): Promise<DriveFile> {
  const drive = new DriveService(userEmail)
  return drive.uploadFile(name, content, mimeType, folderId)
}

/**
 * Download a file from Drive
 */
export async function downloadFile(userEmail: string, fileId: string): Promise<Buffer> {
  const drive = new DriveService(userEmail)
  return drive.downloadFile(fileId)
}

/**
 * Share a file with someone
 */
export async function shareFile(
  userEmail: string,
  fileId: string,
  shareWithEmail: string,
  role: Permission['role'] = 'reader'
): Promise<void> {
  const drive = new DriveService(userEmail)
  await drive.shareWithUser(fileId, shareWithEmail, role)
}

/**
 * Create a folder in Drive
 */
export async function createFolder(
  userEmail: string,
  name: string,
  parentId?: string
): Promise<DriveFile> {
  const drive = new DriveService(userEmail)
  return drive.createFolder(name, parentId)
}

/**
 * List files in a folder
 */
export async function listFolder(userEmail: string, folderId: string): Promise<DriveFile[]> {
  const drive = new DriveService(userEmail)
  return drive.listFolder(folderId)
}

/**
 * Search for files by name
 */
export async function searchFiles(userEmail: string, query: string): Promise<DriveFile[]> {
  const drive = new DriveService(userEmail)
  return drive.searchByName(query)
}
