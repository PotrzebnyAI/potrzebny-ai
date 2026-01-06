# MEGA BRIEF DLA PERPLEXITY MAX - POTRZEBNY.AI AUTODEPLOY
# KOMPLETNA WERSJA Z 17,734 ZMIENNYMI SRODOWISKOWYMI

## INSTRUKCJA DLA PERPLEXITY MAX (Lab Mode + Premium Sources)

**ZADANIE:** Wygeneruj 15 szczegolowych, perfekcyjnych promptow dla Claude Code 20x do kompletnego autodeploy platformy POTRZEBNY.AI (Web + iOS App Store + Android Google Play) w JEDNEJ sesji.

---

# STATYSTYKI: 17,734 ZMIENNYCH SRODOWISKOWYCH

## ROZKLAD KATEGORII:

| Kategoria | Ilosc | Opis |
|-----------|-------|------|
| POTRZEBNY_PANEL_* | 12,124 | Zmienne per panel (1-19) |
| VALIDIC_* | 345 | Health wearables (Oura, Garmin, Fitbit, Dexcom CGM) |
| GOOGLE_* | 322 | Google Cloud + Scopes ($300 kredytow) |
| AWS_* | 222 | Amazon Web Services ($200 kredytow) |
| COMPOUND_* | 142 | Zwiazki chemiczne/nootropics |
| TELEBIM_* | 129 | Panel LED AMUSO |
| STRIPE_* | 93 | Platnosci |
| GENE_* | 50 | Farmakogenomika |
| UPSTASH_* | 50 | Redis Prod Pack ($220/mc) |

---

# UPSTASH PROD PACK - PELNA KONFIGURACJA ($220/mc)

## KRYTYCZNE: UZYJ UPSTASH MONITORING ZAMIAST SENTRY (oszczednosc 360 PLN/mc)

```
UPSTASH_API_KEY=${UPSTASH_API_KEY}
UPSTASH_API_BASE_URL=https://api.upstash.com
UPSTASH_API_EMAIL=potrzebny@potrzebny.ai
UPSTASH_EMAIL=potrzebny@potrzebny.ai
UPSTASH_TEAM_ID=af2045bc-a447-4c5f-8250-bd153a5bf256
UPSTASH_TEAM_NAME="POTRZEBNY AI"
UPSTASH_STATUS=FULLY_CONFIGURED
UPSTASH_READY_FOR_CLAUDE_CODE=true
UPSTASH_AUTOMATION_READY=true

# Redis REST
UPSTASH_REDIS_REST_URL=https://clever-trout-12918.upstash.io
UPSTASH_REDIS_REST_TOKEN=${UPSTASH_REDIS_REST_TOKEN}
UPSTASH_REDIS_SSL=true
UPSTASH_REDIS_KEEP_ALIVE=true
UPSTASH_REDIS_RETRY_DELAY=100

# Kafka
UPSTASH_KAFKA_REST_URL=https://potrzebny-kafka.upstash.io
UPSTASH_KAFKA_REST_USERNAME=kafka_username_123456789
UPSTASH_KAFKA_REST_PASSWORD=${UPSTASH_KAFKA_REST_PASSWORD}

# API Endpoints
UPSTASH_API_CREATE_DATABASE=https://api.upstash.com/v2/redis/database
UPSTASH_API_LIST_DATABASES=https://api.upstash.com/v2/redis/databases
UPSTASH_API_STATS="${UPSTASH_API_BASE_URL}/v2/redis/stats/{database_id}"
UPSTASH_API_SLOW_QUERIES="${UPSTASH_API_BASE_URL}/v2/redis/slowlog/{database_id}"

# Console URLs
UPSTASH_CONSOLE_URL=https://console.upstash.com
UPSTASH_CONSOLE_API="${UPSTASH_CONSOLE_URL}/account/api?teamid=${UPSTASH_TEAM_ID}"
UPSTASH_CONSOLE_BILLING="${UPSTASH_CONSOLE_URL}/account/billing?teamid=${UPSTASH_TEAM_ID}"
UPSTASH_CONSOLE_REDIS="${UPSTASH_CONSOLE_URL}/redis?teamid=${UPSTASH_TEAM_ID}"

# Enterprise Features
UPSTASH_HIPAA_AVAILABLE="true"
UPSTASH_PRO_SUPPORT_AVAILABLE="true"
UPSTASH_SAML_SSO_AVAILABLE="true"
UPSTASH_VPC_PEERING_AVAILABLE="true"
UPSTASH_API_ACCESS_LEVEL=MAXIMUM
```

## MONITORING - OpenTelemetry + Upstash Prometheus (NIE SENTRY!)

```
PROMETHEUS_ENABLED=true
PROMETHEUS_METRICS_PATH=/metrics
PROMETHEUS_PORT=9090
OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=delta

# Upstash ma wbudowany monitoring:
# - Redis Stats API: /v2/redis/stats/{database_id}
# - Slow Queries: /v2/redis/slowlog/{database_id}
# - Console Dashboard: https://console.upstash.com
# - Prometheus endpoint: wbudowany

# NIE UZYWAJ SENTRY - oszczednosc 360 PLN/mc
# Zamiast tego:
# 1. Upstash Redis Stats API
# 2. Upstash Prometheus metrics
# 3. Vercel Analytics (darmowe)
# 4. Custom error logging do Upstash Redis
```

