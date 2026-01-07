/**
 * POTRZEBNY.AI - Kompleksowa konfiguracja platformy
 * 19 paneli | 17,734 zmiennych | Marza 80-85%
 * Data: 6 stycznia 2026
 */

export const APP_NAME = 'POTRZEBNY.AI'
export const APP_DESCRIPTION =
  'Kompleksowa platforma AI wspierajaca edukacje, terapie i badania naukowe. Stworzona dla Polakow.'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://potrzebny.ai'
export const APP_TAGLINE = 'Nikt nie prosil, kazdy potrzebowal.'

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ARCHITEKTURA 19 PANELI
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// Typy paneli
export type PanelCategory = 'admin' | 'user' | 'premium' | 'special'
export type PanelId =
  // GRUPA 1: Panele Administracyjne (DARMOWE)
  | 'teacher-admin'
  | 'lecturer-admin'
  | 'therapist-admin'
  | 'doctor-trainer-admin'
  | 'therapist-trainer-admin'
  | 'personalization-admin'
  | 'parent-admin'
  | 'super-admin'
  | 'comet-assistant-admin'
  // GRUPA 2: Panele Uzytkownikow (PLATNE 29/49/79 PLN)
  | 'student'
  | 'university-student'
  | 'patient'
  | 'medical-trainee'
  | 'training-personalization'
  // GRUPA 3: Panele Premium (699/799 PLN)
  | 'supermozg'
  | 'supermozg-ultra'
  | 'research-premium'
  // GRUPA 4: Panele Specjalne
  | 'therapy-exercises'
  | 'telebim-led'

export interface PanelConfig {
  id: PanelId
  name: string
  namePl: string
  description: string
  category: PanelCategory
  price: number
  currency: 'PLN'
  icon: string
  color: string
  features: string[]
  requires2FA: boolean
  requiresPWZ?: boolean
  aiModel: 'deepseek' | 'haiku' | 'sonnet' | 'opus'
  route: string
  accessRoles: UserRole[]
}

/**
 * GRUPA 1: PANELE ADMINISTRACYJNE (DARMOWE - 0 PLN)
 */
