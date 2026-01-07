/**
 * POTRZEBNY.AI - Kompleksowa konfiguracja platformy
 * 21 paneli | 17,734 zmiennych | Marża 80-85%
 * Data: 7 stycznia 2026
 *
 * STRUKTURA:
 * - GRUPA 1: Admin (9 paneli, DARMOWE) - w tym 2 PRYWATNE (8, 9)
 * - GRUPA 2: User (5 paneli, 29/49/79 PLN)
 * - GRUPA 3: Premium (3 panele, 699/799 PLN)
 * - GRUPA 4: Special (4 panele) - w tym Telebim TYLKO WEB
 */

export const APP_NAME = 'POTRZEBNY.AI'
export const APP_DESCRIPTION =
  'Kompleksowa platforma AI wspierająca edukację, terapię i badania naukowe. Stworzona dla Polaków.'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://potrzebny.ai'
export const APP_TAGLINE = 'Nikt nie prosił, każdy potrzebował.'

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ARCHITEKTURA 21 PANELI
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export type PanelCategory = 'admin' | 'user' | 'premium' | 'special'
export type PanelVisibility = 'public' | 'private' | 'web_only' | 'dynamic'

export type PanelId =
  // GRUPA 1: Panele Administracyjne (DARMOWE) - 9 paneli
  | 'teacher-admin'           // 1
  | 'lecturer-admin'          // 2
  | 'therapist-admin'         // 3
  | 'doctor-trainer-admin'    // 4
  | 'therapist-trainer-admin' // 5
  | 'personalization-admin'   // 6
  | 'parent-admin'            // 7
  | 'super-admin'             // 8 - PRYWATNY (tylko ai@potrzebny.ai)
  | 'comet-assistant-admin'   // 9 - PRYWATNY (tylko asystent@potrzebny.ai)
  // GRUPA 2: Panele Użytkowników (PŁATNE 29/49/79 PLN) - 5 paneli
  | 'student'                 // 10
  | 'university-student'      // 11
  | 'patient'                 // 12
  | 'medical-trainee'         // 13
  | 'training-personalization'// 14
  // GRUPA 3: Panele Premium (699/799 PLN) - 3 panele
  | 'supermozg'               // 15
  | 'supermozg-ultra'         // 16
  | 'research-premium'        // 17
  // GRUPA 4: Panele Specjalne - 4 panele
  | 'psychomedic-b2b'         // 18 - NOWY! B2B dla sieci PsychoMedic
  | 'therapy-exercises'       // 19
  | 'telebim-led'             // 20 - TYLKO WEB!
  | 'dynamic-panel'           // 21 - Dynamiczne panele tworzone przez admina

export interface PanelConfig {
  id: PanelId
  number: number // Numer panelu 1-21
  name: string
  namePl: string
  description: string
  category: PanelCategory
  visibility: PanelVisibility
  price: number
  currency: 'PLN'
  icon: string
  color: string
  features: string[]
  requires2FA: boolean
  requiresPWZ?: boolean
  requiresHealthApi?: boolean // Dla integracji VALIDIC/Terra
  aiModel: 'deepseek' | 'haiku' | 'sonnet' | 'opus'
  route: string
  accessRoles: UserRole[]
  allowedEmails?: string[] // Dla prywatnych paneli
  platformRestriction?: 'web_only' | 'all' // Ograniczenia platformy
}

/**
 * GRUPA 1: PANELE ADMINISTRACYJNE (DARMOWE - 0 PLN)
 * Panele 1-9
 */
