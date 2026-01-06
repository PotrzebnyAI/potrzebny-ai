# 🧠 MEGA BRIEF DLA PERPLEXITY MAX - POTRZEBNY.AI AUTODEPLOY

## 📋 INSTRUKCJA DLA PERPLEXITY MAX (Lab Mode + Premium Sources)

**ZADANIE:** Wygeneruj 15 szczegółowych, perfekcyjnych promptów dla Claude Code 20x do kompletnego autodeploy platformy POTRZEBNY.AI (Web + iOS App Store + Android Google Play) w JEDNEJ sesji.

---

# 🏗️ PEŁNA INFRASTRUKTURA - MASZ TO WSZYSTKO (NIE SZUKAJ NOWYCH API!)

## 📊 STATYSTYKI ZMIENNYCH ŚRODOWISKOWYCH: 17,734 TOTAL

### TOP KATEGORIE:
| Prefix | Ilość | Opis |
|--------|-------|------|
| POTRZEBNY_PANEL_* | 12,151 | Zmienne per panel (1-19) |
| VALIDIC_* | 345 | Health wearables (Oura, Garmin, Fitbit, Apple, Dexcom CGM) |
| GOOGLE_* | 322 | Google Cloud + Scopes ($300 kredytów) |
| PANEL_* | 311 | Konfiguracje paneli |
| AWS_* | 222 | Amazon Web Services ($200 kredytów, 60 dni) |
| COMPOUND_* | 142 | Związki chemiczne/nootropics/toksyny |
| TELEBIM_* | 129 | Panel LED AMUSO |
| STRIPE_* | 93 | Płatności (BLIK, karty, Apple Pay, Google Pay, Klarna) |
| EDU_* | 88 | Edukacja medyczna (anatomia, farmakologia, patologia...) |
| MEDICAL_* | 79 | Medical APIs |
| RAPIDAPI_* | 73 | RapidAPI endpoints |
| APPLE_* | 69 | iOS/App Store |
| COMPLIANCE_* | 60 | RODO, HIPAA, zgodność |
| FDA_* | 51 | US FDA drug labels |
| UPSTASH_* | 50 | Redis Prod Pack ($220/mc) |
| GENE_* | 50 | Farmakogenomika (CYP2D6, MTHFR, COMT...) |
| TWILIO_* | 44 | SMS, Voice, Video |
| PROMPT_* | 36 | System prompts |
| WORKFLOW_* | 69 | Automatyzacja procesów medycznych |

---

## 🔑 KLUCZOWE API - PEŁNA LISTA

### AI/LLM APIs:
```
ANTHROPIC_API_KEY          - Claude Opus 4.5, Sonnet 4.5, Haiku
ANTHROPIC_MODEL_OPUS_4_5   - Dla premium paneli (699/799 PLN)
ANTHROPIC_MODEL_SONNET     - Dla Pro tier (49 PLN)
ANTHROPIC_MODEL_HAIKU      - Dla Basic tier (29 PLN)
OPENAI_API_KEY             - GPT-4o, Vision, Embeddings
OPENAI_MODEL_GPT4O_MINI    - Tani fallback
DEEPSEEK_API_KEY           - DeepSeek V3 ($0.27/MTok) - NAJTAŃSZY
DEEPSEEK_MODEL_CHAT        - Dla fiszek, quizów
DEEPSEEK_MODEL_REASONER    - Deep thinking
GROQ_API_KEY               - Whisper (transkrypcja), Llama 3
GROQ_MODEL_WHISPER         - Transkrypcja wykładów
PERPLEXITY_API_KEY         - Research, citations
COHERE_API_KEY             - Embeddings
ELEVENLABS_API_KEY         - Text-to-Speech PL
ASSEMBLYAI_API_KEY         - Transkrypcja alternatywna
```

