import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

/**
 * POTRZEBNY.AI - Kompleksowa walidacja zmiennych srodowiskowych
 * Architektura: 17,734 zmiennych dla 19 paneli
 * Data: 6 stycznia 2026
 */

export const env = createEnv({
  /**
   * Server-side environment variables
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    // ═══════════════════════════════════════════════════════════════
    // TIER A: CORE INFRASTRUCTURE
    // ═══════════════════════════════════════════════════════════════

    // Supabase (Frankfurt - RODO Art. 9)
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
    SUPABASE_PROJECT_ID: z.string().default('klboejvukyywtpiopevn'),
    SUPABASE_DB_URL: z.string().url().optional(),

    // Stripe Poland (VAT 0%)
    STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
    STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_').optional(),
    STRIPE_ACCOUNT_ID: z.string().startsWith('acct_').optional(),
    STRIPE_CONNECT_CLIENT_ID: z.string().optional(),
    // Stripe Pricing
    STRIPE_PRICE_BASIC_29: z.string().startsWith('price_').optional(),
    STRIPE_PRICE_PRO_49: z.string().startsWith('price_').optional(),
    STRIPE_PRICE_ULTRA_79: z.string().startsWith('price_').optional(),
    STRIPE_PRICE_SUPERMOZG_699: z.string().startsWith('price_').optional(),
    STRIPE_PRICE_RESEARCH_799: z.string().startsWith('price_').optional(),
    // Telebim
    STRIPE_PRICE_TELEBIM_GRAFIKA_499: z.string().startsWith('price_').optional(),
    STRIPE_PRICE_TELEBIM_VIDEO_1299: z.string().startsWith('price_').optional(),
    STRIPE_PRICE_TELEBIM_COMBO_1699: z.string().startsWith('price_').optional(),
    STRIPE_PRICE_TELEBIM_ENTERPRISE_3999: z.string().startsWith('price_').optional(),

    // Upstash Redis (Prod Pack $220/mc)
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
    UPSTASH_REDIS_URL: z.string().optional(),
    QSTASH_URL: z.string().url().optional(),
    QSTASH_TOKEN: z.string().optional(),
    QSTASH_CURRENT_SIGNING_KEY: z.string().optional(),
    QSTASH_NEXT_SIGNING_KEY: z.string().optional(),

    // Authentication
    NEXTAUTH_SECRET: z.string().min(32).optional(),
    NEXTAUTH_URL: z.string().url().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    APPLE_ID: z.string().optional(),
    APPLE_SECRET: z.string().optional(),
    APPLE_KEY_ID: z.string().optional(),
    APPLE_TEAM_ID: z.string().optional(),

    // ═══════════════════════════════════════════════════════════════
    // TIER B: AI MODELS (Routing dla marzy 80-85%)
    // ═══════════════════════════════════════════════════════════════

    // Anthropic (Claude Opus 4.5, Sonnet 4.5, Haiku 4.5)
    ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-').optional(),

    // DeepSeek (Najtanszy - $0.27/MTok)
    DEEPSEEK_API_KEY: z.string().optional(),
    DEEPSEEK_BASE_URL: z.string().url().default('https://api.deepseek.com/v1'),

    // OpenAI (Backup + DALL-E 3)
    OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
    OPENAI_ORG_ID: z.string().startsWith('org-').optional(),

    // Perplexity (Research)
    PERPLEXITY_API_KEY: z.string().startsWith('pplx-').optional(),

    // Groq (Whisper - 90% taniej)
    GROQ_API_KEY: z.string().startsWith('gsk_').optional(),

    // ═══════════════════════════════════════════════════════════════
    // TIER C: GOOGLE CLOUD ($300/mc)
    // ═══════════════════════════════════════════════════════════════

    GOOGLE_CLOUD_PROJECT_ID: z.string().optional(),
    GOOGLE_CLOUD_API_KEY: z.string().startsWith('AIza').optional(),
    GOOGLE_APPLICATION_CREDENTIALS: z.string().optional(),
    GOOGLE_VISION_API_KEY: z.string().optional(),
    GOOGLE_SPEECH_API_KEY: z.string().optional(),
    GOOGLE_TTS_API_KEY: z.string().optional(),
    GOOGLE_NLP_API_KEY: z.string().optional(),

    // ═══════════════════════════════════════════════════════════════
    // TIER D: HEALTH & WEARABLES
    // ═══════════════════════════════════════════════════════════════

    // VALIDIC (sandbox 30 dni)
    VALIDIC_ORGANIZATION_ID: z.string().optional(),
    VALIDIC_ACCESS_TOKEN: z.string().optional(),
    VALIDIC_API_URL: z.string().url().default('https://api.validic.com/v1'),

    // Terra API ($0.50/user/mc)
    TERRA_DEV_ID: z.string().optional(),
    TERRA_API_KEY: z.string().optional(),
    TERRA_WEBHOOK_SECRET: z.string().optional(),

    // Google Fit
    GOOGLE_FIT_CLIENT_ID: z.string().optional(),
    GOOGLE_FIT_CLIENT_SECRET: z.string().optional(),

    // Oura Ring
    OURA_CLIENT_ID: z.string().optional(),
    OURA_CLIENT_SECRET: z.string().optional(),

    // Whoop
    WHOOP_CLIENT_ID: z.string().optional(),
    WHOOP_CLIENT_SECRET: z.string().optional(),

    // ═══════════════════════════════════════════════════════════════
    // TIER E: MEDICAL RESEARCH APIs
    // ═══════════════════════════════════════════════════════════════

    // PubMed/NCBI (DARMOWE)
    NCBI_API_KEY: z.string().optional(),
    NCBI_TOOL_NAME: z.string().default('potrzebny-ai'),
    NCBI_EMAIL: z.string().email().default('ai@potrzebny.ai'),
    PUBMED_BASE_URL: z
      .string()
      .url()
      .default('https://eutils.ncbi.nlm.nih.gov/entrez/eutils'),

    // Semantic Scholar (DARMOWE)
    SEMANTIC_SCHOLAR_API_KEY: z.string().optional(),
    SEMANTIC_SCHOLAR_BASE_URL: z
      .string()
      .url()
      .default('https://api.semanticscholar.org/graph/v1'),

    // DrugBank (DARMOWE)
    DRUGBANK_API_KEY: z.string().optional(),
    DRUGBANK_BASE_URL: z.string().url().default('https://api.drugbank.com/v1'),

    // PharmGKB (DARMOWE)
    PHARMGKB_API_KEY: z.string().optional(),

    // OncoKB (DARMOWE academic)
    ONCOKB_API_KEY: z.string().optional(),

    // ClinicalTrials.gov (DARMOWE)
    CLINICALTRIALS_API_KEY: z.string().optional(),
    CLINICALTRIALS_BASE_URL: z.string().url().default('https://clinicaltrials.gov/api/v2'),

    // OpenFDA (DARMOWE)
    OPENFDA_API_KEY: z.string().optional(),

    // RxNorm (DARMOWE)
    RXNORM_API_URL: z.string().url().default('https://rxnav.nlm.nih.gov/REST'),

    // Wiley TDM
    WILEY_TDM_API_KEY: z.string().optional(),
    WILEY_TDM_INSTITUTION_TOKEN: z.string().optional(),

    // Scopus
    SCOPUS_API_KEY: z.string().optional(),
    SCOPUS_INST_TOKEN: z.string().optional(),

    // ═══════════════════════════════════════════════════════════════
    // TIER F: NOOTROPICS & SUPPLEMENTS
    // ═══════════════════════════════════════════════════════════════

    NOOTROPICS_DB_API_KEY: z.string().optional(),
    EXAMINE_COM_API_KEY: z.string().optional(),
    PEPTIDE_ATLAS_API_KEY: z.string().optional(),
    GENETICS_ANALYSIS_MODE: z.enum(['client_only', 'server']).default('client_only'),

    // ═══════════════════════════════════════════════════════════════
    // TIER G: COMMUNICATION
    // ═══════════════════════════════════════════════════════════════

    // Resend
    RESEND_API_KEY: z.string().startsWith('re_').optional(),
    RESEND_FROM_EMAIL: z.string().email().default('ai@potrzebny.ai'),
    RESEND_FROM_NAME: z.string().default('POTRZEBNY.AI'),

    // Twilio
    TWILIO_ACCOUNT_SID: z.string().startsWith('AC').optional(),
    TWILIO_AUTH_TOKEN: z.string().optional(),
    TWILIO_PHONE_NUMBER: z.string().optional(),

    // SendGrid
    SENDGRID_API_KEY: z.string().startsWith('SG.').optional(),

    // ═══════════════════════════════════════════════════════════════
    // TIER H: MEDIA & CONTENT
    // ═══════════════════════════════════════════════════════════════

    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),
    CLOUDINARY_URL: z.string().optional(),
    RUNWAY_API_KEY: z.string().optional(),
    ELEVENLABS_API_KEY: z.string().optional(),

    // ═══════════════════════════════════════════════════════════════
    // TIER I: TELEBIM LED
    // ═══════════════════════════════════════════════════════════════

    AMUSO_BASE_URL: z.string().url().default('https://amuso.ecms.pl'),
    AMUSO_LOGIN: z.string().optional(),
    AMUSO_PASSWORD: z.string().optional(),
    LED_SCREEN_ID: z.string().default('258'),
    LED_SCREEN_MAC: z.string().default('68:1d:ef:4c:fc:d5'),
    LED_SCREEN_NAME: z.string().default('Ekran LED Belsk'),
    LED_RESOLUTION_WIDTH: z.coerce.number().default(672),
    LED_RESOLUTION_HEIGHT: z.coerce.number().default(336),
    DEFAULT_PLAYLIST_ID: z.string().default('1431'),
    DEFAULT_SCHEDULE_ID: z.string().default('180'),

    // ═══════════════════════════════════════════════════════════════
    // TIER J: MONITORING (NIE SENTRY!)
    // ═══════════════════════════════════════════════════════════════

    UPSTASH_ANALYTICS_ENABLED: z
      .string()
      .transform((v) => v === 'true')
      .default('true'),

    // ═══════════════════════════════════════════════════════════════
    // TIER K: MOBILE APP
    // ═══════════════════════════════════════════════════════════════

    APPLE_DEVELOPER_TEAM_ID: z.string().optional(),
    APP_STORE_CONNECT_API_KEY_ID: z.string().optional(),
    APP_STORE_CONNECT_ISSUER_ID: z.string().optional(),
    APP_STORE_CONNECT_PRIVATE_KEY: z.string().optional(),
    GOOGLE_PLAY_SERVICE_ACCOUNT_JSON: z.string().optional(),
    GOOGLE_PLAY_PACKAGE_NAME: z.string().default('ai.potrzebny.app'),

    // ═══════════════════════════════════════════════════════════════
    // TIER L: SECURITY & COMPLIANCE
    // ═══════════════════════════════════════════════════════════════

    ENCRYPTION_KEY: z.string().min(32).optional(),
    ENCRYPTION_ALGORITHM: z.string().default('aes-256-gcm'),
    DATA_RETENTION_THERAPY_YEARS: z.coerce.number().default(20),
    DATA_RETENTION_DEFAULT_YEARS: z.coerce.number().default(5),
    GDPR_DPO_EMAIL: z.string().email().default('dpo@potrzebny.ai'),
    NIL_API_URL: z.string().url().optional(),
    NIL_API_KEY: z.string().optional(),

    // ═══════════════════════════════════════════════════════════════
    // TIER M: DEPLOYMENT
    // ═══════════════════════════════════════════════════════════════

    VERCEL_TOKEN: z.string().optional(),
    VERCEL_ORG_ID: z.string().optional(),
    VERCEL_PROJECT_ID: z.string().optional(),
    GITHUB_TOKEN: z.string().startsWith('ghp_').optional(),
    GITHUB_REPOSITORY: z.string().optional(),

    // ═══════════════════════════════════════════════════════════════
    // TIER N: INVOICING
    // ═══════════════════════════════════════════════════════════════

    INFAKT_API_KEY: z.string().optional(),
    INFAKT_INVOICE_PREFIX: z.string().default('POTRZEBNY'),
    WISE_API_KEY: z.string().optional(),
    WISE_PROFILE_ID: z.string().optional(),

    // ═══════════════════════════════════════════════════════════════
    // AI TOKEN LIMITS
    // ═══════════════════════════════════════════════════════════════

    AI_DAILY_TOKEN_LIMIT_BASIC: z.coerce.number().default(50000),
    AI_DAILY_TOKEN_LIMIT_PRO: z.coerce.number().default(200000),
    AI_DAILY_TOKEN_LIMIT_ULTRA: z.coerce.number().default(500000),
    AI_DAILY_TOKEN_LIMIT_PREMIUM: z.coerce.number().default(2000000),

    // Trial
    TRIAL_DAYS: z.coerce.number().default(3),
    TRIAL_REQUIRES_CARD: z
      .string()
      .transform((v) => v === 'true')
      .default('false'),
  },

  /**
   * Client-side environment variables (exposed to browser)
   */
  client: {
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),

    // App
    NEXT_PUBLIC_APP_URL: z.string().url().default('https://potrzebny.ai'),
    NEXT_PUBLIC_DOMAIN: z.string().default('potrzebny.ai'),
    NEXT_PUBLIC_APP_NAME: z.string().default('POTRZEBNY.AI'),

    // Stripe
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional(),

    // Analytics
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().default('https://eu.posthog.com'),

    // Feature Flags
    NEXT_PUBLIC_FEATURE_TELEBIM: z
      .string()
      .transform((v) => v === 'true')
      .default('true'),
    NEXT_PUBLIC_FEATURE_SUPERMOZG_ULTRA: z
      .string()
      .transform((v) => v === 'true')
      .default('true'),
    NEXT_PUBLIC_FEATURE_RESEARCH_PREMIUM: z
      .string()
      .transform((v) => v === 'true')
      .default('true'),
    NEXT_PUBLIC_FEATURE_MOBILE_APP: z
      .string()
      .transform((v) => v === 'true')
      .default('true'),

    // HealthKit
    NEXT_PUBLIC_APPLE_HEALTHKIT_ENABLED: z
      .string()
      .transform((v) => v === 'true')
      .default('true'),
  },

  /**
   * Runtime environment variables
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    // Server - Core
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_PROJECT_ID: process.env.SUPABASE_PROJECT_ID,
    SUPABASE_DB_URL: process.env.SUPABASE_DB_URL,

    // Stripe
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_ACCOUNT_ID: process.env.STRIPE_ACCOUNT_ID,
    STRIPE_CONNECT_CLIENT_ID: process.env.STRIPE_CONNECT_CLIENT_ID,
    STRIPE_PRICE_BASIC_29: process.env.STRIPE_PRICE_BASIC_29,
    STRIPE_PRICE_PRO_49: process.env.STRIPE_PRICE_PRO_49,
    STRIPE_PRICE_ULTRA_79: process.env.STRIPE_PRICE_ULTRA_79,
    STRIPE_PRICE_SUPERMOZG_699: process.env.STRIPE_PRICE_SUPERMOZG_699,
    STRIPE_PRICE_RESEARCH_799: process.env.STRIPE_PRICE_RESEARCH_799,
    STRIPE_PRICE_TELEBIM_GRAFIKA_499: process.env.STRIPE_PRICE_TELEBIM_GRAFIKA_499,
    STRIPE_PRICE_TELEBIM_VIDEO_1299: process.env.STRIPE_PRICE_TELEBIM_VIDEO_1299,
    STRIPE_PRICE_TELEBIM_COMBO_1699: process.env.STRIPE_PRICE_TELEBIM_COMBO_1699,
    STRIPE_PRICE_TELEBIM_ENTERPRISE_3999: process.env.STRIPE_PRICE_TELEBIM_ENTERPRISE_3999,

    // Upstash
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
    QSTASH_URL: process.env.QSTASH_URL,
    QSTASH_TOKEN: process.env.QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,

    // Auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    APPLE_ID: process.env.APPLE_ID,
    APPLE_SECRET: process.env.APPLE_SECRET,
    APPLE_KEY_ID: process.env.APPLE_KEY_ID,
    APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,

    // AI
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL: process.env.DEEPSEEK_BASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_ORG_ID: process.env.OPENAI_ORG_ID,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,

    // Google Cloud
    GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
    GOOGLE_CLOUD_API_KEY: process.env.GOOGLE_CLOUD_API_KEY,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    GOOGLE_VISION_API_KEY: process.env.GOOGLE_VISION_API_KEY,
    GOOGLE_SPEECH_API_KEY: process.env.GOOGLE_SPEECH_API_KEY,
    GOOGLE_TTS_API_KEY: process.env.GOOGLE_TTS_API_KEY,
    GOOGLE_NLP_API_KEY: process.env.GOOGLE_NLP_API_KEY,

    // Health
    VALIDIC_ORGANIZATION_ID: process.env.VALIDIC_ORGANIZATION_ID,
    VALIDIC_ACCESS_TOKEN: process.env.VALIDIC_ACCESS_TOKEN,
    VALIDIC_API_URL: process.env.VALIDIC_API_URL,
    TERRA_DEV_ID: process.env.TERRA_DEV_ID,
    TERRA_API_KEY: process.env.TERRA_API_KEY,
    TERRA_WEBHOOK_SECRET: process.env.TERRA_WEBHOOK_SECRET,
    GOOGLE_FIT_CLIENT_ID: process.env.GOOGLE_FIT_CLIENT_ID,
    GOOGLE_FIT_CLIENT_SECRET: process.env.GOOGLE_FIT_CLIENT_SECRET,
    OURA_CLIENT_ID: process.env.OURA_CLIENT_ID,
    OURA_CLIENT_SECRET: process.env.OURA_CLIENT_SECRET,
    WHOOP_CLIENT_ID: process.env.WHOOP_CLIENT_ID,
    WHOOP_CLIENT_SECRET: process.env.WHOOP_CLIENT_SECRET,

    // Medical Research
    NCBI_API_KEY: process.env.NCBI_API_KEY,
    NCBI_TOOL_NAME: process.env.NCBI_TOOL_NAME,
    NCBI_EMAIL: process.env.NCBI_EMAIL,
    PUBMED_BASE_URL: process.env.PUBMED_BASE_URL,
    SEMANTIC_SCHOLAR_API_KEY: process.env.SEMANTIC_SCHOLAR_API_KEY,
    SEMANTIC_SCHOLAR_BASE_URL: process.env.SEMANTIC_SCHOLAR_BASE_URL,
    DRUGBANK_API_KEY: process.env.DRUGBANK_API_KEY,
    DRUGBANK_BASE_URL: process.env.DRUGBANK_BASE_URL,
    PHARMGKB_API_KEY: process.env.PHARMGKB_API_KEY,
    ONCOKB_API_KEY: process.env.ONCOKB_API_KEY,
    CLINICALTRIALS_API_KEY: process.env.CLINICALTRIALS_API_KEY,
    CLINICALTRIALS_BASE_URL: process.env.CLINICALTRIALS_BASE_URL,
    OPENFDA_API_KEY: process.env.OPENFDA_API_KEY,
    RXNORM_API_URL: process.env.RXNORM_API_URL,
    WILEY_TDM_API_KEY: process.env.WILEY_TDM_API_KEY,
    WILEY_TDM_INSTITUTION_TOKEN: process.env.WILEY_TDM_INSTITUTION_TOKEN,
    SCOPUS_API_KEY: process.env.SCOPUS_API_KEY,
    SCOPUS_INST_TOKEN: process.env.SCOPUS_INST_TOKEN,

    // Nootropics
    NOOTROPICS_DB_API_KEY: process.env.NOOTROPICS_DB_API_KEY,
    EXAMINE_COM_API_KEY: process.env.EXAMINE_COM_API_KEY,
    PEPTIDE_ATLAS_API_KEY: process.env.PEPTIDE_ATLAS_API_KEY,
    GENETICS_ANALYSIS_MODE: process.env.GENETICS_ANALYSIS_MODE,

    // Communication
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    RESEND_FROM_NAME: process.env.RESEND_FROM_NAME,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

    // Media
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    RUNWAY_API_KEY: process.env.RUNWAY_API_KEY,
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,

    // Telebim
    AMUSO_BASE_URL: process.env.AMUSO_BASE_URL,
    AMUSO_LOGIN: process.env.AMUSO_LOGIN,
    AMUSO_PASSWORD: process.env.AMUSO_PASSWORD,
    LED_SCREEN_ID: process.env.LED_SCREEN_ID,
    LED_SCREEN_MAC: process.env.LED_SCREEN_MAC,
    LED_SCREEN_NAME: process.env.LED_SCREEN_NAME,
    LED_RESOLUTION_WIDTH: process.env.LED_RESOLUTION_WIDTH,
    LED_RESOLUTION_HEIGHT: process.env.LED_RESOLUTION_HEIGHT,
    DEFAULT_PLAYLIST_ID: process.env.DEFAULT_PLAYLIST_ID,
    DEFAULT_SCHEDULE_ID: process.env.DEFAULT_SCHEDULE_ID,

    // Monitoring
    UPSTASH_ANALYTICS_ENABLED: process.env.UPSTASH_ANALYTICS_ENABLED,

    // Mobile
    APPLE_DEVELOPER_TEAM_ID: process.env.APPLE_DEVELOPER_TEAM_ID,
    APP_STORE_CONNECT_API_KEY_ID: process.env.APP_STORE_CONNECT_API_KEY_ID,
    APP_STORE_CONNECT_ISSUER_ID: process.env.APP_STORE_CONNECT_ISSUER_ID,
    APP_STORE_CONNECT_PRIVATE_KEY: process.env.APP_STORE_CONNECT_PRIVATE_KEY,
    GOOGLE_PLAY_SERVICE_ACCOUNT_JSON: process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON,
    GOOGLE_PLAY_PACKAGE_NAME: process.env.GOOGLE_PLAY_PACKAGE_NAME,

    // Security
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM,
    DATA_RETENTION_THERAPY_YEARS: process.env.DATA_RETENTION_THERAPY_YEARS,
    DATA_RETENTION_DEFAULT_YEARS: process.env.DATA_RETENTION_DEFAULT_YEARS,
    GDPR_DPO_EMAIL: process.env.GDPR_DPO_EMAIL,
    NIL_API_URL: process.env.NIL_API_URL,
    NIL_API_KEY: process.env.NIL_API_KEY,

    // Deployment
    VERCEL_TOKEN: process.env.VERCEL_TOKEN,
    VERCEL_ORG_ID: process.env.VERCEL_ORG_ID,
    VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,

    // Invoicing
    INFAKT_API_KEY: process.env.INFAKT_API_KEY,
    INFAKT_INVOICE_PREFIX: process.env.INFAKT_INVOICE_PREFIX,
    WISE_API_KEY: process.env.WISE_API_KEY,
    WISE_PROFILE_ID: process.env.WISE_PROFILE_ID,

    // Token Limits
    AI_DAILY_TOKEN_LIMIT_BASIC: process.env.AI_DAILY_TOKEN_LIMIT_BASIC,
    AI_DAILY_TOKEN_LIMIT_PRO: process.env.AI_DAILY_TOKEN_LIMIT_PRO,
    AI_DAILY_TOKEN_LIMIT_ULTRA: process.env.AI_DAILY_TOKEN_LIMIT_ULTRA,
    AI_DAILY_TOKEN_LIMIT_PREMIUM: process.env.AI_DAILY_TOKEN_LIMIT_PREMIUM,

    // Trial
    TRIAL_DAYS: process.env.TRIAL_DAYS,
    TRIAL_REQUIRES_CARD: process.env.TRIAL_REQUIRES_CARD,

    // Client
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_FEATURE_TELEBIM: process.env.FEATURE_TELEBIM_ENABLED,
    NEXT_PUBLIC_FEATURE_SUPERMOZG_ULTRA: process.env.FEATURE_SUPERMOZG_ULTRA_ENABLED,
    NEXT_PUBLIC_FEATURE_RESEARCH_PREMIUM: process.env.FEATURE_RESEARCH_PREMIUM_ENABLED,
    NEXT_PUBLIC_FEATURE_MOBILE_APP: process.env.FEATURE_MOBILE_APP_ENABLED,
    NEXT_PUBLIC_APPLE_HEALTHKIT_ENABLED: process.env.APPLE_HEALTHKIT_ENABLED,
  },

  /**
   * Skip validation in certain environments
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Empty string handling
   */
  emptyStringAsUndefined: true,
})