export const ADMIN_PANELS: PanelConfig[] = [
  {
    id: 'teacher-admin',
    number: 1,
    name: 'Teacher Admin',
    namePl: 'Panel Nauczyciela',
    description: 'Mass Upload & Distribution, Classroom Analytics, automatyczne quizy',
    category: 'admin',
    visibility: 'public',
    price: 0,
    currency: 'PLN',
    icon: '👩‍🏫',
    color: 'bg-green-100 dark:bg-green-900/30',
    features: [
      'Mass Upload & Distribution (1 plik → 30 wersji)',
      'Classroom Analytics w czasie rzeczywistym',
      'Automatyczne generowanie quizów/testów',
      'System zaproszeń uczniów (kod/link)',
      'Feedback AI dla uczniów',
    ],
    requires2FA: false,
    aiModel: 'sonnet',
    route: '/panel/teacher',
    accessRoles: ['teacher'],
  },
  {
    id: 'lecturer-admin',
    number: 2,
    name: 'Lecturer Admin',
    namePl: 'Panel Wykładowcy',
    description: 'Academic Content Hub, transkrypcja wykładów, Semantic Scholar',
    category: 'admin',
    visibility: 'public',
    price: 0,
    currency: 'PLN',
    icon: '🎓',
    color: 'bg-blue-100 dark:bg-blue-900/30',
    features: [
      'Academic Content Hub',
      'Transkrypcja wykładów (Groq Whisper)',
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
    number: 3,
    name: 'Therapist Admin',
    namePl: 'Panel Terapeuty',
    description: 'Szyfrowane notatki, zadania CBT/DBT, monitoring nastroju, VALIDIC/Terra wearables',
    category: 'admin',
    visibility: 'public',
    price: 0,
    currency: 'PLN',
    icon: '🧠',
    color: 'bg-pink-100 dark:bg-pink-900/30',
    features: [
      'Szyfrowane notatki (AES-256-GCM)',
      'Przydzielanie zadań CBT/DBT',
      'Monitoring nastroju pacjentów',
      'Integracja VALIDIC/Terra (wearables)',
      'Zgody RODO Art. 9',
      'Alerty kryzysowe',
      'Zero-Knowledge Encryption',
    ],
    requires2FA: true,
    requiresHealthApi: true,
    aiModel: 'sonnet',
    route: '/panel/therapist',
    accessRoles: ['therapist'],
  },
  {
    id: 'doctor-trainer-admin',
    number: 4,
    name: 'Doctor Trainer Admin',
    namePl: 'Panel Lekarza Szkolącego',
    description: 'Course Builder, certyfikacja CME, Virtual Patient AI, Health APIs',
    category: 'admin',
    visibility: 'public',
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
      'Integracja VALIDIC/Terra',
      'Prowizja 30% od kursów',
    ],
    requires2FA: true,
    requiresPWZ: true,
    requiresHealthApi: true,
    aiModel: 'opus',
    route: '/panel/doctor-trainer',
    accessRoles: ['doctor'],
  },
  {
    id: 'therapist-trainer-admin',
    number: 5,
    name: 'Therapist Trainer Admin',
    namePl: 'Panel Terapeuty Szkolącego',
    description: 'Superwizja sesji, ewaluacja kompetencji, biblioteka protokołów',
    category: 'admin',
    visibility: 'public',
    price: 0,
    currency: 'PLN',
    icon: '🧑‍🏫',
    color: 'bg-purple-100 dark:bg-purple-900/30',
    features: [
      'Superwizja zanonimizowanych sesji',
      'Ewaluacja kompetencji',
      'Biblioteka protokołów terapeutycznych',
      'Forum zamknięte',
    ],
    requires2FA: true,
    aiModel: 'sonnet',
    route: '/panel/therapist-trainer',
    accessRoles: ['therapist'],
  },
  {
    id: 'personalization-admin',
    number: 6,
    name: 'Personalization Admin',
    namePl: 'Panel Administracyjny Personalizacyjny',
    description: 'White-label builder, AI transformation treści, CMS - tworzenie własnej organizacji',
    category: 'admin',
    visibility: 'public',
    price: 0,
    currency: 'PLN',
    icon: '🎨',
    color: 'bg-indigo-100 dark:bg-indigo-900/30',
    features: [
      'White-label builder',
      'AI transformation treści',
      'CMS z tagowaniem',
      'Dystrybucja pracownikom',
      'Analityka HR',
      'Tworzenie własnej organizacji B2B/B2C',
    ],
    requires2FA: false,
    aiModel: 'sonnet',
    route: '/panel/personalization',
    accessRoles: ['admin', 'organization'],
  },
  {
    id: 'parent-admin',
    number: 7,
    name: 'Parent Admin',
    namePl: 'Panel Rodzica',
    description: 'Dashboard dziecka, kontrola czasu, alerty',
    category: 'admin',
    visibility: 'public',
    price: 0,
    currency: 'PLN',
    icon: '👨‍👩‍👧',
    color: 'bg-amber-100 dark:bg-amber-900/30',
    features: [
      'Dashboard dziecka',
      'Kontrola czasu nauki',
      'Alerty postępów',
      'Zarządzanie subskrypcją',
      'Wgląd w materiały',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/panel/parent',
    accessRoles: ['parent'],
  },
  {
    id: 'super-admin',
    number: 8,
    name: 'Super Admin',
    namePl: 'Panel Administratora Platformy',
    description: 'God Mode - pełna kontrola platformy, tworzenie nowych paneli, auto-debugging',
    category: 'admin',
    visibility: 'private', // PRYWATNY!
    price: 0,
    currency: 'PLN',
    icon: '⚙️',
    color: 'bg-slate-900 dark:bg-slate-800',
    features: [
      'God Mode - pełny dostęp do wszystkiego',
      'MRR/Churn analytics',
      'User management',
      'Zarządzanie 5-10k API keys',
      'Stripe/inFakt dashboard',
      'Sentry/Upstash logs',
      'TWORZENIE NOWYCH PANELI',
      'USUWANIE/EDYCJA PANELI',
      'AUTO-DEBUGGING platformy',
      'Dostęp do wszystkich 21 paneli',
    ],
    requires2FA: true,
    aiModel: 'opus',
    route: '/panel/admin',
    accessRoles: ['superadmin'],
    allowedEmails: ['ai@potrzebny.ai'], // TYLKO ten email!
  },
  {
    id: 'comet-assistant-admin',
    number: 9,
    name: 'Comet Assistant Admin',
    namePl: 'Panel Perplexity Max Comet Assistant',
    description: 'Integracja z Perplexity Max agent - wolny wybieg z zatwierdzaniem przez admina',
    category: 'admin',
    visibility: 'private', // PRYWATNY!
    price: 0,
    currency: 'PLN',
    icon: '🤖',
    color: 'bg-cyan-900 dark:bg-cyan-800',
    features: [
      'Integracja Perplexity Max Agent',
      'Wolny wybieg dla agenta',
      'WSZYSTKIE ZMIANY WYMAGAJĄ ZATWIERDZENIA',
      'Zatwierdzanie z panelu #8 (Super Admin)',
      'Budowanie nowych paneli',
      'Debugging i naprawy',
      'Pełen autopilot z kontrolą',
      'Integracja Claude Code',
    ],
    requires2FA: true,
    aiModel: 'opus',
    route: '/panel/comet-assistant',
    accessRoles: ['superadmin'],
    allowedEmails: ['asystent@potrzebny.ai'], // TYLKO ten email!
  },
]

/**
 * GRUPA 2: PANELE UŻYTKOWNIKÓW KOŃCOWYCH (PŁATNE)
 * Panele 10-14
 */
export const USER_PANELS: PanelConfig[] = [
  {
    id: 'student',
    number: 10,
    name: 'Student Panel',
    namePl: 'Panel Ucznia',
    description: 'AI Personalizacja, Note Generator, Flashcards, AI Tutor, Gamifikacja',
    category: 'user',
    visibility: 'public',
    price: 29,
    currency: 'PLN',
    icon: '📚',
    color: 'bg-blue-100 dark:bg-blue-900/30',
    features: [
      'AI Personalizacja (Wzrokowiec/Słuchowiec/ADHD/Dysleksja/ASD)',
      'Note Generator (1 kliknięcie)',
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
    number: 11,
    name: 'University Student Panel',
    namePl: 'Panel Studenta Akademickiego',
    description: 'Transkrypcja wykładów, Academic Summarizer, Citation Helper',
    category: 'user',
    visibility: 'public',
    price: 29,
    currency: 'PLN',
    icon: '🎓',
    color: 'bg-indigo-100 dark:bg-indigo-900/30',
    features: [
      'Transkrypcja wykładów',
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
    number: 12,
    name: 'Patient Panel',
    namePl: 'Panel Pacjenta',
    description: 'Homework od terapeuty, Mood Tracker, Secure Journal, SOS, Health wearables',
    category: 'user',
    visibility: 'public',
    price: 29,
    currency: 'PLN',
    icon: '💚',
    color: 'bg-green-100 dark:bg-green-900/30',
    features: [
      'Homework od terapeuty',
      'Mood Tracker (wykresy trendów)',
      'Secure Journal (szyfrowany)',
      'Psychoedukacja',
      'SOS (Panic Button - 116 123)',
      'Integracja VALIDIC/Terra (wearables)',
      'RODO Art. 9, AES-256',
    ],
    requires2FA: true,
    requiresHealthApi: true,
    aiModel: 'sonnet',
    route: '/panel/patient',
    accessRoles: ['patient'],
  },
  {
    id: 'medical-trainee',
    number: 13,
    name: 'Medical Trainee Panel',
    namePl: 'Panel Studenta Medycznego/Kursanta',
    description: 'Case Studies, Virtual Patient AI, Exam Simulator',
    category: 'user',
    visibility: 'public',
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
      'Pełna personalizacja treści',
    ],
    requires2FA: false,
    aiModel: 'sonnet',
    route: '/panel/medical-trainee',
    accessRoles: ['medical-trainee'],
  },
  {
    id: 'training-personalization',
    number: 14,
    name: 'Training Personalization Panel',
    namePl: 'Panel Szkoleniowy Personalizacyjny',
    description: 'Adaptive Learning, Micro-learning, Certyfikaty',
    category: 'user',
    visibility: 'public',
    price: 29,
    currency: 'PLN',
    icon: '🎯',
    color: 'bg-orange-100 dark:bg-orange-900/30',
    features: [
      'Adaptive Learning',
      'Micro-learning',
      'Certyfikaty automatyczne',
      'Knowledge Retrieval chatbot',
      'Dołączanie do organizacji',
      'Pełna personalizacja treści',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/panel/training',
    accessRoles: ['trainee'],
  },
]

/**
 * GRUPA 3: PANELE PREMIUM
 * Panele 15-17
 */
export const PREMIUM_PANELS: PanelConfig[] = [
  {
    id: 'supermozg',
    number: 15,
    name: 'Supermozg Panel',
    namePl: 'Panel Supermózg',
    description: 'Bonus dla Ultra 79 PLN - Cognitive Training, Neuro-Education, Health wearables',
    category: 'premium',
    visibility: 'public',
    price: 79,
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
      'Integracja VALIDIC/Terra (wearables)',
    ],
    requires2FA: false,
    requiresHealthApi: true,
    aiModel: 'sonnet',
    route: '/panel/supermozg',
    accessRoles: ['ultra'],
  },
  {
    id: 'supermozg-ultra',
    number: 16,
    name: 'Supermozg ULTRA Panel',
    namePl: 'Panel Supermózg ULTRA',
    description: 'Najlepszy panel tego typu na świecie - Claude Opus 4.5, 4000+ APIs, VALIDIC/Terra',
    category: 'premium',
    visibility: 'public',
    price: 699,
    currency: 'PLN',
    icon: '🚀',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    features: [
      'Claude Opus 4.5 (Extended Thinking)',
      '200K+ context window',
      'AI Stack Builder (300+ nootropików)',
      'Farmakogenomika Edukacyjna (23andMe)',
      'Neuro-Optymalizacja',
      'VALIDIC/Terra Integration (Oura/Whoop)',
      'Advanced Longevity Protocols',
      'DrugBank Interaction Checker',
    ],
    requires2FA: false,
    requiresHealthApi: true,
    aiModel: 'opus',
    route: '/panel/supermozg-ultra',
    accessRoles: ['supermozg-ultra'],
  },
  {
    id: 'research-premium',
    number: 17,
    name: 'Research Premium Panel',
    namePl: 'Panel Badawczy Premium',
    description: 'Dla lekarzy specjalistów - PubMed, OncoKB, Precision Medicine, VALIDIC/Terra',
    category: 'premium',
    visibility: 'public',
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
      'VALIDIC/Terra Integration (wearables)',
      'PubMed, OncoKB, PharmGKB, Wiley TDM',
      '5000+ Medical APIs',
    ],
    requires2FA: true,
    requiresPWZ: true,
    requiresHealthApi: true,
    aiModel: 'opus',
    route: '/panel/research',
    accessRoles: ['doctor', 'researcher'],
  },
]

/**
 * GRUPA 4: PANELE SPECJALNE
 * Panele 18-21
 */
export const SPECIAL_PANELS: PanelConfig[] = [
  {
    id: 'psychomedic-b2b',
    number: 18,
    name: 'PsychoMedic B2B Panel',
    namePl: 'Panel PsychoMedic',
    description: 'Specjalny panel B2B dla całej sieci PsychoMedic - Dr Barlik',
    category: 'special',
    visibility: 'public',
    price: 0, // B2B custom pricing
    currency: 'PLN',
    icon: '🏥',
    color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    features: [
      'Dedykowany panel dla sieci PsychoMedic',
      'Integracja z systemami kliniki',
      'Multi-lokalizacja (wszystkie placówki)',
      'Zarządzanie terapeutami i lekarzami',
      'Custom branding',
      'VALIDIC/Terra Integration (wearables)',
      'Raporty dla zarządu',
      'SLA Enterprise',
    ],
    requires2FA: true,
    requiresHealthApi: true,
    aiModel: 'opus',
    route: '/panel/psychomedic',
    accessRoles: ['organization', 'doctor', 'therapist'],
  },
  {
    id: 'therapy-exercises',
    number: 19,
    name: 'Therapy Exercises Panel',
    namePl: 'Panel Ćwiczeń Terapeutycznych',
    description: 'Baza 5000+ ćwiczeń terapeutycznych AI',
    category: 'special',
    visibility: 'public',
    price: 29,
    currency: 'PLN',
    icon: '🧘',
    color: 'bg-teal-100 dark:bg-teal-900/30',
    features: [
      'Baza 5000+ ćwiczeń',
      'Przesyłanie do pacjentów',
      'Monitoring wykonania',
      'Feedback i trudności',
      'Personalizacja ćwiczeń',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/panel/therapy-exercises',
    accessRoles: ['therapist', 'patient'],
  },
  {
    id: 'telebim-led',
    number: 20,
    name: 'Telebim LED Panel',
    namePl: 'Panel Telebim LED',
    description: 'Reklama na ekranie LED - TYLKO WEB! Nie dostępny w App Store/Google Play',
    category: 'special',
    visibility: 'web_only', // TYLKO WEB!
    price: 499,
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
      'BLIK, Karty, Apple Pay, Google Pay, Klarna',
    ],
    requires2FA: false,
    aiModel: 'haiku',
    route: '/dashboard/telebim',
    accessRoles: ['advertiser'],
    platformRestriction: 'web_only',
  },
  {
    id: 'dynamic-panel',
    number: 21,
    name: 'Dynamic Panel',
    namePl: 'Panel Dynamiczny',
    description: 'Panele tworzone dynamicznie przez administratora z panelu #8',
    category: 'special',
    visibility: 'dynamic',
    price: 0,
    currency: 'PLN',
    icon: '✨',
    color: 'bg-gradient-to-r from-pink-500 to-violet-500',
    features: [
      'Tworzenie przez Super Admin (panel #8)',
      'Pełna personalizacja',
      'Custom pricing',
      'Custom features',
      'Custom access roles',
      'Automatyczny deploy Web + App',
    ],
    requires2FA: false,
    aiModel: 'sonnet',
    route: '/panel/dynamic',
    accessRoles: ['superadmin'],
  },
]

// Wszystkie panele (21)
export const ALL_PANELS: PanelConfig[] = [
  ...ADMIN_PANELS,
  ...USER_PANELS,
  ...PREMIUM_PANELS,
  ...SPECIAL_PANELS,
]

// Panele publiczne (widoczne dla użytkowników)
export const PUBLIC_PANELS = ALL_PANELS.filter(p => p.visibility === 'public')

// Panele prywatne (tylko dla określonych emaili)
export const PRIVATE_PANELS = ALL_PANELS.filter(p => p.visibility === 'private')

// Panele tylko web (nie dostępne w App Store/Google Play)
export const WEB_ONLY_PANELS = ALL_PANELS.filter(p => p.visibility === 'web_only')

// Panele z Health API (VALIDIC/Terra)
export const HEALTH_API_PANELS = ALL_PANELS.filter(p => p.requiresHealthApi)

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ROLE UŻYTKOWNIKÓW
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
 * AUTORYZOWANE EMAILE DLA PRYWATNYCH PANELI
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const AUTHORIZED_EMAILS = {
  superAdmin: 'ai@potrzebny.ai',
  cometAssistant: 'asystent@potrzebny.ai',
} as const

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PLANY SUBSKRYPCYJNE
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const SUBSCRIPTION_PLANS = {
  // Darmowe (Admin)
  FREE_ADMIN: 'free_admin',

  // Płatne (User)
  BASIC: 'basic',
  PRO: 'pro',
  ULTRA: 'ultra',

  // Premium
  SUPERMOZG_ULTRA: 'supermozg_ultra',
  RESEARCH_PREMIUM: 'research_premium',

  // Specjalne
  PSYCHOMEDIC_B2B: 'psychomedic_b2b',
  THERAPY_EXERCISES: 'therapy_exercises',
  TELEBIM_GRAFIKA: 'telebim_grafika',
  TELEBIM_VIDEO: 'telebim_video',
  TELEBIM_COMBO: 'telebim_combo',
  TELEBIM_ENTERPRISE: 'telebim_enterprise',
} as const

export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS]