### Model Routing (już skonfigurowane!):
```
MODEL_ROUTING_FREE_TIER    = "deepseek-v3"
MODEL_ROUTING_BASIC        = "claude-haiku-4-5"
MODEL_ROUTING_STANDARD     = "claude-sonnet-4-5"
MODEL_ROUTING_PREMIUM      = "claude-opus-4-5"
MODEL_ROUTING_RESEARCH     = "claude-opus-4-5"
MODEL_ROUTING_SUPERMOZG    = "claude-opus-4-5"
MODEL_ROUTING_TRANSCRIPTION = "groq-whisper"
MODEL_ROUTING_VISION       = "gpt-4o"
MODEL_ROUTING_IMAGE_GEN    = "dall-e-3"
```

### VALIDIC Health Wearables (414 zmiennych):
```
VALIDIC_ORGANIZATION_ID    - ID organizacji
VALIDIC_ACCESS_TOKEN       - Token dostępu
VALIDIC_API_URL_FULL       - https://api.v2.validic.com/organizations/695bd16279840e1360aa0a2c

Źródła danych:
VALIDIC_SOURCE_APPLE_HEALTH   - Apple Watch, iPhone
VALIDIC_SOURCE_GOOGLE_FIT     - Android, Wear OS
VALIDIC_SOURCE_OURA           - Oura Ring
VALIDIC_SOURCE_GARMIN         - Garmin zegarki
VALIDIC_SOURCE_FITBIT         - Fitbit
VALIDIC_SOURCE_WHOOP          - Whoop band
VALIDIC_SOURCE_POLAR          - Polar zegarki
VALIDIC_SOURCE_WITHINGS       - Wagi, ciśnieniomierze
VALIDIC_SOURCE_DEXCOM         - CGM glukometry!
VALIDIC_SOURCE_FREESTYLE_LIBRE - CGM Abbott

Metryki:
VALIDIC_METRIC_HEART_RATE, VALIDIC_METRIC_HRV, VALIDIC_METRIC_STEPS,
VALIDIC_METRIC_SLEEP_DURATION, VALIDIC_METRIC_DEEP_SLEEP, VALIDIC_METRIC_REM_SLEEP,
VALIDIC_METRIC_BLOOD_GLUCOSE, VALIDIC_METRIC_SPO2, VALIDIC_METRIC_TEMPERATURE,
VALIDIC_METRIC_BLOOD_PRESSURE_SYSTOLIC, VALIDIC_METRIC_BLOOD_PRESSURE_DIASTOLIC,
VALIDIC_METRIC_CALORIES_BURNED, VALIDIC_METRIC_DISTANCE, VALIDIC_METRIC_ELEVATION_GAIN

TRIAL ALERT: VALIDIC_TRIAL_DAYS_REMAINING = 30 (sandbox, potem Terra API backup)
```

### Google Cloud ($300 kredytów, 322 zmienne):
```
GOOGLE_CLOUD_PROJECT_ID
GOOGLE_CLOUD_API_KEY        - Vision, Speech, Translate
GOOGLE_MAPS_API_KEY         - Geolokalizacja
GOOGLE_RECAPTCHA_SITE_KEY   - Ochrona formularzy
GOOGLE_HEALTHCARE_URL       - FHIR Healthcare API
GOOGLE_VERTEX_AI_MODEL      - Gemini
GOOGLE_FIT_REST_API         - Google Fit data

Scopy (58+):
GOOGLE_SCOPE_CALENDAR, GOOGLE_SCOPE_DRIVE, GOOGLE_SCOPE_GMAIL,
GOOGLE_SCOPE_CLASSROOM, GOOGLE_SCOPE_FIREBASE, GOOGLE_SCOPE_YOUTUBE,
GOOGLE_SCOPE_ANALYTICS, GOOGLE_SCOPE_BIGQUERY, GOOGLE_SCOPE_PUBSUB...

Google Play (deploy):
GOOGLE_PLAY_PACKAGE_NAME    - com.potrzebny.ai
GOOGLE_PLAY_SERVICE_ACCOUNT_JSON
GOOGLE_PLAY_DEV_ID
```

