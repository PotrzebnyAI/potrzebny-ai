/**
 * Google Calendar API Service
 *
 * Full access to Google Calendar API for potrzebny.ai domain users.
 * Uses Domain-Wide Delegation for impersonation.
 *
 * Features:
 * - List/create/update/delete events
 * - Manage calendars
 * - Check free/busy status
 * - Create recurring events
 * - Manage attendees and send invites
 * - Create Google Meet links
 */

import { google, calendar_v3 } from 'googleapis'
import { createCalendarAuth, createAuthClient, GOOGLE_SCOPES } from './config'

// ===== TYPES =====

export interface CalendarEvent {
  id?: string
  summary: string
  description?: string
  location?: string
  start: Date | string
  end: Date | string
  allDay?: boolean
  attendees?: EventAttendee[]
  recurrence?: string[]
  reminders?: EventReminder[]
  colorId?: string
  visibility?: 'default' | 'public' | 'private' | 'confidential'
  status?: 'confirmed' | 'tentative' | 'cancelled'
  transparency?: 'opaque' | 'transparent'
  conferenceData?: boolean // Create Google Meet link
}

export interface EventAttendee {
  email: string
  displayName?: string
  optional?: boolean
  responseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted'
}

export interface EventReminder {
  method: 'email' | 'popup'
  minutes: number
}

export interface CalendarListEntry {
  id: string
  summary: string
  description?: string
  primary?: boolean
  timeZone?: string
  backgroundColor?: string
  foregroundColor?: string
  accessRole?: string
  hidden?: boolean
  selected?: boolean
}

export interface EventListOptions {
  calendarId?: string
  timeMin?: Date
  timeMax?: Date
  maxResults?: number
  pageToken?: string
  q?: string
  singleEvents?: boolean
  orderBy?: 'startTime' | 'updated'
  showDeleted?: boolean
}

export interface FreeBusyOptions {
  timeMin: Date
  timeMax: Date
  items: string[] // Calendar IDs
  timeZone?: string
}

export interface FreeBusyResult {
  calendarId: string
  busy: Array<{ start: Date; end: Date }>
}

// Recurrence rules helpers
export const RECURRENCE = {
  daily: (count?: number) =>
    `RRULE:FREQ=DAILY${count ? `;COUNT=${count}` : ''}`,
  weekly: (days?: string[], count?: number) =>
    `RRULE:FREQ=WEEKLY${days ? `;BYDAY=${days.join(',')}` : ''}${count ? `;COUNT=${count}` : ''}`,
  monthly: (dayOfMonth?: number, count?: number) =>
    `RRULE:FREQ=MONTHLY${dayOfMonth ? `;BYMONTHDAY=${dayOfMonth}` : ''}${count ? `;COUNT=${count}` : ''}`,
  yearly: (count?: number) =>
    `RRULE:FREQ=YEARLY${count ? `;COUNT=${count}` : ''}`,
  weekdays: (count?: number) =>
    `RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR${count ? `;COUNT=${count}` : ''}`,
}

// ===== CALENDAR SERVICE CLASS =====

export class CalendarService {
  private calendar: calendar_v3.Calendar
  private userEmail: string
  private defaultCalendarId = 'primary'

  constructor(userEmail: string, scopes?: string[]) {
    this.userEmail = userEmail
    const auth = scopes
      ? createAuthClient(userEmail, scopes)
      : createCalendarAuth(userEmail)
    this.calendar = google.calendar({ version: 'v3', auth })
  }

  // ===== CALENDARS =====

  /**
   * List all calendars
   */
  async listCalendars(): Promise<CalendarListEntry[]> {
    const response = await this.calendar.calendarList.list({
      minAccessRole: 'reader',
    })

    return (response.data.items || []).map(this.mapCalendarListEntry)
  }

  /**
   * Get primary calendar
   */
  async getPrimaryCalendar(): Promise<CalendarListEntry | null> {
    const calendars = await this.listCalendars()
    return calendars.find((c) => c.primary) || null
  }

  /**
   * Create a new calendar
   */
  async createCalendar(
    summary: string,
    options?: {
      description?: string
      timeZone?: string
    }
  ): Promise<CalendarListEntry> {
    const response = await this.calendar.calendars.insert({
      requestBody: {
        summary,
        description: options?.description,
        timeZone: options?.timeZone,
      },
    })

    return {
      id: response.data.id!,
      summary: response.data.summary!,
      description: response.data.description || undefined,
      timeZone: response.data.timeZone || undefined,
    }
  }

  /**
   * Delete a calendar
   */
  async deleteCalendar(calendarId: string): Promise<void> {
    await this.calendar.calendars.delete({ calendarId })
  }

  // ===== EVENTS =====