/**
 * Cennik planów
 */
export const PLAN_PRICING = {
  [SUBSCRIPTION_PLANS.FREE_ADMIN]: { price: 0, currency: 'PLN', period: 'lifetime' },
  [SUBSCRIPTION_PLANS.BASIC]: { price: 29, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.PRO]: { price: 49, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.ULTRA]: { price: 79, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.SUPERMOZG_ULTRA]: { price: 699, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.RESEARCH_PREMIUM]: { price: 799, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.PSYCHOMEDIC_B2B]: { price: 0, currency: 'PLN', period: 'custom' },
  [SUBSCRIPTION_PLANS.THERAPY_EXERCISES]: { price: 29, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.TELEBIM_GRAFIKA]: { price: 499, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.TELEBIM_VIDEO]: { price: 1299, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.TELEBIM_COMBO]: { price: 1699, currency: 'PLN', period: 'monthly' },
  [SUBSCRIPTION_PLANS.TELEBIM_ENTERPRISE]: { price: 3999, currency: 'PLN', period: 'monthly' },
} as const

/**
 * Limity planów
 */
export const PLAN_LIMITS = {
  [SUBSCRIPTION_PLANS.FREE_ADMIN]: {
    aiRequests: -1,
    storage: 10000,
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
    psychomedic: '/api/panels/psychomedic',
    dynamic: '/api/panels/dynamic',
  },
  admin: {
    createPanel: '/api/admin/create-panel',
    deletePanel: '/api/admin/delete-panel',
    editPanel: '/api/admin/edit-panel',
    approveChanges: '/api/admin/approve-changes',
    debugPlatform: '/api/admin/debug',
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
    oura: '/api/health/oura',
    whoop: '/api/health/whoop',
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
    // Admin (1-9)
    teacher: '/panel/teacher',
    lecturer: '/panel/lecturer',
    therapist: '/panel/therapist',
    doctorTrainer: '/panel/doctor-trainer',
    therapistTrainer: '/panel/therapist-trainer',
    personalization: '/panel/personalization',
    parent: '/panel/parent',
    admin: '/panel/admin', // PRYWATNY
    cometAssistant: '/panel/comet-assistant', // PRYWATNY
    // User (10-14)
    student: '/panel/student',
    universityStudent: '/panel/university-student',
    patient: '/panel/patient',
    medicalTrainee: '/panel/medical-trainee',
    training: '/panel/training',
    // Premium (15-17)
    supermozg: '/panel/supermozg',
    supermozgUltra: '/panel/supermozg-ultra',
    research: '/panel/research',
    // Special (18-21)
    psychomedic: '/panel/psychomedic',
    therapyExercises: '/panel/therapy-exercises',
    telebim: '/dashboard/telebim', // TYLKO WEB
    dynamic: '/panel/dynamic',
  },
} as const

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * KONFIGURACJA GLOBALNA
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const LANGUAGES = {
  pl: 'Polski',
} as const

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
  owner: 'Bartłomiej Potrzebowski',
  nip: '1133182851',
  email: 'ai@potrzebny.ai',
  assistantEmail: 'asystent@potrzebny.ai',
  dpoEmail: 'dpo@potrzebny.ai',
  supportEmail: 'support@potrzebny.ai',
  vatStatus: 'VAT 0% (edukacja/medycyna)',
  taxForm: 'Ryczałt 12%',
} as const

/**
 * Stałe SOS dla panelu pacjenta
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

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HEALTH API CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const HEALTH_API_CONFIG = {
  validic: {
    enabled: true,
    sandboxExpiry: '2026-01-29', // PILNE!
    migrateToTerra: true,
  },
  terra: {
    enabled: true,
    pricePerUser: 0.50, // USD/mc
    devices: ['oura', 'whoop', 'apple_watch', 'fitbit', 'garmin'],
  },
  native: {
    appleHealthKit: true,
    googleFit: true,
  },
} as const

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * AUTO-DEBUGGING CONFIG
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const AUTO_DEBUG_CONFIG = {
  enabled: true,
  selfHealing: true,
  alertThreshold: 3, // Błędów przed alertem
  autoFixEnabled: true,
  notifyEmail: 'ai@potrzebny.ai',
  integrations: {
    sentry: false, // Używamy Upstash zamiast
    upstash: true,
    posthog: true,
  },
} as const
