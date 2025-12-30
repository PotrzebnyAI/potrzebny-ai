/**
 * Application constants
 */

export const APP_NAME = 'POTRZEBNY.AI'
export const APP_DESCRIPTION =
  'Kompleksowa platforma AI wspierająca edukację, terapię i badania naukowe.'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://potrzebny.ai'

/**
 * API endpoints
 */
export const API_ROUTES = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    callback: '/api/auth/callback',
  },
  user: {
    profile: '/api/user/profile',
    settings: '/api/user/settings',
  },
  stripe: {
    checkout: '/api/stripe/checkout',
    webhook: '/api/stripe/webhook',
    portal: '/api/stripe/portal',
  },
  ai: {
    chat: '/api/ai/chat',
    analyze: '/api/ai/analyze',
  },
} as const

/**
 * Navigation routes
 */
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  settings: '/settings',
  pricing: '/pricing',
  panels: {
    student: '/panel/student',
    teacher: '/panel/teacher',
    parent: '/panel/parent',
    therapist: '/panel/therapist',
    research: '/panel/research',
    admin: '/panel/admin',
  },
} as const

/**
 * User roles
 */
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  PARENT: 'parent',
  THERAPIST: 'therapist',
  RESEARCHER: 'researcher',
  ADMIN: 'admin',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

/**
 * Subscription plans
 */
export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  STUDENT: 'student',
  TEACHER: 'teacher',
  PARENT: 'parent',
  RESEARCH_BASIC: 'research_basic',
  RESEARCH_PREMIUM: 'research_premium',
  THERAPIST: 'therapist',
} as const

export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS]

/**
 * Plan limits
 */
export const PLAN_LIMITS = {
  [SUBSCRIPTION_PLANS.FREE]: {
    aiRequests: 10,
    research: 5,
    storage: 100, // MB
  },
  [SUBSCRIPTION_PLANS.STUDENT]: {
    aiRequests: 100,
    research: 50,
    storage: 500,
  },
  [SUBSCRIPTION_PLANS.TEACHER]: {
    aiRequests: 500,
    research: 200,
    storage: 2000,
  },
  [SUBSCRIPTION_PLANS.PARENT]: {
    aiRequests: 50,
    research: 20,
    storage: 200,
  },
  [SUBSCRIPTION_PLANS.RESEARCH_BASIC]: {
    aiRequests: 1000,
    research: 500,
    storage: 5000,
  },
  [SUBSCRIPTION_PLANS.RESEARCH_PREMIUM]: {
    aiRequests: -1, // unlimited
    research: -1,
    storage: 20000,
  },
  [SUBSCRIPTION_PLANS.THERAPIST]: {
    aiRequests: 500,
    research: 100,
    storage: 5000,
  },
} as const

/**
 * Supported languages
 */
export const LANGUAGES = {
  pl: 'Polski',
  en: 'English',
} as const

export type Language = keyof typeof LANGUAGES

/**
 * Date formats
 */
export const DATE_FORMATS = {
  short: 'dd.MM.yyyy',
  long: 'd MMMM yyyy',
  datetime: 'dd.MM.yyyy HH:mm',
  time: 'HH:mm',
} as const