---

# VALIDIC - HEALTH WEARABLES (345 zmiennych) - PERELKI!

```
VALIDIC_ORGANIZATION_ID=695bd16279840e1360aa0a2c
VALIDIC_ACCESS_TOKEN=${VALIDIC_ACCESS_TOKEN}
VALIDIC_API_BASE_URL=https://api.validic.com
VALIDIC_API_VERSION=v2
VALIDIC_API_URL_FULL=https://api.v2.validic.com/organizations/695bd16279840e1360aa0a2c
VALIDIC_ACCOUNT_EMAIL=ai@potrzebny.ai
VALIDIC_ACCOUNT_PASSWORD=${VALIDIC_ACCOUNT_PASSWORD}

# Supported Brands
VALIDIC_BRANDS="Fitbit,Apple_Health,Google_Fit,Garmin,Withings,Omron,iHealth,Dexcom,Freestyle_Libre"

# Android Config
VALIDIC_ANDROID_PACKAGE=ai.potrzebny.app
VALIDIC_ANDROID_MIN_SDK=21
VALIDIC_ANDROID_GOOGLE_FIT_ENABLED=true
VALIDIC_ANDROID_HEALTH_CONNECT_ENABLED=true
VALIDIC_ANDROID_PERMISSIONS=activity_recognition,body_sensors

# API Endpoints
VALIDIC_API_HEALTH=https://api.v2.validic.com/health
VALIDIC_BIOMETRICS_ENDPOINT=/organizations/
VALIDIC_CGM_ENDPOINT=/organizations/
VALIDIC_CGM_FIELDS=blood_glucose,timestamp

# Dashboard
VALIDIC_DASHBOARD_ENABLED=true
VALIDIC_DASHBOARD_REFRESH_INTERVAL=30000
VALIDIC_DASHBOARD_DATE_RANGE_DEFAULT=30
VALIDIC_DASHBOARD_CHART_TYPES=line,bar,area,pie,scatter
VALIDIC_DASHBOARD_TIMEZONE_AWARE=true

# Cache (Upstash Redis)
VALIDIC_CACHE_ENABLED=true
VALIDIC_CACHE_PROVIDER=redis
VALIDIC_CACHE_PREFIX=validic:
VALIDIC_CACHE_TTL_SECONDS=300
VALIDIC_CACHE_USER_DATA_TTL=600
VALIDIC_CACHE_MARKETPLACE_TTL=86400

# Backup (AWS S3)
VALIDIC_BACKUP_ENABLED=true
VALIDIC_BACKUP_S3_BUCKET=potrzebny-ai-validic-backups
VALIDIC_BACKUP_INTERVAL_HOURS=24
VALIDIC_BACKUP_RETENTION_DAYS=90
VALIDIC_BACKUP_COMPRESSION=gzip

# Compliance
VALIDIC_CONSENT_REQUIRED=true
VALIDIC_BAA_AVAILABLE=true
VALIDIC_ALLOWED_ORIGINS=https://potrzebny.ai,https://app.potrzebny.ai

# Credentials
VALIDIC_CREDENTIALS_DOCSEND=https://docsend.com/view/7gcy43skma2yrnbf
VALIDIC_CONTACT_PERSON=Steven

# Mobile SDKs
VALIDIC_CORDOVA_PLUGIN=cordova-plugin-validic
VALIDIC_CORDOVA_VERSION=^2.0.0
```

---

# AI/LLM APIs - MODEL ROUTING

