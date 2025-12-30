import { type UserRole, type SubscriptionPlan } from '@/lib/constants'

/**
 * Base entity types
 */
export interface BaseEntity {
  id: string
  created_at: string
  updated_at: string
}

/**
 * User types
 */
export interface User extends BaseEntity {
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  subscription_plan: SubscriptionPlan
  subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing' | null
  stripe_customer_id: string | null
  metadata: Record<string, unknown> | null
}

export interface UserProfile {
  id: string
  user_id: string
  bio: string | null
  location: string | null
  website: string | null
  social_links: Record<string, string> | null
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: 'pl' | 'en'
  notifications: {
    email: boolean
    push: boolean
    marketing: boolean
  }
  accessibility: {
    reducedMotion: boolean
    highContrast: boolean
  }
}

/**
 * API Response types
 */
export interface ApiResponse<T = unknown> {
  data: T | null
  error: ApiError | null
  success: boolean
}

export interface ApiError {
  message: string
  code: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalPages: number
    totalItems: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

/**
 * AI Chat types
 */
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
  metadata?: {
    model?: string
    tokens?: number
    sources?: string[]
  }
}

export interface ChatSession extends BaseEntity {
  user_id: string
  title: string
  messages: ChatMessage[]
  panel_type: 'student' | 'teacher' | 'research' | 'therapist'
  is_archived: boolean
}

/**
 * Research types
 */
export interface ResearchArticle {
  id: string
  pmid?: string
  doi?: string
  title: string
  abstract: string
  authors: string[]
  journal: string
  publication_date: string
  url: string
  source: 'pubmed' | 'scopus' | 'crossref'
}

export interface ResearchQuery {
  query: string
  filters: {
    dateFrom?: string
    dateTo?: string
    sources?: string[]
    openAccessOnly?: boolean
  }
  page: number
  pageSize: number
}

/**
 * Education types
 */
export interface Lesson extends BaseEntity {
  title: string
  description: string
  subject: string
  grade_level: number
  content: LessonContent[]
  teacher_id: string
  is_published: boolean
}

export interface LessonContent {
  type: 'text' | 'video' | 'quiz' | 'exercise' | 'file'
  data: Record<string, unknown>
  order: number
}

export interface Quiz extends BaseEntity {
  lesson_id: string
  questions: QuizQuestion[]
  time_limit: number | null
  passing_score: number
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'single' | 'multiple' | 'text' | 'ordering'
  options: string[]
  correct_answers: number[] | string
  points: number
  explanation?: string
}

/**
 * Therapy types
 */
export interface TherapySession extends BaseEntity {
  therapist_id: string
  client_id: string
  session_date: string
  duration_minutes: number
  session_type: 'initial' | 'regular' | 'follow_up' | 'crisis'
  notes: string | null
  is_confidential: boolean
}

export interface TherapyNote {
  id: string
  session_id: string
  content: string
  encrypted: boolean
  created_at: string
}

/**
 * Component prop types
 */
export interface PageProps {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export interface LayoutProps {
  children: React.ReactNode
  params?: Promise<Record<string, string>>
}