  /**
   * List events
   */
  async listEvents(options: EventListOptions = {}): Promise<{
    events: calendar_v3.Schema$Event[]
    nextPageToken?: string
  }> {
    const response = await this.calendar.events.list({
      calendarId: options.calendarId || this.defaultCalendarId,
      timeMin: options.timeMin?.toISOString(),
      timeMax: options.timeMax?.toISOString(),
      maxResults: options.maxResults || 250,
      pageToken: options.pageToken,
      q: options.q,
      singleEvents: options.singleEvents ?? true,
      orderBy: options.orderBy || 'startTime',
      showDeleted: options.showDeleted,
    })

    return {
      events: response.data.items || [],
      nextPageToken: response.data.nextPageToken || undefined,
    }
  }

  /**
   * Get today's events
   */
  async getTodayEvents(calendarId?: string): Promise<calendar_v3.Schema$Event[]> {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    const { events } = await this.listEvents({
      calendarId,
      timeMin: startOfDay,
      timeMax: endOfDay,
    })

    return events
  }

  /**
   * Get upcoming events (next 7 days)
   */
  async getUpcomingEvents(days = 7, calendarId?: string): Promise<calendar_v3.Schema$Event[]> {
    const now = new Date()
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    const { events } = await this.listEvents({
      calendarId,
      timeMin: now,
      timeMax: future,
    })

    return events
  }

  /**
   * Get a single event by ID
   */
  async getEvent(eventId: string, calendarId?: string): Promise<calendar_v3.Schema$Event> {
    const response = await this.calendar.events.get({
      calendarId: calendarId || this.defaultCalendarId,
      eventId,
    })
    return response.data
  }

  /**
   * Create an event
   */
  async createEvent(
    event: CalendarEvent,
    calendarId?: string,
    sendUpdates: 'all' | 'externalOnly' | 'none' = 'all'
  ): Promise<calendar_v3.Schema$Event> {
    const requestBody = this.mapEventToRequest(event)

    const response = await this.calendar.events.insert({
      calendarId: calendarId || this.defaultCalendarId,
      requestBody,
      sendUpdates,
      conferenceDataVersion: event.conferenceData ? 1 : undefined,
    })

    return response.data
  }

  /**
   * Quick add event using natural language
   */
  async quickAdd(text: string, calendarId?: string): Promise<calendar_v3.Schema$Event> {
    const response = await this.calendar.events.quickAdd({
      calendarId: calendarId || this.defaultCalendarId,
      text,
    })
    return response.data
  }

  /**
   * Update an event
   */
  async updateEvent(
    eventId: string,
    updates: Partial<CalendarEvent>,
    calendarId?: string,
    sendUpdates: 'all' | 'externalOnly' | 'none' = 'all'
  ): Promise<calendar_v3.Schema$Event> {
    // Get existing event
    const existing = await this.getEvent(eventId, calendarId)

    // Merge updates
    const requestBody: calendar_v3.Schema$Event = {
      ...existing,
    }

    if (updates.summary !== undefined) requestBody.summary = updates.summary
    if (updates.description !== undefined) requestBody.description = updates.description
    if (updates.location !== undefined) requestBody.location = updates.location
    if (updates.visibility !== undefined) requestBody.visibility = updates.visibility
    if (updates.status !== undefined) requestBody.status = updates.status
    if (updates.colorId !== undefined) requestBody.colorId = updates.colorId

    if (updates.start !== undefined) {
      if (updates.allDay) {
        requestBody.start = {
          date: this.formatDate(updates.start),
        }
      } else {
        requestBody.start = {
          dateTime: this.formatDateTime(updates.start),
          timeZone: 'Europe/Warsaw',
        }
      }
    }

    if (updates.end !== undefined) {
      if (updates.allDay) {
        requestBody.end = {
          date: this.formatDate(updates.end),
        }
      } else {
        requestBody.end = {
          dateTime: this.formatDateTime(updates.end),
          timeZone: 'Europe/Warsaw',
        }
      }
    }

    if (updates.attendees !== undefined) {
      requestBody.attendees = updates.attendees.map((a) => ({
        email: a.email,
        displayName: a.displayName,
        optional: a.optional,
      }))
    }

    if (updates.recurrence !== undefined) {
      requestBody.recurrence = updates.recurrence
    }

    const response = await this.calendar.events.update({
      calendarId: calendarId || this.defaultCalendarId,
      eventId,
      requestBody,
      sendUpdates,
    })

    return response.data
  }

  /**
   * Delete an event
   */
  async deleteEvent(
    eventId: string,
    calendarId?: string,
    sendUpdates: 'all' | 'externalOnly' | 'none' = 'all'
  ): Promise<void> {
    await this.calendar.events.delete({
      calendarId: calendarId || this.defaultCalendarId,
      eventId,
      sendUpdates,
    })
  }