```
# Anthropic (GLOWNE)
ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
ANTHROPIC_API_KEY_ALT=${ANTHROPIC_API_KEY_ALT}
ANTHROPIC_BASE_URL=https://api.anthropic.com
ANTHROPIC_VERSION=2023-06-01
ANTHROPIC_MAX_TOKENS=4096
ANTHROPIC_RATE_LIMIT_PER_MINUTE=4000
ANTHROPIC_MODEL_HAIKU=claude-3-haiku-20240307
ANTHROPIC_MODEL_SONNET=claude-3-5-sonnet-20240620
ANTHROPIC_MODEL_OPUS=claude-3-opus-20240229
ANTHROPIC_MODEL_OPUS_4_5=claude-3-opus-20240229

# Perplexity
PERPLEXITY_API_KEY=${PERPLEXITY_API_KEY}
PERPLEXITY_API_URL=https://api.perplexity.ai/chat/completions
PERPLEXITY_MODEL=sonar-pro
PERPLEXITY_MODEL_SONAR=sonar
PERPLEXITY_MODEL_SONAR_PRO=sonar-pro
PERPLEXITY_MODEL_ONLINE=sonar-online
PERPLEXITY_MAX_TOKENS=2000
PERPLEXITY_TEMPERATURE=0.5
PERPLEXITY_MONTHLY_QUOTA=100000
PERPLEXITY_COST_SONAR=0.005
PERPLEXITY_COST_SONAR_PRO=0.015

# AI Settings
AI_DEFAULT_LANGUAGE=pl
AI_MAX_TOKENS_DEFAULT=2048
AI_MAX_TOKENS_OUTPUT_FREE=1000
AI_MAX_TOKENS_OUTPUT_PAID=4000
AI_MAX_TOKENS_OUTPUT_PREMIUM=100000
AI_MAX_TOKENS_RESEARCH=100000
AI_TEMPERATURE_CREATIVE=0.7
AI_TEMPERATURE_PRECISE=0.2
AI_HALLUCINATION_CHECK=true
AI_SAFETY_CHECK_ENABLED=true
AI_GUARDRAIL_SCORE_THRESHOLD=0.85
AI_REQUEST_TIMEOUT_MS=60000
AI_MEDICAL_DISCLAIMER_APPEND=true

# Disclaimers
AI_DISCLAIMER_MEDICAL="Tresci generowane przez AI maja charakter informacyjny i nie zastepuja porady lekarskiej."
AI_DISCLAIMER_THERAPEUTIC="Aplikacja wspiera proces terapeutyczny, ale nie zastepuje profesjonalnej terapii."
AI_DISCLAIMER_BIOHACKING="Informacje edukacyjne. Przed suplementacja skonsultuj sie z lekarzem."

# Model Routing (GOTOWE!)
MODEL_ROUTING_FREE_TIER=gpt-4o-mini
MODEL_ROUTING_FREE_FAST=groq-mixtral
MODEL_ROUTING_FREE_FALLBACK=deepseek-chat
MODEL_ROUTING_BASIC=deepseek-chat
MODEL_ROUTING_STANDARD=gpt-4o-mini
MODEL_ROUTING_PREMIUM=claude-3-5-sonnet-20240620
MODEL_ROUTING_ULTRA=claude-3-opus-20240229
MODEL_ROUTING_RESEARCH=claude-3-opus-20240229
MODEL_ROUTING_SUPERMOZG=claude-3-5-sonnet-20240620
MODEL_ROUTING_DIAGNOSIS=claude-3-opus-20240229
MODEL_ROUTING_ANALYSIS=claude-3-opus-20240229
MODEL_ROUTING_BIOHACKER=claude-3-5-sonnet-20240620
MODEL_ROUTING_STUDENT=claude-3-haiku-20240307
MODEL_ROUTING_PATIENT=claude-3-haiku-20240307
MODEL_ROUTING_TUTOR=gpt-4o
MODEL_ROUTING_PHARMA=gpt-4-turbo
MODEL_ROUTING_CODING=deepseek-coder
MODEL_ROUTING_VISION=gpt-4o
MODEL_ROUTING_IMAGE_GEN=dall-e-3
MODEL_ROUTING_TRANSCRIPTION=whisper-large-v3
MODEL_ROUTING_TRANSLATION=deepl-pro
```

---

# STRIPE PAYMENTS (93 zmienne) - PELNA KONFIGURACJA

```
STRIPE_ACCOUNT_ID=acct_1SZcxeBkWWnoWjtR
STRIPE_API_KEY=${STRIPE_SECRET_KEY}
STRIPE_MCP_RESTRICTED_KEY=${STRIPE_RESTRICTED_KEY}
STRIPE_PAYMENT_CONFIG_ID=pmc_1SZcyABkWWnoWjtRoCNiHq4n
STRIPE_API_VERSION=2024-10-28.acacia
STRIPE_ENV=live
STRIPE_CURRENCY=PLN
STRIPE_CURRENCY_DEFAULT=pln
STRIPE_AUTO_TAX=true
STRIPE_BILLING_INTERVAL=monthly

# Payment Methods
STRIPE_PAYMENT_METHODS=card,blik,apple_pay,google_pay,p24,link
STRIPE_ENABLE_CARD=true
STRIPE_ENABLE_BLIK=true
STRIPE_ENABLE_APPLE_PAY=true
STRIPE_ENABLE_GOOGLE_PAY=true
STRIPE_ENABLE_LINK=true

# Products
STRIPE_PRODUCT_STUDENT=prod_potrzebny_basic
STRIPE_PRODUCT_DOCTOR_STANDARD=prod_doctor_std_01
STRIPE_PRODUCT_DOCTOR_PREMIUM=prod_doctor_prem_01
STRIPE_PRODUCT_PATIENT_STANDARD=prod_patient_std_01
STRIPE_PRODUCT_PATIENT_PREMIUM=prod_patient_prem_01

# Prices - Student
STRIPE_PRICE_STUDENT_BASIC_MONTHLY=price_student_basic_29pln
STRIPE_PRICE_STUDENT_PRO_MONTHLY=price_student_pro_49pln
STRIPE_PRICE_STUDENT_ULTRA_MONTHLY=price_student_ultra_79pln
STRIPE_PRICE_STUDENT_BASIC_YEARLY=price_student_basic_290pln
STRIPE_PRICE_STUDENT_PRO_YEARLY=price_student_pro_490pln

# Prices - Supermozg
STRIPE_PRICE_SUPERMOZG_MONTHLY=price_1SgGXPBkWWnoWjtRcrsCztRg
STRIPE_PRICE_SUPERMOZG_BASIC_MONTHLY=price_supermozg_basic_79pln
STRIPE_PRICE_SUPERMOZG_PRO_MONTHLY=price_supermozg_pro_699pln
STRIPE_PRICE_SUPERMOZG_ULTRA_MONTHLY=price_supermozg_ultra_299pln
STRIPE_PRICE_SUPERMOZG_ELITE_MONTHLY=price_supermozg_elite_999pln

# Prices - Research
STRIPE_PRICE_RESEARCH_MONTHLY=price_Research_799_PLN
STRIPE_PRICE_RESEARCH_PREMIUM_MONTHLY=price_Research_799_PLN

# Prices - Telebim
STRIPE_PRICE_TELEBIM_GRAFIKA=price_Telebim_499_PLN
STRIPE_PRICE_TELEBIM_VIDEO=price_Telebim_1299_PLN

# Prices - Medical
STRIPE_PRICE_DOCTOR_STANDARD_MONTHLY=price_doctor_std_79pln
STRIPE_PRICE_DOCTOR_PREMIUM_MONTHLY=price_doctor_prem_799pln
STRIPE_PRICE_PATIENT_STANDARD_MONTHLY=price_patient_std_49pln
STRIPE_PRICE_PATIENT_PREMIUM_MONTHLY=price_patient_prem_79pln

# Content Tiers
STRIPE_PRICE_CONTENT_TIER1_MONTHLY=price_content_tier1_29pln
STRIPE_PRICE_CONTENT_TIER2_MONTHLY=price_content_tier2_49pln
STRIPE_PRICE_CONTENT_TIER3_MONTHLY=price_content_tier3_79pln
```

