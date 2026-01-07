# 🚀 CLAUDE CODE PROMPTS - 24H AUTODEPLOY SETUP
## Dla POTRZEBNY.AI Web + iOS + Android simultaneous deployment

---

## PROMPT 1: AI MODEL ROUTING IMPLEMENTATION

```
Zaimplementuj optymalny AI Model Routing system dla POTRZEBNY.AI z wyliczeniami kosztów:

REQUIREMENTS:
1. Dynamiczny routing na bazie subscription tier użytkownika:
   - Basic (29 PLN) → DeepSeek V3 (cost per request: $0.0002)
   - Pro (49 PLN) → Claude Sonnet 4.5 (cost: $0.008)
   - Ultra (79 PLN) → Claude Sonnet 4.5 (cost: $0.008)
   - Premium (699/799 PLN) → Claude Opus 4.5 (cost: $0.05)

2. Cost tracking na poziomie request:
   - Track actual token usage vs predicted
   - Alert if monthly user cost exceeds tier budget
   - Implement token caching (90% savings possible)

3. Fallback mechanism:
   - If Claude API down → DeepSeek fallback
   - If both down → return cached response
   - Log all fallbacks to Sentry

4. Batch processing optimization:
   - Detect batch-able jobs (50% discount)
   - Queue for off-peak processing
   - Implement priority queue for real-time

IMPLEMENTATION:
- Use TypeScript with types
- Integrate with existing app structure
- Add cost limit per tier per month
- Export to .env.example with pricing

DELIVERABLES:
1. /lib/ai/routing.ts - Main routing logic
2. /lib/ai/pricing.ts - Cost calculations
3. /types/ai.ts - TypeScript types
4. /api/ai/health.ts - Cost monitoring endpoint
5. Updated .env.example
```

---

## PROMPT 2: TERRA API HEALTH WEARABLES INTEGRATION

```
Zintegruj Terra API zamiast wygasającego VALIDIC dla health wearables:

REQUIREMENTS:
1. Setup Terra API client:
   - $0.50/user/month pricing model
   - Support 600+ devices (Apple Watch, Fitbit, Oura, etc.)
   - Real-time data sync (15-min intervals)
   - Fallback to Apple HealthKit + Google Fit (native, FREE)

2. Data ingestion pipeline:
   - Parse Terra webhook responses
   - Normalize to FHIR format
   - Store encrypted in Supabase (AES-256)
   - Implement RLS for patient privacy

3. User onboarding flow:
   - OAuth2 redirect to Terra
   - Device selection UI
   - Consent management (RODO Art. 9)
   - Test with 5 wearable types

4. Migration from VALIDIC:
   - Parallel run both for 30 days
   - Data sync validation (compare points)
   - Zero-downtime switchover script
   - Rollback procedure

5. Fallback strategy:
   - Apple HealthKit native integration (iOS)
   - Google Fit native integration (Android)
   - Web dashboard without device (manual entry)

IMPLEMENTATION:
- Use TypeScript with type-safe client
- Implement comprehensive error handling
- Add encryption layer before storage
- Create migration CLI

DELIVERABLES:
1. /lib/health/terra-client.ts - Terra API wrapper
2. /lib/health/healthkit-integration.ts - Apple native
3. /lib/health/google-fit-integration.ts - Android native
4. /pages/api/health/webhook.ts - Webhook handler
5. /pages/api/health/migrate-validic.ts - Migration tool
6. Updated RODO compliance docs
```

---

## PROMPT 3: STRIPE POLAND PAYMENTS + MARKETPLACE