### AWS ($200 kredytów, 222 zmienne):
```
AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
AWS_REGION = eu-central-1 (Frankfurt)

S3 Buckets:
AWS_S3_BUCKET_WEB_PROD, AWS_S3_BUCKET_MEDICAL_DATA,
AWS_S3_BUCKET_MOBILE_ASSETS, AWS_S3_BUCKET_BACKUPS

RDS (PostgreSQL backup):
AWS_RDS_ENDPOINT, AWS_RDS_DB_NAME

Cognito (auth backup):
AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_APP_CLIENT_ID

Bedrock (AI):
AWS_BEDROCK_MODEL_CLAUDE_3_SONNET, AWS_BEDROCK_ENDPOINT

SES (email):
AWS_SES_FROM_EMAIL, AWS_SES_VERIFIED_DOMAIN

CloudFront:
AWS_CLOUDFRONT_DISTRIBUTION_ID_WEB
```

### Medical Research APIs (DARMOWE!):
```
# PubMed (50M+ artykułów)
PUBMED_BASE_URL = https://eutils.ncbi.nlm.nih.gov/entrez/eutils
PUBMED_SEARCH_URL, PUBMED_FETCH_URL

# DrugBank (13k+ leków)
DRUGBANK_BASE_URL, DRUGBANK_DDI_CHECKER, DRUGBANK_INTERACTION_URL

# PharmGKB (farmakogenomika)
PHARMGKB_API_BASE, PHARMGKB_DRUGS_URL, PHARMGKB_GENES_URL

# ClinicalTrials.gov (400k+ badań)
CLINICALTRIALS_V2_URL = https://clinicaltrials.gov/api/v2

# OncoKB (onkologia)
ONCOKB_URL, ONCOKB_ANNOTATION_URL

# OpenFDA
OPENFDA_API_KEY - adverse events, drug labels

# CPIC (Clinical Pharmacogenetics)
CPIC_API_BASE, CPIC_GUIDELINES_URL

# dbSNP (warianty genetyczne)
DBSNP_BASE_URL, DBSNP_REFSNP_URL

# cBioPortal (cancer genomics)
CBIOPORTAL_URL

# FHIR
FHIR_HAPI_URL, FHIR_SMART_URL
```

### FDA Drug Labels (51 zmiennych):
```
FDA_LABEL_ADDERALL, FDA_LABEL_CONCERTA, FDA_LABEL_RITALIN,
FDA_LABEL_LEXAPRO, FDA_LABEL_PROZAC, FDA_LABEL_ZOLOFT,
FDA_LABEL_WELLBUTRIN, FDA_LABEL_ATIVAN, FDA_LABEL_KLONOPIN...
(Wszystkie główne leki psychiatryczne z oficjalnymi ulotkami FDA)
```

### Gene/Pharmacogenomics URLs (50 zmiennych):
```
GENE_CYP2D6_URL, GENE_CYP2C19_URL, GENE_CYP2C9_URL, GENE_CYP3A4_URL,
GENE_MTHFR_URL, GENE_COMT_URL, GENE_BDNF_URL, GENE_APOE_URL,
GENE_HTR2A_URL, GENE_DRD2_URL, GENE_SLC6A4_SERT_URL, GENE_OPRM1_URL,
GENE_MAOA_URL, GENE_VKORC1_URL, GENE_SLCO1B1_URL, GENE_TPMT_URL...
```

### Compounds/Nootropics (142 zmiennych):
```
COMPOUND_ACETYL_L_CARNITINE_URL, COMPOUND_ALPHA_LIPOIC_ACID_URL,
COMPOUND_AGMATINE_URL, COMPOUND_APIGENIN_URL, COMPOUND_BACOSIDES_URL,
COMPOUND_CAFFEINE_ANHYDROUS_URL, COMPOUND_COQ10_URL, COMPOUND_CREATINE_MONOHYDRATE_URL,
COMPOUND_COLLAGEN_PEPTIDES_URL, COMPOUND_DMSA_URL, COMPOUND_D_RIBOSE_URL...

Toksyny/aldehydy (dla Supermózg ULTRA - neurotoxin checker):
COMPOUND_FORMALDEHYDE_URL, COMPOUND_ACROLEIN_URL, COMPOUND_ACETALDEHYDE_URL,
COMPOUND_AFLATOXIN_B1_URL, COMPOUND_FUMONISIN_B1_URL, COMPOUND_GEOSMIN_URL,
COMPOUND_2_METHYLISOBORNEOL_URL (pleśń!)
```