---

# SUPABASE - DATABASE (Frankfurt EU, RODO)

```
NEXT_PUBLIC_SUPABASE_URL=https://klboejvukyywtpiopevn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_PROJECT_ID=klboejvukyywtpiopevn
SUPABASE_ACCESS_TOKEN=${SUPABASE_ACCESS_TOKEN}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
SUPABASE_MCP_TOKEN=${SUPABASE_MCP_TOKEN}
SUPABASE_DB_HOST=db.klboejvukyywtpiopevn.supabase.co
SUPABASE_DB_PORT=5432
SUPABASE_DB_PASSWORD=${SUPABASE_DB_PASSWORD}
SUPABASE_POSTGRES_URL=${DATABASE_URL}

# Dev Environment
SUPABASE_URL_DEV=https://prwwpqbrnxrvrhckiufh.supabase.co
SUPABASE_ANON_KEY_DEV=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY_DEV=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

# MEDICAL RESEARCH APIs (DARMOWE!)

```
# PubMed / NCBI
NCBI_API_KEY=${NCBI_API_KEY}
NCBI_EMAIL=ai@potrzebny.ai
PUBMED_API_KEY=${PUBMED_API_KEY}
PUBMED_API_URL=https://eutils.ncbi.nlm.nih.gov/entrez/eutils
PUBMED_EUTILS_URL=https://eutils.ncbi.nlm.nih.gov/entrez/eutils
PUBMED_BERT_URL=https://huggingface.co/microsoft/BiomedNLP-PubMedBERT

# DrugBank
DRUGBANK_BASE_URL=https://go.drugbank.com/drugs
DRUGBANK_DDI_CHECKER=https://go.drugbank.com/clinical/drug_drug_interaction_checker
DRUGBANK_INTERACTION_URL=https://go.drugbank.com/drug-interaction-checker
DRUGBANK_FOOD_INTERACTIONS_URL=https://go.drugbank.com/food-interactions
DRUGBANK_DOWNLOAD_URL=https://go.drugbank.com/releases/latest

# PharmGKB
PHARMGKB_API_BASE=https://api.pharmgkb.org/v1
PHARMGKB_BASE_URL=https://api.pharmgkb.org/v1
PHARMGKB_DRUGS_URL=https://api.pharmgkb.org/v1/data/drug
PHARMGKB_GENES_URL=https://api.pharmgkb.org/v1/data/gene
PHARMGKB_ANNOTATIONS_URL=https://api.pharmgkb.org/v1/data/clinicalAnnotation
PHARMGKB_GUIDELINE_URL=https://api.pharmgkb.org/v1/data/guideline
PHARMGKB_VARIANT_URL=https://api.pharmgkb.org/v1/data/variant
PHARMGKB_PATHWAY_URL=https://api.pharmgkb.org/v1/data/pathway
PHARMGKB_LABEL_URL=https://api.pharmgkb.org/v1/data/label

# OncoKB
ONCOKB_URL=https://www.oncokb.org/api/v1
ONCOKB_ANNOTATION_URL=https://www.oncokb.org/api/v1/annotate