```
Zaimplementuj Stripe payments dla Polski z marketplace revenue split:

REQUIREMENTS:
1. Payment method setup:
   - Primary: BLIK (1.6% + 1 PLN) - dominuje 65% e-commerce PL
   - Fallback: Karty EOG (1.5% + 1 PLN)
   - Alternative: Klarna, Przelewy24
   - Test each method with €10, €50, €100 transactions

2. Pricing tier checkout:
   - Basic: 29 PLN/mc (monthly renewable)
   - Pro: 49 PLN/mc
   - Ultra: 79 PLN/mc
   - Premium: 699 PLN (annual), 799 PLN (monthly)
   - Implement try-before-buy (3 days free for Basic/Pro)

3. VAT 0% for education/medical:
   - Stripe Tax API integration
   - Auto-detect for educational/medical organizations
   - Documentation for compliance

4. Marketplace - Stripe Connect for educators:
   - 70% platform / 30% educator split
   - Automatic payout (direct to educator bank account)
   - Weekly settlements
   - Dispute handling

5. Subscriptions + payment tracking:
   - Implement webhook for success/failure
   - Automatic downgrade on failed payment
   - Retry logic (3 attempts, 3 day spacing)
   - Invoice generation + email

IMPLEMENTATION:
- Next.js API routes with Stripe SDK
- Database schema for payments, subscriptions, analytics
- Webhook security (verify signatures)
- Automated retry logic

DELIVERABLES:
1. /api/payments/checkout.ts - Create checkout session
2. /api/payments/webhook.ts - Handle Stripe webhooks
3. /api/connect/onboard.ts - Educator marketplace onboarding
4. /lib/stripe/client.ts - Stripe TypeScript client
5. /lib/stripe/pricing.ts - Price lookup
6. /components/CheckoutForm.tsx - Checkout UI
7. Database migrations for payments schema
8. Updated .env.example with Stripe keys
```

---

## PROMPT 4: EXPO EAS BUILD - 24H SIMULTANEOUS DEPLOY

```
Skonfiguruj Expo EAS build dla simultaneous deployment na Web + App Store + Google Play:

REQUIREMENTS:
1. Single Codebase (Next.js + React Native):
   - /apps/web - Next.js 15 (Vercel deployment)
   - /apps/mobile - Expo (EAS build + submit)
   - /packages/shared - Shared TypeScript code
   - Monorepo structure with pnpm workspaces

2. EAS Build Configuration:
   - iOS build (Apple architecture)
   - Android build (Google Play)
   - Web build (Vercel)
   - Parallel execution (30 min total)

3. Build Matrix:
   - Development: For internal testing
   - Staging: Pre-production validation
   - Production: For App Store/Google Play
   - Web: Continuous deployment to Vercel

4. Automated submission:
   - Post-build: Auto-submit to App Store
   - Post-build: Auto-submit to Google Play
   - Post-build: Auto-deploy web to Vercel
   - Notification on success/failure

5. Versioning:
   - Semantic versioning (package.json)
   - Auto-increment build number
   - Changelog generation
   - Git tag on release

6. Signing & Certificates:
   - Apple signing certificate (automated)
   - Google Play signing key (secure storage)
   - iOS provisioning profile (auto-renewed)

IMPLEMENTATION:
- EAS configuration file (eas.json)
- CI/CD pipeline (GitHub Actions)
- Environment-specific .env files
- Build scripts in package.json

DELIVERABLES:
1. /eas.json - EAS build config
2. /.github/workflows/deploy.yml - GitHub Actions
3. /scripts/build-all.sh - Local build script
4. /scripts/submit-stores.sh - App store submission
5. /apps/web/next.config.js - Web config
6. /apps/mobile/app.json - Expo config
7. pnpm workspace setup
8. Documentation: DEPLOY.md with 24h checklist
```

---

## PROMPT 5: RODO ART. 9 COMPLIANCE + ISO 27001 READINESS