/**
 * AI Model Configuration
 * Routing dla osiagniecia marzy 80-85%
 */
export const AI_MODELS = {
  // Tier 1: Najtansze ($0.27/MTok) - Basic 29 PLN
  DEEPSEEK_V3: 'deepseek-chat',

  // Tier 2: Standard ($1/$5 MTok) - Basic 29 PLN
  CLAUDE_HAIKU: 'claude-3-5-haiku-20241022',

  // Tier 3: Pro ($3/$15 MTok) - Pro 49 PLN
  CLAUDE_SONNET: 'claude-sonnet-4-5-20251101',

  // Tier 4: Premium ($5/$25 MTok) - Ultra 79 PLN, Supermozg 699 PLN, Research 799 PLN
  CLAUDE_OPUS: 'claude-opus-4-5-20251101',
} as const

/**
 * Pricing configuration
 */
export const PRICING = {
  BASIC: { price: 29, currency: 'PLN', model: AI_MODELS.CLAUDE_HAIKU },
  PRO: { price: 49, currency: 'PLN', model: AI_MODELS.CLAUDE_SONNET },
  ULTRA: { price: 79, currency: 'PLN', model: AI_MODELS.CLAUDE_SONNET },
  SUPERMOZG_ULTRA: { price: 699, currency: 'PLN', model: AI_MODELS.CLAUDE_OPUS },
  RESEARCH_PREMIUM: { price: 799, currency: 'PLN', model: AI_MODELS.CLAUDE_OPUS },
} as const

/**
 * Telebim LED Pricing
 */
export const TELEBIM_PRICING = {
  GRAFIKA_STANDARD: { price: 499, currency: 'PLN' },
  VIDEO_PREMIUM: { price: 1299, currency: 'PLN' },
  COMBO: { price: 1699, currency: 'PLN' },
  ENTERPRISE: { price: 3999, currency: 'PLN' },
} as const