# Clinical BERT
CLINICAL_BERT_URL=https://huggingface.co/emilyalsentzer/Bio_ClinicalBERT
CLINICAL_CALC_URL=https://clinicalcalc.com/api
```

---

# GENE / PHARMACOGENOMICS (50 zmiennych)

```
GENE_CYP2D6_URL=https://www.ncbi.nlm.nih.gov/gene/1565
GENE_CYP2C19_URL=https://www.ncbi.nlm.nih.gov/gene/1557
GENE_CYP2C9_URL=https://www.ncbi.nlm.nih.gov/gene/1559
GENE_CYP3A4_URL=https://www.ncbi.nlm.nih.gov/gene/1576
GENE_CYP1A2_URL=https://www.ncbi.nlm.nih.gov/gene/1544
GENE_MTHFR_URL=https://www.ncbi.nlm.nih.gov/gene/4524
GENE_COMT_URL=https://www.ncbi.nlm.nih.gov/gene/1312
GENE_BDNF_URL=https://www.ncbi.nlm.nih.gov/gene/627
GENE_APOE_URL=https://www.ncbi.nlm.nih.gov/gene/348
GENE_HTR2A_URL=https://www.ncbi.nlm.nih.gov/gene/3356
GENE_HTR2C_URL=https://www.ncbi.nlm.nih.gov/gene/3358
GENE_DRD2_URL=https://www.ncbi.nlm.nih.gov/gene/1813
GENE_DRD4_URL=https://www.ncbi.nlm.nih.gov/gene/1815
GENE_SLC6A4_SERT_URL=https://www.ncbi.nlm.nih.gov/gene/6532
GENE_SLC6A3_DAT1_URL=https://www.ncbi.nlm.nih.gov/gene/6531
GENE_OPRM1_URL=https://www.ncbi.nlm.nih.gov/gene/4988
GENE_MAOA_URL=https://www.ncbi.nlm.nih.gov/gene/4128
GENE_MAOB_URL=https://www.ncbi.nlm.nih.gov/gene/4129
GENE_VKORC1_URL=https://www.ncbi.nlm.nih.gov/gene/79001
GENE_SLCO1B1_URL=https://www.ncbi.nlm.nih.gov/gene/10599
GENE_TPMT_URL=https://www.ncbi.nlm.nih.gov/gene/7172
GENE_DPYD_URL=https://www.ncbi.nlm.nih.gov/gene/1806
GENE_UGT1A1_URL=https://www.ncbi.nlm.nih.gov/gene/54658
GENE_NUDT15_URL=https://www.ncbi.nlm.nih.gov/gene/55270
GENE_G6PD_URL=https://www.ncbi.nlm.nih.gov/gene/2539
GENE_HLA_A_URL=https://www.ncbi.nlm.nih.gov/gene/3105
GENE_HLA_B_URL=https://www.ncbi.nlm.nih.gov/gene/3106
GENE_ABCB1_MDR1_URL=https://www.ncbi.nlm.nih.gov/gene/5243
GENE_ADRA2A_URL=https://www.ncbi.nlm.nih.gov/gene/150
GENE_CFTR_URL=https://www.ncbi.nlm.nih.gov/gene/1080
GENE_RYR1_URL=https://www.ncbi.nlm.nih.gov/gene/6261
GENE_IFNL3_URL=https://www.ncbi.nlm.nih.gov/gene/282618
GENE_ANK3_URL=https://www.ncbi.nlm.nih.gov/gene/286
GENE_CACNA1C_URL=https://www.ncbi.nlm.nih.gov/gene/775
GENE_VMAT2_URL=https://www.ncbi.nlm.nih.gov/gene/6571
GENE_KISS1_URL=https://www.ncbi.nlm.nih.gov/gene/3814
GENE_KISS1R_GPR54_URL=https://www.ncbi.nlm.nih.gov/gene/84634

# Neurodegenerative genes
GENE_APP_URL=https://www.ncbi.nlm.nih.gov/gene/351
GENE_PSEN1_URL=https://www.ncbi.nlm.nih.gov/gene/5663
GENE_PSEN2_URL=https://www.ncbi.nlm.nih.gov/gene/5664
GENE_MAPT_URL=https://www.ncbi.nlm.nih.gov/gene/4137
GENE_SNCA_URL=https://www.ncbi.nlm.nih.gov/gene/6622
GENE_LRRK2_URL=https://www.ncbi.nlm.nih.gov/gene/120892
GENE_GBA_URL=https://www.ncbi.nlm.nih.gov/gene/2629
GENE_SOD1_URL=https://www.ncbi.nlm.nih.gov/gene/6647
GENE_TARDBP_URL=https://www.ncbi.nlm.nih.gov/gene/23435
GENE_FUS_URL=https://www.ncbi.nlm.nih.gov/gene/2521
GENE_C9ORF72_URL=https://www.ncbi.nlm.nih.gov/gene/203228
```

---

# TELEBIM LED (129 zmiennych)

```
TELEBIM_ENABLED=true
TELEBIM_INFRASTRUCTURE_ENABLED=true
TELEBIM_MARKETPLACE_ENABLED=true
TELEBIM_MARKETPLACE_URL=https://potrzebny.ai/telebim
TELEBIM_ADMIN_DASHBOARD=https://potrzebny.ai/admin/telebim

# AMUSO Integration
TELEBIM_AMUSO_BASE_URL=https://amuso.ecms.pl
TELEBIM_AMUSO_URL=https://amuso.ecms.pl
TELEBIM_AMUSO_LOGIN=Belsk
TELEBIM_AMUSO_PASSWORD=${TELEBIM_AMUSO_PASSWORD}