```
Wdrożyć RODO Art. 9 compliance framework dla danych medycznych + ISO 27001 prep:

REQUIREMENTS:
1. Data Architecture (RODO Art. 9):
   - Supabase Frankfurt region (EU data residency)
   - AES-256 encryption at rest (pgcrypto)
   - TLS 1.3+ encryption in transit
   - Row Level Security (RLS) for patient isolation
   - No data leaving Poland/EU

2. Encryption Implementation:
   - Column-level encryption for sensitive fields:
     * patient_medical_records
     * therapist_notes
     * mood_tracker_entries
     * prescription_data
   - Implement pgcrypto functions
   - Key rotation yearly

3. Access Control:
   - RLS policies (patient can only see own data)
   - Doctor can only see assigned patients
   - Therapist can only see supervised clients
   - Super admin God Mode with audit trails

4. Audit Logging:
   - All data access logged (who, when, what)
   - 7-year retention (per medical requirements)
   - Immutable audit log
   - Automated alerts for suspicious access

5. Data Retention:
   - Therapy notes: 5 years post-termination
   - Medical records: 10 years (or patient request)
   - Billing: 7 years
   - Automatic purge with compliance notification

6. User Consent:
   - Explicit opt-in for data collection
   - Granular permissions (medical vs. educational)
   - Easy withdrawal of consent
   - Data export (GDPR right)
   - Data deletion (right to be forgotten)

7. Vendor Compliance:
   - Supabase BAA (Business Associate Agreement)
   - Stripe PCI-DSS compliance
   - All sub-processors documented

8. ISO 27001 Preparation:
   - Security policy documentation
   - Risk register
   - Incident response procedures
   - Employee training requirements
   - Backup & disaster recovery plan

IMPLEMENTATION:
- Database schema with RLS policies
- Encryption/decryption utilities
- Audit logging middleware
- Consent management UI
- Data export/deletion workflows
- Compliance dashboard

DELIVERABLES:
1. /db/migrations/rodo-setup.sql - RLS + encryption
2. /lib/crypto/encryption.ts - Encrypt/decrypt functions
3. /lib/audit/logger.ts - Audit trail
4. /api/gdpr/export.ts - Data export endpoint
5. /api/gdpr/delete.ts - Data deletion endpoint
6. /components/ConsentForm.tsx - User consent UI
7. /docs/RODO_COMPLIANCE.md - Full compliance doc
8. /docs/ISO27001_ROADMAP.md - Year 1-2 roadmap
9. Security policy templates
10. Incident response procedures
```

---

## PROMPT 6: MEDICAL APIs INTEGRATION

```
Zintegruj darmowe medical APIs dla Panel Badawczego:

REQUIREMENTS:
1. PubMed E-utilities (39M articles, FREE):
   - ESearch: Search for articles
   - EFetch: Retrieve full records
   - Rate limit: 3 req/sec production
   - Implement caching (30 days)
   - Display abstracts + links to full text

2. DrugBank API (13k drugs, FREE):
   - Drug lookup by name/ID
   - Interactions database
   - Pharmacology info
   - Cache locally (update monthly)

3. PharmGKB (5000+ gene-drug pairs, FREE):
   - Pharmacogenomics data
   - Genetic variants
   - Clinical annotations

4. OncoKB (Cancer genomics, FREE):
   - Mutation annotations
   - Clinical implications
   - Research publications

5. Semantic Scholar (200M papers, FREE):
   - Better than PubMed for many use cases
   - Citation tracking
   - Author profiles
   - Allen AI API

6. ClinicalTrials.gov (500k trials, FREE):
   - Trial search
   - Eligibility criteria
   - Location filtering

7. Optional - Wiley TDM (negotiate startup pricing):
   - Full-text access
   - Text mining rights
   - Estimated: $7.5k-20k/year after negotiation

IMPLEMENTATION:
- TypeScript clients for each API
- Unified search interface
- Citation formatting (APA, MLA, Harvard)
- Integration with Claude for summarization
- Caching layer for performance
- Rate limiting awareness

DELIVERABLES:
1. /lib/medical/pubmed-client.ts
2. /lib/medical/drugbank-client.ts
3. /lib/medical/pharmgkb-client.ts
4. /lib/medical/oncokb-client.ts
5. /lib/medical/semantic-scholar-client.ts
6. /lib/medical/clinical-trials-client.ts
7. /api/research/search.ts - Unified search endpoint
8. /components/MedicalSearch.tsx - UI component
9. /db/migrations/medical-cache.sql
10. Documentation: MEDICAL_APIS.md
```

---

## PROMPT 7: DEPLOYMENT CHECKLIST - 24H AUTODEPLOY