### Stripe Payments (93 zmienne):
```
STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET

Produkty:
STRIPE_PRODUCT_STUDENT, STRIPE_PRODUCT_STUDENT_PRO, STRIPE_PRODUCT_STUDENT_ULTRA,
STRIPE_PRODUCT_SUPERMOZG, STRIPE_PRODUCT_SUPERMOZG_ULTRA,
STRIPE_PRODUCT_RESEARCH_PREMIUM, STRIPE_PRODUCT_TELEBIM_VIDEO...

Ceny:
STRIPE_PRICE_STUDENT_BASIC_MONTHLY (29 PLN)
STRIPE_PRICE_STUDENT_PRO_MONTHLY (49 PLN)
STRIPE_PRICE_STUDENT_ULTRA_MONTHLY (79 PLN)
STRIPE_PRICE_SUPERMOZG_ULTRA_MONTHLY (699 PLN)
STRIPE_PRICE_RESEARCH_PREMIUM_MONTHLY (799 PLN)
STRIPE_PRICE_TELEBIM_GRAFIKA (499 PLN)
STRIPE_PRICE_TELEBIM_VIDEO (1299 PLN)

Metody płatności:
STRIPE_ENABLE_CARD = true
STRIPE_ENABLE_BLIK = true
STRIPE_ENABLE_APPLE_PAY = true
STRIPE_ENABLE_GOOGLE_PAY = true
STRIPE_ENABLE_PRZELEWY24 = true

VAT:
STRIPE_TAX_RATES_PL, STRIPE_TAX_RATES_EU_OSS
(VAT 0% dla edukacji/medycyny - INFAKT_VAT_EXEMPTION = true)
```

### Telebim LED (129 zmiennych):
```
AMUSO_BASE_URL = https://amuso.ecms.pl
AMUSO_LOGIN, AMUSO_PASSWORD

LED_SCREEN_ID = 258
LED_SCREEN_MAC = 68:1d:ef:4c:fc:d5
LED_RESOLUTION_WIDTH = 672
LED_RESOLUTION_HEIGHT = 336

TELEBIM_DEFAULT_PLAYLIST_ID = 1431
TELEBIM_DEFAULT_SCHEDULE_ID = 180

Pakiety:
TELEBIM_PKG_GRAPHIC_PRICE = 499 PLN
TELEBIM_PKG_VIDEO_PRICE = 1299 PLN
TELEBIM_PKG_COMBO_PRICE = 1699 PLN
TELEBIM_PKG_ENTERPRISE_PRICE = 3999 PLN
```

### Supabase (12 zmiennych):
```
NEXT_PUBLIC_SUPABASE_URL = https://klboejvukyywtpiopevn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY (JWT)
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_PROJECT_ID
SUPABASE_DB_HOST, SUPABASE_DB_PORT, SUPABASE_DB_PASSWORD
Region: Frankfurt (EU) - RODO compliant
```

### Upstash Redis Prod Pack (50 zmiennych, $220/mc):
```
REDIS_URL, REDIS_HOST, REDIS_PASSWORD
REDIS_PROD_PACK = true
REDIS_MAX_CONNECTIONS = 10000
REDIS_MAX_COMMANDS = unlimited
REDIS_TIER = enterprise
REDIS_REGION = eu-central-1 (Frankfurt)

UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
QSTASH_URL (kolejki)
```