# LED Screen Config
TELEBIM_LED_SCREEN_ID=258
TELEBIM_LED_MAC=68:1d:ef:4c:fc:d5
TELEBIM_LED_RESOLUTION_W=672
TELEBIM_LED_RESOLUTION_H=336
TELEBIM_PHYSICAL_SIZE=6720x3360
TELEBIM_DEFAULT_RESOLUTION_W=1920
TELEBIM_DEFAULT_RESOLUTION_H=1080
TELEBIM_DEFAULT_PLAYLIST_ID=1431
TELEBIM_DEFAULT_SCHEDULE_ID=180

# Media Config
TELEBIM_DURATION_SEC=10
TELEBIM_LOOP_CYCLE_MIN=10
TELEBIM_DAILY_SLOTS=144
TELEBIM_OPERATING_HOURS=24/7
TELEBIM_ALLOWED_FORMATS_IMG=jpg,png,webp
TELEBIM_ALLOWED_FORMATS_VIDEO=mp4,mov
TELEBIM_MAX_FILE_SIZE_IMG_MB=15
TELEBIM_MAX_FILE_SIZE_VIDEO_MB=250
TELEBIM_MEDIA_RESIZE_WIDTH=672
TELEBIM_MEDIA_RESIZE_HEIGHT=336
TELEBIM_MEDIA_FORMAT_CONVERSION=true

# AI Content Generation
TELEBIM_AI_GENERATOR_ENABLED=true
TELEBIM_AI_MODEL=dall-e-3
TELEBIM_AI_UPSCALE_ENGINE=runway-ml
TELEBIM_CONTENT_MODERATION_AI=true
TELEBIM_MODERATION_CONFIDENCE_THRESHOLD=0.85

# Pricing
TELEBIM_GRAFIKA_PRICE_ID=price_telebim_grafika_499
TELEBIM_PKG_COMBO_PRICE=169900
TELEBIM_PKG_COMBO_PRICE_ID=price_telebim_combo_1699
TELEBIM_ENTERPRISE_PRICE_ID=price_telebim_ent_3999
TELEBIM_COMMISSION_RATE=0.30
TELEBIM_CREATOR_SHARE=0.70
TELEBIM_MIN_PAYOUT_AMOUNT=100
TELEBIM_PAYOUT_INTERVAL=monthly
TELEBIM_PAYMENT_METHODS=card,blik,apple_pay,google_pay,klarna,transfer

# CDN
TELEBIM_CDN_DOMAIN=telebim-cdn.potrzebny.ai
TELEBIM_DEPLOYMENT_WORKER=railway_worker_01
TELEBIM_APPROVAL_QUEUE_WEBHOOK=https://api.potrzebny.ai/webhooks/telebim/approval
TELEBIM_AUTO_APPROVE_TRUSTED=true
```

---

# COMPOUNDS / NOOTROPICS (142 zmienne) - dla Supermozg ULTRA

```
# Nootropics
COMPOUND_ACETYL_L_CARNITINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/acetyl-l-carnitine/JSON
COMPOUND_ALPHA_LIPOIC_ACID_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/alpha-lipoic-acid/JSON
COMPOUND_AGMATINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/agmatine/JSON
COMPOUND_APIGENIN_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/apigenin/JSON
COMPOUND_BACOSIDES_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/bacosides/JSON
COMPOUND_BETA_ALANINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/beta-alanine/JSON
COMPOUND_CAFFEINE_ANHYDROUS_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/caffeine/JSON
COMPOUND_COQ10_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/coenzyme-q10/JSON
COMPOUND_CREATINE_MONOHYDRATE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/creatine/JSON
COMPOUND_D_RIBOSE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/d-ribose/JSON
COMPOUND_GINSENOSIDES_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ginsenosides/JSON
COMPOUND_GLUTATHIONE_REDUCED_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/glutathione/JSON
COMPOUND_HMB_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/hydroxymethylbutyrate/JSON
COMPOUND_KETONE_BHB_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/beta-hydroxybutyrate/JSON

# Pharmaceuticals for ADHD/Focus
COMPOUND_ARMODAFINIL_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/armodafinil/JSON
COMPOUND_ATOMOXETINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/atomoxetine/JSON
COMPOUND_DEXTROAMPHETAMINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dextroamphetamine/JSON
COMPOUND_DEXMETHYLPHENIDATE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dexmethylphenidate/JSON
COMPOUND_LISDEXAMFETAMINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/lisdexamfetamine/JSON
COMPOUND_GUANFACINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/guanfacine/JSON
COMPOUND_CLONIDINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/clonidine/JSON

# Psychedelics (Research)
COMPOUND_KETAMINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ketamine/JSON
COMPOUND_LSD_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/lysergic-acid-diethylamide/JSON
COMPOUND_DMT_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dimethyltryptamine/JSON
COMPOUND_IBOGAINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ibogaine/JSON

# Peptides
COMPOUND_KISSPEPTIN_10_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/kisspeptin-10/JSON
COMPOUND_BREMELANOTIDE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/bremelanotide/JSON
COMPOUND_CABERGOLINE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/cabergoline/JSON