```
Stwórz deployment checklist dla 24-godzinnego autodeployu na Web + iOS + Android:

CHECKLIST:

T-24 HOURS:
☐ All tests passing locally (npm test)
☐ Code review completed
☐ Version bumped in package.json
☐ Changelog updated (CHANGELOG.md)
☐ Environment variables verified (.env.production)
☐ Database migrations ready
☐ Apple certificates updated (valid for 1 year+)
☐ Google Play signing key secure
☐ Marketing assets ready (app store screenshots)

T-0 (Deployment Start):
☐ Create git tag: git tag -a v1.x.x -m "Release 1.x.x"
☐ Push to main branch
☐ Verify GitHub Actions triggered

T+30 MIN (EAS Builds):
☐ iOS build completed and signed
☐ Android build completed and signed
☐ Web build completed
☐ All artifacts available in EAS dashboard

T+1 HOUR (App Store Submission):
☐ iOS submitted to App Store Review
☐ Notification sent to team
☐ Review status URL provided

T+1 HOUR (Google Play Submission):
☐ Android auto-published to Google Play
☐ Should appear in store within 30 min
☐ Verify version in Play Store Console

T+2 HOURS (Web Deployment):
☐ Web deployed to Vercel
☐ https://potrzebny.ai loads correctly
☐ All pages functional
☐ Analytics tracking active

T+6-72 HOURS (App Store Review):
☐ Monitor Apple App Store review status
☐ Typical: 24-48 hours
☐ If rejected: Review reason, fix, resubmit
☐ Once approved: goes live automatically

MONITORING (Post-Deployment):
☐ Monitor error logs (Sentry)
☐ Check crash rates
☐ Review user feedback
☐ Monitor API performance
☐ Verify payment processing
☐ Health wearables data sync working

DELIVERABLES:
1. /docs/DEPLOY_CHECKLIST.md
2. /scripts/pre-deploy.sh - Validation script
3. /scripts/deploy-all.sh - One-command deploy
4. /.github/workflows/deploy.yml - Automated CI/CD
5. /docs/DEPLOY_TROUBLESHOOTING.md
6. Slack notification template for team
```

---

## QUICK START - EXECUTE THESE PROMPTS IN ORDER

```bash
# 1. Uruchom AI Model Routing
# Prompt 1 → Create /lib/ai/routing.ts

# 2. Uruchom Terra Integration
# Prompt 2 → Create /lib/health/terra-client.ts

# 3. Uruchom Stripe Setup
# Prompt 3 → Create /api/payments/checkout.ts

# 4. Uruchom EAS Build Config
# Prompt 4 → Update eas.json + GitHub Actions

# 5. Uruchom RODO Compliance
# Prompt 5 → Create /db/migrations/rodo-setup.sql

# 6. Uruchom Medical APIs
# Prompt 6 → Create /lib/medical/pubmed-client.ts

# 7. Finalny Deploy
# Prompt 7 → Use /docs/DEPLOY_CHECKLIST.md

# Total time: 4-6 hours with Claude Code
# Ready for 24h autodeploy!
```

---

## ENVIRONMENT VARIABLES NEEDED

```bash
# AI Models
ANTHROPIC_API_KEY=sk-ant-...
DEEPSEEK_API_KEY=sk-...
PERPLEXITY_API_KEY=pplx-...
GROQ_API_KEY=gsk_...

# Health Wearables
TERRA_API_KEY=...
TERRA_API_SECRET=...
APPLE_HEALTH_ENTITLEMENTS=com.apple.health...
GOOGLE_FIT_CLIENT_ID=...

# Payments
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_CONNECT_CLIENT_ID=ca_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Infrastructure
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...
UPSTASH_REDIS_URL=redis://...
UPSTASH_REDIS_TOKEN=...

# Compliance
SENTRY_DSN=https://...sentry.io/...
POSTHOG_API_KEY=phc_...

# Deployment
VERCEL_TOKEN=...
EAS_BUILD_ID=...
APPLE_ID_PASSWORD=...
GOOGLE_PLAY_SERVICE_ACCOUNT=...

# Email
RESEND_API_KEY=re_...

# SMS
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
```

---

**Status:** Ready for implementation ✅  
**Expected time:** 4-6 hours with Claude Code  
**Deployment time:** 24 hours (automated with EAS + Vercel)  
**Result:** Web + iOS + Android simultaneous launch
