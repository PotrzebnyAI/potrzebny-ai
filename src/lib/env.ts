import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Server-side environment variables
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    // Supabase
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

    // Stripe
    STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
    STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_').optional(),

    // Auth
    NEXTAUTH_SECRET: z.string().min(32).optional(),
    NEXTAUTH_URL: z.string().url().optional(),

    // Sentry
    SENTRY_AUTH_TOKEN: z.string().optional(),

    // AI APIs
    ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-').optional(),
    PERPLEXITY_API_KEY: z.string().startsWith('pplx-').optional(),

    // Research APIs
    NCBI_API_KEY: z.string().optional(),
    SCOPUS_API_KEY: z.string().optional(),
    EXA_API_KEY: z.string().optional(),
    BRAVE_SEARCH_API_KEY: z.string().startsWith('BSA').optional(),

    // Google Cloud
    GOOGLE_CLOUD_API_KEY: z.string().startsWith('AIza').optional(),

    // Google Service Account (JSON key for Domain-Wide Delegation)
    // Service Account: gmail-full-access-service-acco@potrzebny-ai-prod.iam.gserviceaccount.com
    // Client ID: 116898976924675896210
    // Scopes: Gmail, Drive, Calendar, Sheets, Docs, Admin
    GOOGLE_SERVICE_ACCOUNT_KEY: z.string().optional(),
  },

  /**
   * Client-side environment variables (exposed to browser)
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional(),
  },

  /**
   * Runtime environment variables
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    // Server
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    NCBI_API_KEY: process.env.NCBI_API_KEY,
    SCOPUS_API_KEY: process.env.SCOPUS_API_KEY,
    EXA_API_KEY: process.env.EXA_API_KEY,
    BRAVE_SEARCH_API_KEY: process.env.BRAVE_SEARCH_API_KEY,
    GOOGLE_CLOUD_API_KEY: process.env.GOOGLE_CLOUD_API_KEY,
    GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,

    // Client
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
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