export const ADMIN_PANELS: PanelConfig[] = [
  {
    id: 'teacher-admin',
    name: 'Teacher Admin',
    namePl: 'Panel Nauczyciela',
    description: 'Mass Upload & Distribution, Classroom Analytics, automatyczne quizy',
    category: 'admin',
    price: 0,
    currency: 'PLN',
    icon: '👩‍🏫',
    color: 'bg-green-100 dark:bg-green-900/30',
    features: [
      'Mass Upload & Distribution (1 plik -> 30 wersji)',
      'Classroom Analytics w czasie rzeczywistym',
      'Automatyczne generowanie quizow/testow',
      'System zaproszen uczniow (kod/link)',
      'Feedback AI dla uczniow',
    ],
    requires2FA: false,
    aiModel: 'sonnet',
    route: '/panel/teacher',
    accessRoles: ['teacher'],
  },
  {
    id: 'lecturer-admin',
    name: 'Lecturer Admin',
    namePl: 'Panel Wykladowcy',
    description: 'Academic Content Hub, transkrypcja wykladow, Semantic Scholar',
    category: 'admin',
    price: 0,
    currency: 'PLN',
    icon: '🎓',
    color: 'bg-blue-100 dark:bg-blue-900/30',
    features: [
      'Academic Content Hub',
      'Transkrypcja wykladow (Groq Whisper)',
      'Integracja Semantic Scholar',
      'Testy akademickie',
      'Stripe Connect 70/30 split',
    ],
    requires2FA: false,
    aiModel: 'sonnet',
    route: '/panel/lecturer',
    accessRoles: ['lecturer'],
  },
  {
    id: 'therapist-admin',
    name: 'Therapist Admin',
    namePl: 'Panel Terapeuty',
    description: 'Szyfrowane notatki, zadania CBT/DBT, monitoring nastroju',
    category: 'admin',
    price: 0,
    currency: 'PLN',
    icon: '🧠',
    color: 'bg-pink-100 dark:bg-pink-900/30',
    features: [
      'Szyfrowane notatki (AES-256-GCM)',
      'Przydzielanie zadan CBT/DBT',
      'Monitoring nastroju pacjentow',
      'Zgody RODO Art. 9',
      'Alerty kryzysowe',
      'Zero-Knowledge Encryption',
    ],
    requires2FA: true,
    aiModel: 'sonnet',
    route: '/panel/therapist',
    accessRoles: ['therapist'],
  },
  {
    id: 'doctor-trainer-admin',
    name: 'Doctor Trainer Admin',
    namePl: 'Panel Lekarza Szkolacego',
    description: 'Course Builder, certyfikacja CME, Virtual Patient AI',
    category: 'admin',
    price: 0,
    currency: 'PLN',
    icon: '👨‍⚕️',
    color: 'bg-red-100 dark:bg-red-900/30',
    features: [
      'Course Builder z case studies',
      'Certyfikacja CME (PDF + SHA-256)',
      'Virtual Patient AI',
      'Mentoring feedback',
      'DICOM API do RTG/MRI',
      'Prowizja 30% od kursow',
    ],
    requires2FA: true,
    requiresPWZ: true,
    aiModel: 'opus',
    route: '/panel/doctor-trainer',
    accessRoles: ['doctor'],
  },
  {
    id: 'therapist-trainer-admin',
    name: 'Therapist Trainer Admin',
    namePl: 'Panel Terapeuty Szkolacego',
    description: 'Superwizja sesji, ewaluacja kompetencji, biblioteka protokolow',
    category: 'admin',
    price: 0,
    currency: 'PLN',
    icon: '🧑‍🏫',
    color: 'bg-purple-100 dark:bg-purple-900/30',
    features: [
      'Superwizja zanonimizowanych sesji',
      'Ewaluacja kompetencji',
      'Biblioteka protokolow terapeutycznych',
      'Forum zamkniete',
    ],
    requires2FA: true,
    aiModel: 'sonnet',
    route: '/panel/therapist-trainer',
    accessRoles: ['therapist'],
  },
  {
    id: 'personalization-admin',
    name: 'Personalization Admin',
    namePl: 'Panel Administracyjny Personalizacyjny',
    description: 'White-label builder, AI transformation tresci, CMS',
    category: 'admin',
    price: 0,
    currency: 'PLN',
    icon: '🎨',
    color: 'bg-indigo-100 dark:bg-indigo-900/30',
    features: [
      'White-label builder',
      'AI transformation tresci',
      'CMS z tagowaniem',
      'Dystrybucja pracownikom',
      'Analityka HR',
      'Tworzenie wlasnej organizacji',
    ],
    requires2FA: false,
    aiModel: 'sonnet',
    route: '/panel/personalization',
    accessRoles: ['admin', 'organization'],
  },
  {
    id: 'parent-admin',
    name: 'Parent Admin',
    namePl: 'Panel Rodzica',
    description: 'Dashboard dziecka, kontrola czasu, alerty',
    category: 'admin',
    price: 0,
    currency: 'PLN',
    icon: '👨‍👩‍👧',
    color: 'bg-amber-100 dark:bg-amber-900/30',
    features: [
      'Dashboard dziecka',
      'Kontrola czasu nauki',
      'Alerty postepow',
      'Zarzadzanie subskrypcja',
      'Wglad w materialy',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/panel/parent',
    accessRoles: ['parent'],
  },
  {
    id: 'super-admin',
    name: 'Super Admin',
    namePl: 'Panel Administratora Platformy',
    description: 'God Mode - pelna kontrola platformy',
    category: 'admin',
    price: 0,
    currency: 'PLN',
    icon: '⚙️',
    color: 'bg-slate-100 dark:bg-slate-700/50',
    features: [
      'God Mode - pelny dostep',
      'MRR/Churn analytics',
      'User management',
      'Zarzadzanie 5-10k API keys',
      'Stripe/inFakt dashboard',
      'Sentry/Upstash logs',
      'Tworzenie nowych paneli',
    ],
    requires2FA: true,
    aiModel: 'opus',
    route: '/panel/admin',
    accessRoles: ['superadmin'],
  },
  {
    id: 'comet-assistant-admin',
    name: 'Comet Assistant Admin',
    namePl: 'Panel Perplexity Max Comet Assistant',
    description: 'Integracja z Perplexity Max agent - wolny wybieg z zatwierdzaniem',
    category: 'admin',
    price: 0,
    currency: 'PLN',
    icon: '🤖',
    color: 'bg-cyan-100 dark:bg-cyan-900/30',
    features: [
      'Integracja Perplexity Max Agent',
      'Wolny wybieg dla agenta',
      'Zatwierdzanie zmian recznie',
      'Budowanie nowych paneli',
      'Debugging i naprawy',
      'Pelen autopilot z kontrola',
    ],
    requires2FA: true,
    aiModel: 'opus',
    route: '/panel/comet-assistant',
    accessRoles: ['superadmin'],
  },
]

/**
 * GRUPA 2: PANELE UZYTKOWNIKOW KONCOWYCH (PLATNE)
 */
export const USER_PANELS: PanelConfig[] = [
  {
    id: 'student',
    name: 'Student Panel',
    namePl: 'Panel Ucznia',
    description: 'AI Personalizacja, Note Generator, Flashcards, AI Tutor, Gamifikacja',
    category: 'user',
    price: 29, // Basic, moze byc 49 Pro lub 79 Ultra
    currency: 'PLN',
    icon: '📚',
    color: 'bg-blue-100 dark:bg-blue-900/30',
    features: [
      'AI Personalizacja (Wzrokowiec/Sluchowiec/ADHD/Dysleksja/ASD)',
      'Note Generator (1 klikniecie)',
      'Flashcards & Quiz automatyczne',
      'AI Tutor (DeepSeek/Claude)',
      'Gamifikacja (XP, ligi, streaks)',
      'Tryby: ADHD, Dysleksja, ASD',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/panel/student',
    accessRoles: ['student'],
  },
  {
    id: 'university-student',
    name: 'University Student Panel',
    namePl: 'Panel Studenta Akademickiego',
    description: 'Transkrypcja wykladow, Academic Summarizer, Citation Helper',
    category: 'user',
    price: 29,
    currency: 'PLN',
    icon: '🎓',
    color: 'bg-indigo-100 dark:bg-indigo-900/30',
    features: [
      'Transkrypcja wykladow',
      'Academic Summarizer',
      'Citation Helper (APA/Vancouver)',
      'Exam Prep',
      'Focus Mode (Pomodoro)',
      'Mathpix (wzory matematyczne)',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/panel/university-student',
    accessRoles: ['student'],
  },
  {
    id: 'patient',
    name: 'Patient Panel',
    namePl: 'Panel Pacjenta',
    description: 'Homework od terapeuty, Mood Tracker, Secure Journal, SOS',
    category: 'user',
    price: 29,
    currency: 'PLN',
    icon: '💚',
    color: 'bg-green-100 dark:bg-green-900/30',
    features: [
      'Homework od terapeuty',
      'Mood Tracker (wykresy trendow)',
      'Secure Journal (szyfrowany)',
      'Psychoedukacja',
      'SOS (Panic Button - 116 123)',
      'RODO Art. 9, AES-256',
    ],
    requires2FA: true,
    aiModel: 'sonnet',
    route: '/panel/patient',
    accessRoles: ['patient'],
  },
  {
    id: 'medical-trainee',
    name: 'Medical Trainee Panel',
    namePl: 'Panel Studenta Medycznego/Kursanta',
    description: 'Case Studies, Virtual Patient AI, Exam Simulator',
    category: 'user',
    price: 29,
    currency: 'PLN',
    icon: '🩺',
    color: 'bg-red-100 dark:bg-red-900/30',
    features: [
      'Interaktywne Case Studies',
      'Virtual Patient AI (Claude Sonnet)',
      'Exam Simulator',
      'Procedure Checklists',
      'Mentoring Feedback',
      'Pelna personalizacja tresci',
    ],
    requires2FA: false,
    aiModel: 'sonnet',
    route: '/panel/medical-trainee',
    accessRoles: ['medical-trainee'],
  },
  {
    id: 'training-personalization',
    name: 'Training Personalization Panel',
    namePl: 'Panel Szkoleniowy Personalizacyjny',
    description: 'Adaptive Learning, Micro-learning, Certyfikaty',
    category: 'user',
    price: 29,
    currency: 'PLN',
    icon: '🎯',
    color: 'bg-orange-100 dark:bg-orange-900/30',
    features: [
      'Adaptive Learning',
      'Micro-learning',
      'Certyfikaty automatyczne',
      'Knowledge Retrieval chatbot',
      'Dolaczanie do organizacji',
      'Pelna personalizacja tresci',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/panel/training',
    accessRoles: ['trainee'],
  },
]

/**
 * GRUPA 3: PANELE SPECJALNE & PREMIUM
 */
export const PREMIUM_PANELS: PanelConfig[] = [
  {
    id: 'supermozg',
    name: 'Supermozg Panel',
    namePl: 'Panel Supermozg',
    description: 'Bonus dla Ultra 79 PLN - Cognitive Training, Neuro-Education',
    category: 'premium',
    price: 79, // Dostepny automatycznie dla Ultra
    currency: 'PLN',
    icon: '🧠',
    color: 'bg-violet-100 dark:bg-violet-900/30',
    features: [
      'Cognitive Training (Dual N-Back)',
      'Szybkie czytanie',
      'Neuro-Education',
      'Focus Tools',
      'Supplement Guide (basic)',
      'Sleep Optimization',
    ],
    requires2FA: false,
    aiModel: 'sonnet',
    route: '/panel/supermozg',
    accessRoles: ['ultra'],
  },
  {
    id: 'supermozg-ultra',
    name: 'Supermozg ULTRA Panel',
    namePl: 'Panel Supermozg ULTRA',
    description: 'Najlepszy panel tego typu na swiecie - Claude Opus 4.5, 4000+ APIs',
    category: 'premium',
    price: 699,
    currency: 'PLN',
    icon: '🚀',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    features: [
      'Claude Opus 4.5 (Extended Thinking)',
      '200K+ context window',
      'AI Stack Builder (300+ nootropikow)',
      'Farmakogenomika Edukacyjna (23andMe)',
      'Neuro-Optymalizacja',
      'Wearable Integration (Oura/Whoop)',
      'Advanced Longevity Protocols',
      'DrugBank Interaction Checker',
    ],
    requires2FA: false,
    aiModel: 'opus',
    route: '/panel/supermozg-ultra',
    accessRoles: ['supermozg-ultra'],
  },
  {
    id: 'research-premium',
    name: 'Research Premium Panel',
    namePl: 'Panel Badawczy Premium',
    description: 'Dla lekarzy specjalistow - PubMed, OncoKB, Precision Medicine',
    category: 'premium',
    price: 799,
    currency: 'PLN',
    icon: '🔬',
    color: 'bg-gradient-to-r from-blue-600 to-cyan-500',
    features: [
      'Claude Opus 4.5 (Extended Thinking)',
      'AI Medical Oracle',
      'Deep Research & Synthesis',
      'Precision Medicine & Genomics',
      'Advanced Drug Interaction Checker Pro',
      'EHR Integration Ready (FHIR R4)',
      'PubMed, OncoKB, PharmGKB, Wiley TDM',
      '5000+ Medical APIs',
    ],
    requires2FA: true,
    requiresPWZ: true,
    aiModel: 'opus',
    route: '/panel/research',
    accessRoles: ['doctor', 'researcher'],
  },
]

/**
 * GRUPA 4: PANELE SPECJALNE
 */
export const SPECIAL_PANELS: PanelConfig[] = [
  {
    id: 'therapy-exercises',
    name: 'Therapy Exercises Panel',
    namePl: 'Panel Cwiczen Terapeutycznych',
    description: 'Baza 5000+ cwiczen terapeutycznych AI',
    category: 'special',
    price: 29,
    currency: 'PLN',
    icon: '🧘',
    color: 'bg-teal-100 dark:bg-teal-900/30',
    features: [
      'Baza 5000+ cwiczen',
      'Przesylanie do pacjentow',
      'Monitoring wykonania',
      'Feedback i trudnosci',
      'Personalizacja cwiczen',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/panel/therapy-exercises',
    accessRoles: ['therapist', 'patient'],
  },
  {
    id: 'telebim-led',
    name: 'Telebim LED Panel',
    namePl: 'Panel Telebim LED',
    description: 'Reklama na ekranie LED - tylko WEB, bez App Store/Google Play',
    category: 'special',
    price: 499, // Grafika Standard, moze byc 1299/1699/3999
    currency: 'PLN',
    icon: '📺',
    color: 'bg-yellow-100 dark:bg-yellow-900/30',
    features: [
      'Grafika Standard 499 PLN/mc',
      'Video Premium 1299 PLN/mc',
      'Combo 1699 PLN/mc',
      'Enterprise Multi 3999 PLN/mc',
      'AI generowanie grafik (DALL-E 3)',
      'Automatyzacja AMUSO ECMS',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/dashboard/telebim',
    accessRoles: ['advertiser'],
  },
]

// Wszystkie panele
export const ALL_PANELS: PanelConfig[] = [
  ...ADMIN_PANELS,
  ...USER_PANELS,
  ...PREMIUM_PANELS,
  ...SPECIAL_PANELS,
]

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ROLE UZYTKOWNIKOW
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const USER_ROLES = {
  // Administratorzy
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  ORGANIZATION: 'organization',

  // Nauczyciele
  TEACHER: 'teacher',
  LECTURER: 'lecturer',

  // Medyczni
  THERAPIST: 'therapist',
  DOCTOR: 'doctor',
  RESEARCHER: 'researcher',

  // Uczniowie
  STUDENT: 'student',
  MEDICAL_TRAINEE: 'medical-trainee',
  TRAINEE: 'trainee',

  // Inni
  PARENT: 'parent',
  PATIENT: 'patient',
  ADVERTISER: 'advertiser',

  // Premium
  ULTRA: 'ultra',
  SUPERMOZG_ULTRA: 'supermozg-ultra',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PLANY SUBSKRYPCYJNE
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const SUBSCRIPTION_PLANS = {
  // Darmowe (Admin)
  FREE_ADMIN: 'free_admin',

  // Platne (User)
  BASIC: 'basic',
  PRO: 'pro',
  ULTRA: 'ultra',

  // Premium
  SUPERMOZG_ULTRA: 'supermozg_ultra',
  RESEARCH_PREMIUM: 'research_premium',

  // Specjalne
  THERAPY_EXERCISES: 'therapy_exercises',
  TELEBIM_GRAFIKA: 'telebim_grafika',
  TELEBIM_VIDEO: 'telebim_video',
  TELEBIM_COMBO: 'telebim_combo',
  TELEBIM_ENTERPRISE: 'telebim_enterprise',
} as const

export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS]

/**
 * Cennik planow
 */
export const PLAN_PRICING = {
  [SUBSCRIPTION_PLANS.FREE_ADMIN]: { price: 0, currency: 'PLN', period: 'lifetime' },
  [SUBSCRIPTION_PLANS.BASIC]: { price: 29, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.PRO]: { price: 49, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.ULTRA]: { price: 79, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.SUPERMOZG_ULTRA]: { price: 699, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.RESEARCH_PREMIUM]: { price: 799, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.THERAPY_EXERCISES]: { price: 29, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.TELEBIM_GRAFIKA]: { price: 499, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.TELEBIM_VIDEO]: { price: 1299, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.TELEBIM_COMBO]: { price: 1699, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.TELEBIM_ENTERPRISE]: { price: 3999, currency: 'PLN', period: 'monthly' },
} as const

/**
 * Limity planow
 */
export const PLAN_LIMITS = {
  [SUBSCRIPTION_PLANS.FREE_ADMIN]: {
    aiRequests: -1, // Unlimited for admins
    storage: 10000, // 10 GB
    students: -1,
  },
  [SUBSCRIPTION_PLANS.BASIC]: {
    aiRequests: 100,
    storage: 500,
    tokenLimit: 50000,
  },
  [SUBSCRIPTION_PLANS.PRO]: {
    aiRequests: 500,
    storage: 2000,
    tokenLimit: 200000,
  },
  [SUBSCRIPTION_PLANS.ULTRA]: {
    aiRequests: 2000,
    storage: 5000,
    tokenLimit: 500000,
  },
  [SUBSCRIPTION_PLANS.SUPERMOZG_ULTRA]: {
    aiRequests: -1,
    storage: 20000,
    tokenLimit: 2000000,
  },
  [SUBSCRIPTION_PLANS.RESEARCH_PREMIUM]: {
    aiRequests: -1,
    storage: 50000,
    tokenLimit: 2000000,
  },
} as const

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ROUTING API
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const API_ROUTES = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    callback: '/api/auth/callback',
    verify2fa: '/api/auth/verify-2fa',
  },
  user: {
    profile: '/api/user/profile',
    settings: '/api/user/settings',
    subscription: '/api/user/subscription',
  },
  stripe: {
    checkout: '/api/stripe/checkout',
    webhook: '/api/stripe/webhook',
    portal: '/api/stripe/portal',
    connect: '/api/stripe/connect',
  },
  ai: {
    chat: '/api/ai/chat',
    analyze: '/api/ai/analyze',
    transcribe: '/api/ai/transcribe',
    generate: '/api/ai/generate',
  },
  panels: {
    student: '/api/panels/student',
    teacher: '/api/panels/teacher',
    therapist: '/api/panels/therapist',
    research: '/api/panels/research',
    supermozg: '/api/panels/supermozg',
  },
  telebim: {
    create: '/api/telebim/create',
    orders: '/api/telebim/orders',
    upload: '/api/telebim/upload',
    status: '/api/telebim/status',
  },
  health: {
    validic: '/api/health/validic',
    terra: '/api/health/terra',
    sync: '/api/health/sync',
  },
} as const

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NAWIGACJA
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  settings: '/settings',
  pricing: '/pricing',
  panels: {
    // Admin
    teacher: '/panel/teacher',
    lecturer: '/panel/lecturer',
    therapist: '/panel/therapist',
    doctorTrainer: '/panel/doctor-trainer',
    therapistTrainer: '/panel/therapist-trainer',
    personalization: '/panel/personalization',
    parent: '/panel/parent',
    admin: '/panel/admin',
    cometAssistant: '/panel/comet-assistant',
    // User
    student: '/panel/student',
    universityStudent: '/panel/university-student',
    patient: '/panel/patient',
    medicalTrainee: '/panel/medical-trainee',
    training: '/panel/training',
    // Premium
    supermozg: '/panel/supermozg',
    supermozgUltra: '/panel/supermozg-ultra',
    research: '/panel/research',
    // Special
    therapyExercises: '/panel/therapy-exercises',
    telebim: '/dashboard/telebim',
  },
} as const

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * KONFIGURACJA GLOBALNA
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const LANGUAGES = {
  pl: 'Polski',
} as const // Tylko polski na start

export type Language = keyof typeof LANGUAGES

export const DATE_FORMATS = {
  short: 'dd.MM.yyyy',
  long: 'd MMMM yyyy',
  datetime: 'dd.MM.yyyy HH:mm',
  time: 'HH:mm',
} as const

export const TRIAL_CONFIG = {
  days: 3,
  requiresCard: false,
} as const

export const BUSINESS_INFO = {
  name: 'POTRZEBNY AI',
  owner: 'Bartlomiej Potrzebowski',
  nip: '1133182851',
  email: 'ai@potrzebny.ai',
  dpoEmail: 'dpo@potrzebny.ai',
  supportEmail: 'support@potrzebny.ai',
  vatStatus: 'VAT 0% (edukacja/medycyna)',
  taxForm: 'Ryczalt 12%',
} as const

/**
 * Stale SOS dla panelu pacjenta
 */
export const SOS_CONTACTS = {
  crisis: {
    number: '116 123',
    name: 'Telefon Zaufania',
    available: '24/7',
  },
  emergency: {
    number: '112',
    name: 'Numer alarmowy',
    available: '24/7',
  },
} as const