### Apple/iOS (69 zmiennych):
```
APPLE_BUNDLE_ID
APPLE_APP_STORE_CONNECT_KEY_ID, APPLE_APP_STORE_CONNECT_ISSUER_ID
APPLE_APP_STORE_CONNECT_PRIVATE_KEY
APPLE_APNS_KEY_ID, APPLE_APNS_TEAM_ID (push notifications)
APPLE_IAP_SHARED_SECRET (In-App Purchases)
APPLE_HEALTHKIT_PERMISSIONS_WRITE
```

### Twilio Communications (44 zmienne):
```
TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
TWILIO_VERIFY_SERVICE_SID (2FA SMS)
TWILIO_MESSAGING_SERVICE_SID
TWILIO_VIDEO_API_BASE_URL (telekonsultacje)
```

### InFakt Fakturowanie (13 zmiennych):
```
INFAKT_API_KEY, INFAKT_API_URL
INFAKT_NIP
INFAKT_VAT_EXEMPTION = true (edukacja/medycyna)
INFAKT_VAT_EXEMPTION_REASON = "Art. 43 ust. 1 pkt 26-29"
INFAKT_DEFAULT_TAX_RATE = 0
```

### Therapy/CBT/DBT (35 zmiennych):
```
DBT_HANDOUTS_PDF_URL, DBT_SKILLS_MANUAL_URL
DBT_MINDFULNESS_URL, DBT_EMOTION_REGULATION_URL
DBT_DISTRESS_TOLERANCE_PDF, DBT_INTERPERSONAL_URL
CBTI_COACH_API_URL (insomnia)
MOODTOOLS_API_URL
PSYCHOLOGY_TOOLS_URL
```

### Education Medical (88 zmiennych):
```
EDU_ANATOMY_*, EDU_BIOCHEMISTRY_*, EDU_PHARMACOLOGY_*,
EDU_PHYSIOLOGY_*, EDU_PATHOLOGY_*, EDU_MICROBIOLOGY_*,
EDU_IMMUNOLOGY_*, EDU_GENETICS_*, EDU_PSYCHOLOGY_*,
EDU_CLINICAL_SKILLS_*, EDU_DIAGNOSIS_*, EDU_EPIDEMIOLOGY_*...
Każdy z _ENABLED, _CONTENT_URL, _INSTRUCTOR_API, _STUDENT_API
```

### RapidAPI (73 zmienne):
```
RAPIDAPI_KEY
RAPIDAPI_AI_DOCTOR_*, RAPIDAPI_DIAGNOSIS_*,
RAPIDAPI_SYMPTOMS_CHECKER_*, RAPIDAPI_NUTRITION_*,
RAPIDAPI_EXERCISEDB_*, RAPIDAPI_FITNESS_CALCULATOR_*,
RAPIDAPI_BMI_CALCULATOR_*, RAPIDAPI_MEDICAL_OCR_*...
```

### Workflow Automation (69 zmiennych):
```
WORKFLOW_DIAGNOSIS_*, WORKFLOW_LAB_ORDER_*,
WORKFLOW_IMAGING_ORDER_*, WORKFLOW_BILLING_*,
WORKFLOW_INSURANCE_CLAIM_*, WORKFLOW_FOLLOW_UP_*...
Każdy z _ENABLED, _TIMEOUT_MINUTES, _NOTIFICATION, _AUDIT_TRAIL
```

---

## 🏛️ ARCHITEKTURA 19 PANELI

### GRUPA 1: PANELE ADMINISTRACYJNE (DARMOWE)