  /**
   * Move an event to a different calendar
   */
  async moveEvent(
    eventId: string,
    destinationCalendarId: string,
    sourceCalendarId?: string
  ): Promise<calendar_v3.Schema$Event> {
    const response = await this.calendar.events.move({
      calendarId: sourceCalendarId || this.defaultCalendarId,
      eventId,
      destination: destinationCalendarId,
    })
    return response.data
  }

  // ===== ATTENDEES =====

  /**
   * Add attendees to an event
   */
  async addAttendees(
    eventId: string,
    attendees: EventAttendee[],
    calendarId?: string
  ): Promise<calendar_v3.Schema$Event> {
    const event = await this.getEvent(eventId, calendarId)
    const existingAttendees = event.attendees || []

    const newAttendees = attendees.filter(
      (a) => !existingAttendees.some((e) => e.email === a.email)
    )

    return this.updateEvent(
      eventId,
      {
        attendees: [
          ...existingAttendees.map((a) => ({
            email: a.email!,
            displayName: a.displayName || undefined,
            optional: a.optional || undefined,
          })),
          ...newAttendees,
        ],
      },
      calendarId
    )
  }

  /**
   * Remove attendees from an event
   */
  async removeAttendees(
    eventId: string,
    emails: string[],
    calendarId?: string
  ): Promise<calendar_v3.Schema$Event> {
    const event = await this.getEvent(eventId, calendarId)
    const existingAttendees = event.attendees || []

    return this.updateEvent(
      eventId,
      {
        attendees: existingAttendees
          .filter((a) => !emails.includes(a.email!))
          .map((a) => ({
            email: a.email!,
            displayName: a.displayName || undefined,
            optional: a.optional || undefined,
          })),
      },
      calendarId
    )
  }

  // ===== FREE/BUSY =====

  /**
   * Check free/busy status for calendars
   */
  async getFreeBusy(options: FreeBusyOptions): Promise<FreeBusyResult[]> {
    const response = await this.calendar.freebusy.query({
      requestBody: {
        timeMin: options.timeMin.toISOString(),
        timeMax: options.timeMax.toISOString(),
        timeZone: options.timeZone || 'Europe/Warsaw',
        items: options.items.map((id) => ({ id })),
      },
    })

    const results: FreeBusyResult[] = []
    const calendars = response.data.calendars || {}

    for (const [calendarId, data] of Object.entries(calendars)) {
      results.push({
        calendarId,
        busy: (data.busy || []).map((b) => ({
          start: new Date(b.start!),
          end: new Date(b.end!),
        })),
      })
    }

    return results
  }

  /**
   * Find a free slot for all attendees
   */
  async findFreeSlot(
    attendeeEmails: string[],
    durationMinutes: number,
    options?: {
      startDate?: Date
      endDate?: Date
      workingHoursStart?: number // e.g., 9 for 9 AM
      workingHoursEnd?: number // e.g., 17 for 5 PM
    }
  ): Promise<{ start: Date; end: Date } | null> {
    const startDate = options?.startDate || new Date()
    const endDate = options?.endDate || new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    const workingStart = options?.workingHoursStart ?? 9
    const workingEnd = options?.workingHoursEnd ?? 17

    const freeBusyResults = await this.getFreeBusy({
      timeMin: startDate,
      timeMax: endDate,
      items: attendeeEmails,
    })

    // Merge all busy times
    const allBusyTimes: Array<{ start: Date; end: Date }> = []
    for (const result of freeBusyResults) {
      allBusyTimes.push(...result.busy)
    }

    // Sort by start time
    allBusyTimes.sort((a, b) => a.start.getTime() - b.start.getTime())

    // Find first available slot during working hours
    const current = new Date(startDate)

    while (current < endDate) {
      const dayOfWeek = current.getDay()

      // Skip weekends
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        current.setDate(current.getDate() + 1)
        current.setHours(workingStart, 0, 0, 0)
        continue
      }

      // Set to working hours if needed
      if (current.getHours() < workingStart) {
        current.setHours(workingStart, 0, 0, 0)
      }

      // Check if past working hours
      if (current.getHours() >= workingEnd) {
        current.setDate(current.getDate() + 1)
        current.setHours(workingStart, 0, 0, 0)
        continue
      }

      const slotEnd = new Date(current.getTime() + durationMinutes * 60 * 1000)

      // Check if slot would extend past working hours
      if (slotEnd.getHours() > workingEnd || (slotEnd.getHours() === workingEnd && slotEnd.getMinutes() > 0)) {
        current.setDate(current.getDate() + 1)
        current.setHours(workingStart, 0, 0, 0)
        continue
      }

      // Check if slot conflicts with any busy time
      let conflicts = false
      for (const busy of allBusyTimes) {
        if (current < busy.end && slotEnd > busy.start) {
          conflicts = true
          // Move to end of this busy period
          current.setTime(busy.end.getTime())
          break
        }
      }

      if (!conflicts) {
        return { start: new Date(current), end: slotEnd }
      }
    }