# Detox/Chelation
COMPOUND_DMSA_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dimercaptosuccinic-acid/JSON
COMPOUND_EDTA_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/edta/JSON
COMPOUND_ACTIVATED_CHARCOAL_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/activated-charcoal/JSON
COMPOUND_CHLORELLA_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/chlorella/JSON

# Toxins (Neurotoxin Checker)
COMPOUND_FORMALDEHYDE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/formaldehyde/JSON
COMPOUND_ACROLEIN_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/acrolein/JSON
COMPOUND_ACETALDEHYDE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/acetaldehyde/JSON
COMPOUND_AFLATOXIN_B1_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/aflatoxin-b1/JSON
COMPOUND_FUMONISIN_B1_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/fumonisin-b1/JSON
COMPOUND_GEOSMIN_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/geosmin/JSON
COMPOUND_2_METHYLISOBORNEOL_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/2-methylisoborneol/JSON
COMPOUND_GLIOTOXIN_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/gliotoxin/JSON
COMPOUND_CARBON_MONOXIDE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/carbon-monoxide/JSON
COMPOUND_BENZENE_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/benzene/JSON
COMPOUND_CHLOROFORM_URL=https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/chloroform/JSON
```

---

# ARCHITEKTURA 19 PANELI - SZCZEGOLY

## GRUPA 1: PANELE ADMINISTRACYJNE (DARMOWE)

### Panel 1: Nauczyciel
- Zmiennych: 525
- Funkcje: Mass upload, classroom analytics, quizy, fiszki
- AI: Groq Whisper (transkrypcja), OCR
- Tech: Adaptive learning, spaced repetition

### Panel 2: Wykladowca
- Zmiennych: 528
- Funkcje: Transkrypcja wykladow, Semantic Scholar, kursy
- Monetyzacja: Stripe Connect 70/30
- AI: Whisper + GPT-4o

### Panel 3: Terapeuta
- Zmiennych: 625
- Funkcje: AES-256 notatki, CBT/DBT protokoly, mood tracking
- Security: Zero-Knowledge encryption
- Compliance: RODO Art. 9, pgaudit

### Panel 4: Lekarz Szkolacy
- Zmiennych: 612
- Funkcje: Case studies, CME credits, Virtual Patient
- Tech: DICOM viewer, FHIR integration
- AI: Claude Opus dla diagnozy

### Panel 5: Terapeuta Szkolacy
- Zmiennych: 545
- Funkcje: Superwizja, protokoly terapeutyczne
- Security: pgaudit, audit trail

### Panel 6: Admin Personalizacyjny
- Zmiennych: 489
- Funkcje: White-label, B2B customization
- Tech: CMS, theme builder

### Panel 7: Rodzic
- Zmiennych: 412
- Ceny: 0/49 PLN
- Funkcje: Dashboard dziecka, kontrola rodzicielska

### Panel 8: Super Admin
- Zmiennych: 758
- Email: ai@potrzebny.ai
- Funkcje: God Mode, MRR tracking, all panels access

### Panel 9: Comet Assistant
- Zmiennych: 634
- Email: asystent@potrzebny.ai
- Funkcje: Perplexity Max agent sandbox

## GRUPA 2: PANELE UZYTKOWNIKOW (PLATNE)

### Panel 10: Uczen
- Zmiennych: 567
- Ceny: 29/49/79 PLN
- AI: DeepSeek -> Haiku -> Sonnet (tiered)
- Funkcje: Fiszki, quizy, adaptive learning

### Panel 11: Pacjent
- Zmiennych: 543
- Ceny: 29/49/79 PLN
- AI: Sonnet + Security
- Funkcje: Zarzadzanie lekami, przypomnienia, dziennik zdrowia
- Security: 2FA obowiazkowe

### Panel 12: Med Trainee
- Zmiennych: 598
- Ceny: 29/49/79 PLN
- AI: Sonnet + Virtual Patient
- Funkcje: Symulacje kliniczne, case studies

### Panel 13: Szkoleniowy
- Zmiennych: 687
- Ceny: 29/49/79 PLN + B2B
- AI: Adaptive Learning engine

### Panel 14: Rodzic Premium
- Zmiennych: 521
- Cena: 49 PLN
- Funkcje: Extended dashboard, reports

## GRUPA 3: PREMIUM

### Panel 15: Supermozg
- Zmiennych: 789
- Cena: 79 PLN bonus
- AI: Claude Sonnet
- Funkcje: Cognitive training, memory exercises

### Panel 16: Supermozg ULTRA
- Zmiennych: 1,256
- Cena: 699 PLN/mc
- AI: **Claude Opus 4.5 UNLIMITED**
- Funkcje: Nootropics database, wearables (VALIDIC), farmakogenomika
- Integracje: 50 genow, 142 compounds, CGM (Dexcom)

### Panel 17: Research Premium
- Zmiennych: 945
- Cena: 799 PLN/mc
- AI: **Claude Opus 4.5 Extended Thinking**
- Funkcje: PubMed 50M artikulow, PWZ verification
- Target: Lekarze, naukowcy

## GRUPA 4: SPECJALNE

### Panel 18: Cwiczenia Terapeutyczne
- Zmiennych: 634
- Cena: 29 PLN
- Funkcje: 5000+ cwiczen CBT/DBT/ACT
- Przypisywanie przez terapeutow

### Panel 19: Telebim LED
- Zmiennych: 456
- Ceny: 499-3999 PLN
- Tech: AMUSO API, Playwright, BullMQ
- UWAGA: TYLKO WEB (App Store/Google Play blokuje external payments)

---

# PRICING & MARZA TARGET: 80-85%+

```
AI Costs (per 1000 users/mc):
- DeepSeek V3: ~200 PLN ($0.27/MTok)
- Claude Haiku: ~150 PLN
- Claude Sonnet: ~1,800 PLN
- Claude Opus: ~1,500 PLN
TOTAL AI: ~3,650 PLN/mc