| # | Panel | Zmiennych | Opis | Tech Stack |
|---|-------|-----------|------|------------|
| 1 | Nauczyciel | 525 | Mass upload, classroom analytics, quizy | Groq Whisper, OCR |
| 2 | Wykładowca | 528 | Transkrypcja, Semantic Scholar, kursy | Stripe Connect 70/30 |
| 3 | Terapeuta | 625 | AES-256, CBT/DBT, mood tracking | Zero-Knowledge |
| 4 | Lekarz Szkolący | 612 | Case studies, CME, Virtual Patient | DICOM, FHIR |
| 5 | Terapeuta Szkolący | 545 | Superwizja, protokoły | pgaudit |
| 6 | Admin Personalizacyjny | 489 | White-label, B2B | CMS |
| 7 | Rodzic | 412 | Dashboard dziecka, kontrola | 0/49 PLN |
| 8 | Super Admin | 758 | God Mode, MRR, all panels | ai@potrzebny.ai |
| 9 | Comet Assistant | 634 | Perplexity Max agent sandbox | asystent@potrzebny.ai |

### GRUPA 2: PANELE UŻYTKOWNIKÓW (PŁATNE)

| # | Panel | Zmiennych | Ceny | AI Model |
|---|-------|-----------|------|----------|
| 10 | Uczeń | 567 | 29/49/79 PLN | DeepSeek → Haiku → Sonnet |
| 11 | Pacjent | 543 | 29/49/79 PLN | Sonnet + Security |
| 12 | Med Trainee | 598 | 29/49/79 PLN | Sonnet + Virtual Patient |
| 13 | Szkoleniowy | 687 | 29/49/79 PLN + B2B | Adaptive Learning |
| 14 | Rodzic Premium | 521 | 49 PLN | Dashboard |

### GRUPA 3: PREMIUM

| # | Panel | Zmiennych | Cena | AI Model | Specjalne |
|---|-------|-----------|------|----------|-----------|
| 15 | Supermózg | 789 | 79 PLN bonus | Sonnet | Cognitive training |
| 16 | Supermózg ULTRA | 1256 | 699 PLN | **Opus 4.5** | Nootropics, wearables, farmakogenomika |
| 17 | Research Premium | 945 | 799 PLN | **Opus 4.5** | PubMed 50M, PWZ verification |

### GRUPA 4: SPECJALNE

| # | Panel | Zmiennych | Cena | Tech |
|---|-------|-----------|------|------|
| 18 | Ćwiczenia Terapeutyczne | 634 | 29 PLN | 5000+ ćwiczeń CBT/DBT |
| 19 | Telebim LED | 456 | 499-3999 PLN | AMUSO, Playwright, tylko WEB |

---

## 💰 PRICING & MARŻA

### Struktura cenowa:
```
BASIC:     29 PLN/mc - DeepSeek V3 + Haiku
PRO:       49 PLN/mc - Sonnet 4.5 (NAJPOPULARNIEJSZY)
ULTRA:     79 PLN/mc - Sonnet 4.5 + Supermózg
SUPERMÓZG ULTRA: 699 PLN/mc - Opus 4.5 unlimited
RESEARCH:  799 PLN/mc - Opus 4.5 Extended Thinking

TELEBIM:
- Grafika: 499 PLN/mc
- Video: 1299 PLN/mc
- Combo: 1699 PLN/mc
- Enterprise: 3999 PLN/mc
```

### Target marża: 80-85%+
```
AI Costs (1000 users):
- DeepSeek V3: ~200 PLN/mc
- Haiku: ~150 PLN/mc
- Sonnet: ~1,800 PLN/mc
- Opus: ~1,500 PLN/mc
TOTAL AI: ~3,650 PLN/mc

Infrastructure:
- Vercel: ~80 PLN
- Supabase: ~100 PLN
- Upstash: ~888 PLN
- Google Cloud: ~400 PLN
TOTAL INFRA: ~1,468 PLN/mc

Revenue (1000 users @ avg 49 PLN): 49,000 PLN/mc
Margin: (49,000 - 5,118) / 49,000 = 89.5% ✅
```

---

## 🔐 SECURITY & COMPLIANCE

```
RODO Art. 9:
- Supabase Frankfurt (EU)
- AES-256-GCM encryption
- RLS (Row Level Security)
- pgaudit logging
- 20 lat retencja danych medycznych
- PITR backups

2FA obowiązkowe dla:
- Panel Pacjenta
- Panel Terapeuty
- Twilio Verify SMS

Zero-Knowledge:
- Notatki terapeuty
- Dane pacjenta
- Tylko właściciel ma klucz
```