    return null
  }

  // ===== HELPER METHODS =====

  private mapCalendarListEntry(entry: calendar_v3.Schema$CalendarListEntry): CalendarListEntry {
    return {
      id: entry.id!,
      summary: entry.summary!,
      description: entry.description || undefined,
      primary: entry.primary || false,
      timeZone: entry.timeZone || undefined,
      backgroundColor: entry.backgroundColor || undefined,
      foregroundColor: entry.foregroundColor || undefined,
      accessRole: entry.accessRole || undefined,
      hidden: entry.hidden || false,
      selected: entry.selected || false,
    }
  }

  private mapEventToRequest(event: CalendarEvent): calendar_v3.Schema$Event {
    const request: calendar_v3.Schema$Event = {
      summary: event.summary,
      description: event.description,
      location: event.location,
      visibility: event.visibility,
      status: event.status,
      transparency: event.transparency,
      colorId: event.colorId,
    }

    // Set start/end times
    if (event.allDay) {
      request.start = { date: this.formatDate(event.start) }
      request.end = { date: this.formatDate(event.end) }
    } else {
      request.start = {
        dateTime: this.formatDateTime(event.start),
        timeZone: 'Europe/Warsaw',
      }
      request.end = {
        dateTime: this.formatDateTime(event.end),
        timeZone: 'Europe/Warsaw',
      }
    }

    // Attendees
    if (event.attendees) {
      request.attendees = event.attendees.map((a) => ({
        email: a.email,
        displayName: a.displayName,
        optional: a.optional,
      }))
    }

    // Recurrence
    if (event.recurrence) {
      request.recurrence = event.recurrence
    }

    // Reminders
    if (event.reminders) {
      request.reminders = {
        useDefault: false,
        overrides: event.reminders.map((r) => ({
          method: r.method,
          minutes: r.minutes,
        })),
      }
    }

    // Google Meet
    if (event.conferenceData) {
      request.conferenceData = {
        createRequest: {
          requestId: `meet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      }
    }

    return request
  }

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') return date
    return date.toISOString().split('T')[0]
  }

  private formatDateTime(date: Date | string): string {
    if (typeof date === 'string') return date
    return date.toISOString()
  }
}

// ===== CONVENIENCE FUNCTIONS =====

/**
 * Create a Calendar service instance for a user
 */
export function createCalendarService(userEmail: string): CalendarService {
  return new CalendarService(userEmail)
}

/**
 * Create a meeting with Google Meet
 */
export async function createMeeting(
  userEmail: string,
  summary: string,
  start: Date,
  end: Date,
  attendees: string[],
  options?: {
    description?: string
    location?: string
  }
): Promise<calendar_v3.Schema$Event> {
  const calendar = new CalendarService(userEmail)
  return calendar.createEvent({
    summary,
    start,
    end,
    attendees: attendees.map((email) => ({ email })),
    description: options?.description,
    location: options?.location,
    conferenceData: true,
  })
}

/**
 * Schedule a meeting by finding a free slot
 */
export async function scheduleMeeting(
  userEmail: string,
  summary: string,
  durationMinutes: number,
  attendees: string[],
  options?: {
    description?: string
    startDate?: Date
    endDate?: Date
  }
): Promise<calendar_v3.Schema$Event | null> {
  const calendar = new CalendarService(userEmail)

  const slot = await calendar.findFreeSlot(
    [userEmail, ...attendees],
    durationMinutes,
    {
      startDate: options?.startDate,
      endDate: options?.endDate,
    }
  )

  if (!slot) {
    return null
  }

  return calendar.createEvent({
    summary,
    start: slot.start,
    end: slot.end,
    attendees: attendees.map((email) => ({ email })),
    description: options?.description,
    conferenceData: true,
  })
}

/**
 * Get today's schedule for a user
 */
export async function getTodaySchedule(userEmail: string): Promise<calendar_v3.Schema$Event[]> {
  const calendar = new CalendarService(userEmail)
  return calendar.getTodayEvents()
}

/**
 * Check if a user is free at a specific time
 */
export async function isUserFree(
  userEmail: string,
  start: Date,
  end: Date
): Promise<boolean> {
  const calendar = new CalendarService(userEmail)
  const results = await calendar.getFreeBusy({
    timeMin: start,
    timeMax: end,
    items: [userEmail],
  })

  return results.length === 0 || results[0].busy.length === 0
}