Infrastructure:
- Vercel Pro: ~80 PLN
- Supabase Pro: ~100 PLN
- Upstash Prod Pack: ~888 PLN ($220)
- Google Cloud: ~400 PLN (from $300 credits)
TOTAL INFRA: ~1,468 PLN/mc

Revenue (1000 users @ avg 49 PLN): 49,000 PLN/mc
GROSS MARGIN: (49,000 - 5,118) / 49,000 = 89.5%
```

---

# TECHSTACK

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
- PostgreSQL 15 (Supabase Frankfurt)
- pgvector (embeddings)
- RLS (Row Level Security)

Auth:
- NextAuth v5
- Google, Apple, Email
- 2FA: Twilio Verify

Mobile:
- React Native / Expo
- EAS Build + Submit
- Shared auth z web

Payments:
- Stripe Poland
- BLIK, karty, Apple Pay, Google Pay
- InFakt (faktury VAT 0%)

Monitoring (NIE SENTRY!):
- Upstash Redis Stats API
- Upstash Prometheus
- Vercel Analytics
- Custom error logging
```

---

# 15 PROMPTOW DLA CLAUDE CODE

## PROMPT 1: Project Setup
Setup Next.js 15 + React 19, tsconfig, package.json, env validation z t3-oss/env-nextjs

## PROMPT 2: Database Schema
Prisma schema dla 19 paneli, users, subscriptions, audit logs, RLS policies

## PROMPT 3: Auth System
NextAuth v5 + Supabase Auth, Google/Apple/Email, 2FA Twilio Verify

## PROMPT 4: AI Router
Model routing service, token budgets, cost control, fallbacks, rate limiting

## PROMPT 5: Stripe Integration
Produkty, ceny, webhooks, VAT 0% (Art. 43), Stripe Connect 70/30

## PROMPT 6: Admin Panels (1-9)
Komponenty React, dashboardy, analytics, permissions

## PROMPT 7: User Panels (10-14)
Interfejsy uzytkownika, personalizacja, gamifikacja, adaptive learning

## PROMPT 8: Premium Panels (15-17)
Opus 4.5 integration, VALIDIC wearables, medical research, farmakogenomika

## PROMPT 9: Telebim Panel (19)
AMUSO API, Playwright automation, BullMQ jobs, media processing (TYLKO WEB!)

## PROMPT 10: Exercises Panel (18)
Baza 5000 cwiczen CBT/DBT/ACT, przypisywanie, tracking

## PROMPT 11: UI/UX & Landing
WOW efekt, motyw mozgu, gradient purple/blue/pink, glass morphism, dark mode

## PROMPT 12: Mobile App
React Native/Expo, iOS + Android, shared auth, HealthKit/Google Fit

## PROMPT 13: VALIDIC Integration
Health wearables SDK, CGM data, biometrics sync, dashboard widgets

## PROMPT 14: Monitoring (Upstash)
NIE SENTRY! Upstash Stats API, Prometheus metrics, error logging, Vercel Analytics

## PROMPT 15: Deployment & CI/CD
Vercel deploy, EAS Build/Submit iOS+Android, GitHub Actions, auto-debugging

---

# KRYTYCZNE ZASADY

1. **NIE SZUKAJ NOWYCH API** - wszystko jest w 17,734 zmiennych
2. **NIE UZYWAJ SENTRY** - uzyj Upstash monitoring (oszczednosc 360 PLN/mc)
3. **GOOGLE CLOUD $300** - wykorzystaj na platne panele
4. **AWS $200** - backup, S3, SES
5. **VALIDIC** - 30 dni trial, potem Terra API fallback
6. **TELEBIM TYLKO WEB** - App Store blokuje external payments
7. **2FA OBOWIAZKOWE** - Panel Pacjenta + Terapeuty
8. **RODO Art. 9** - pgaudit, RLS, AES-256, Frankfurt EU
9. **MARZA 80%+** - optymalizuj AI routing
10. **WOW EFEKT** - Zakochanie od pierwszego wejrzenia!

---

# PELNA LISTA ZMIENNYCH: /home/user/potrzebny-ai/COMPLETE_ENV_17734.txt

Plik zawiera wszystkie 17,734 zmiennych posortowanych alfabetycznie.

---

*Wygenerowane: 6 stycznia 2026*
*Dla: Perplexity Max (Lab Mode + Premium Sources)*
*Docelowo: Claude Code 20x Default Full Access*
*POTRZEBNY.AI - Najlepsza platforma MedTech/EdTech w Polsce*