---

## 🚀 TECHSTACK DOCELOWY

```
Frontend:
- Next.js 15 + React 19
- TailwindCSS + shadcn/ui
- Framer Motion (animacje WOW)

Backend:
- tRPC + Node.js 20
- Prisma ORM
- BullMQ + Upstash Redis

Database:
- PostgreSQL 15 (Supabase)
- pgvector (embeddings)

Auth:
- NextAuth v5
- Google, Apple, Email
- Supabase Auth backup

Mobile:
- React Native / Expo
- EAS Build + Submit
- Shared auth z web

Payments:
- Stripe Poland
- BLIK, karty, Apple Pay, Google Pay, Klarna
- InFakt (faktury)

AI:
- Claude Opus 4.5 (premium)
- Claude Sonnet 4.5 (pro)
- Claude Haiku / DeepSeek V3 (basic)
- Groq Whisper (transkrypcja)
- OpenAI Vision (OCR)

Deployment:
- Vercel (web)
- EAS (iOS + Android)
- Railway (workers)
```

---

## 🎨 UI/UX REQUIREMENTS

### Wrażenie WOW:
```
- Motyw przewodni: MÓZG (charyzmatyczny, ultra-innowacyjny)
- Gradient: Deep purple → Electric blue → Neon pink
- Animacje: Płynne, 60fps, neuronowe połączenia
- Dark mode domyślny
- Glass morphism + neumorphism
- Logo: Stylizowany mózg z AI glow
```

### Flow użytkownika:
```
1. Landing → WOW (3 sekundy na zachwycenie)
2. CTA: "Rozpocznij za darmo" (duży, pulsujący)
3. Rejestracja: Email/Google/Apple (MIN kroków!)
4. Wybór roli: ADMINISTRACYJNY / SZKOLENIOWY / TELEBIM
5. Multi-select paneli (BEZ cen na tym etapie!)
6. 3 dni FREE trial (bez eksponowania czasu)
7. Dopiero po 3 dniach: wybór planu
8. Płatność Stripe
9. Dashboard z wybranymi panelami
```

### Personalizacja (KLUCZOWE!):
```
Każdy panel (oprócz Supermózg/Research/Telebim) oferuje:
- Styl: Formalny / Przyjazny / Akademicki / Kreatywny
- Ton: Motywujący / Neutralny / Surowy
- Format: Bullet points / Paragraf / Q&A
- Dla ADHD: Krótkie, checkpoint co 3 min
- Dla Dysleksji: Uproszczona składnia, audio
- Dla ASD: Bez metafor, logiczne ciągi
- OpenDyslexic font option
- Bionic Reading option
```

---

## 📱 MOBILE SPECIFICS

### iOS (App Store):
```
APPLE_BUNDLE_ID = com.potrzebny.ai
APPLE_APPSTORE_CATEGORY_PRIMARY = Education
APPLE_APPSTORE_CATEGORY_SECONDARY = Medical
In-App Purchases: Basic/Pro/Ultra subscriptions
HealthKit: Read heart rate, sleep, steps
Push: APNS
```

### Android (Google Play):
```
GOOGLE_PLAY_PACKAGE_NAME = com.potrzebny.ai
Category: Education
Google Fit integration
FCM push notifications
```

### Shared:
```
- Jeden backend (Supabase + tRPC)
- Shared auth (token)
- Offline mode dla ćwiczeń
- Deep linking
- TELEBIM: brak płatności w app (external only)
```

---

## 📝 ZADANIE DLA PERPLEXITY MAX

Wygeneruj **15 SZCZEGÓŁOWYCH PROMPTÓW** dla Claude Code, każdy jako kompletny blok gotowy do copy-paste.

### Format każdego prompta:
```markdown
## PROMPT [N]: [NAZWA]

### CEL:
[Co dokładnie ma zostać zrobione]

### PLIKI DO UTWORZENIA:
[Lista ścieżek z opisem]

### KOD DO WYGENEROWANIA:
[Szczegółowy opis + fragmenty kodu]

### ZMIENNE ŚRODOWISKOWE DO UŻYCIA:
[Lista konkretnych zmiennych z powyższej dokumentacji]

### WALIDACJA:
[Jak sprawdzić że działa]

### ZALEŻNOŚCI:
[Od których promptów zależy]
```

### LISTA 15 PROMPTÓW:

1. **PROMPT 1: Project Setup** - package.json, tsconfig, .env, struktura katalogów
2. **PROMPT 2: Database Schema** - Prisma schema dla 19 paneli, users, subscriptions
3. **PROMPT 3: Auth System** - NextAuth + Supabase, Google/Apple/Email, 2FA Twilio
4. **PROMPT 4: AI Router** - Model routing, token budgets, cost control, fallbacks
5. **PROMPT 5: Stripe Integration** - Produkty, ceny, webhooks, VAT 0%, Stripe Connect
6. **PROMPT 6: Admin Panels (1-9)** - Komponenty, logika, dashboardy
7. **PROMPT 7: User Panels (10-14)** - Komponenty, personalizacja, gamifikacja
8. **PROMPT 8: Premium Panels (15-17)** - Opus 4.5, wearables, medical research
9. **PROMPT 9: Telebim Panel (19)** - AMUSO, Playwright, BullMQ, tylko web
10. **PROMPT 10: Exercises Panel (18)** - Baza 5000 ćwiczeń, przypisywanie
11. **PROMPT 11: UI/UX & Landing** - WOW efekt, motyw mózgu, animacje
12. **PROMPT 12: Mobile App** - React Native/Expo, iOS + Android, shared auth
13. **PROMPT 13: VALIDIC Integration** - Health wearables, CGM, metryki
14. **PROMPT 14: Testing & Monitoring** - Jest, Playwright, Sentry, error handling
15. **PROMPT 15: Deployment & CI/CD** - Vercel, EAS, GitHub Actions, auto-debugging

---

## ⚠️ KRYTYCZNE ZASADY:

1. **NIE SZUKAJ NOWYCH API** - wszystko jest już w zmiennych środowiskowych
2. **WYKORZYSTUJ Google Cloud $300** - dla płatnych paneli
3. **WYKORZYSTUJ AWS $200** - backup, S3, SES
4. **VALIDIC sandbox** - 30 dni, potem Terra API fallback ($0.50/user)
5. **Marża 80%+** - optymalizuj AI routing
6. **TELEBIM tylko WEB** - App Store/Google Play blokuje external payments
7. **2FA obowiązkowe** - Panel Pacjenta + Terapeuty
8. **RODO Art. 9** - pgaudit, RLS, AES-256, Frankfurt EU
9. **Personalizacja** - ADHD/Dysleksja/ASD modes w każdym panelu szkoleniowym
10. **WOW EFEKT** - Zakochanie od pierwszego wejrzenia!

---

## 🎯 CEL KOŃCOWY:

Po wklejeniu 15 promptów do Claude Code 20x:
- ✅ Pełny autodeploy Web na Vercel
- ✅ iOS app submitted do App Store
- ✅ Android app submitted do Google Play
- ✅ Wszystkie 19 paneli działających
- ✅ Stripe płatności aktywne
- ✅ VALIDIC/wearables zintegrowane
- ✅ AI routing zoptymalizowany
- ✅ 0 błędów, production-ready
- ✅ Auto-debugging przez 2 miesiące bez interwencji

**POTRZEBNY.AI - Najlepsza platforma MedTech/EdTech w Polsce. Od której ludzie się uzależniają i zakochują od pierwszego wejrzenia.**

---

*Wygenerowane: 6 stycznia 2026*
*Dla: Perplexity Max (Lab Mode + Premium Sources + GitHub MCP)*
*Docelowo: Claude Code 20x Default Full Access*
