# PERPLEXITY MAX PROMPTS - STYCZEN 2026

## Cel: Optymalizacja POTRZEBNY.AI przed autodeployem

---

## PROMPT 1: WALIDACJA CENY MODELI AI (KRYTYCZNE)

```
Potrzebuję AKTUALNYCH cen modeli AI na styczeń 2026 z oficjalnych źródeł:

1. ANTHROPIC CLAUDE:
   - Claude Opus 4.5 - cena za 1M tokenów input/output
   - Claude Sonnet 4.5 - cena za 1M tokenów input/output
   - Claude Haiku 4.5 - cena za 1M tokenów input/output
   - Czy jest Prompt Caching? Jaki discount?

2. DEEPSEEK V3:
   - Aktualna cena API za 1M tokenów
   - Porównanie jakości vs Claude Sonnet
   - Czy jest reliable dla produkcji?

3. OPENAI GPT-4.5 (jeśli istnieje):
   - Czy wyszedł nowy model?
   - Ceny porównawcze

4. GROQ:
   - Whisper Large v3 - cena za minutę audio
   - Llama 3.1 70B - cena za 1M tokenów

5. GOOGLE GEMINI:
   - Gemini 2.0 Pro - cena i dostępność
   - Czy lepszy od Claude Sonnet?

Podaj źródła z oficjalnych stron pricing.
```

---

## PROMPT 2: HEALTH WEARABLES - MIGRACJA Z VALIDIC

```
PILNE: Mój VALIDIC sandbox wygasa 29 stycznia 2026.

Potrzebuję szczegółowego porównania:

1. TERRA API (terra.bio):
   - Aktualny pricing styczeń 2026 (ostatnio $0.50/user/mc)
   - Czy mają starter plan dla <1000 users?
   - Jakie urządzenia obsługują? (Oura, Whoop, Apple Watch, Fitbit)
   - Czas setup - ile dni?
   - Czy mają polskie wsparcie/dokumentację?

2. APPLE HEALTHKIT + GOOGLE FIT:
   - Czy mogę użyć natywnie bez Terra/Validic?
   - Jakie dane są dostępne (HRV, sleep, activity)?
   - Jak przekazać dane do web app?

3. VALIDIC:
   - Production pricing tiers 2026
   - Czy oferują startup program?
   - Co tracę nie używając Validic?

4. ALTERNATYWY:
   - Vital.io - pricing i features
   - Gyroscope - czy mają B2B API?

Potrzebuję decyzji do 20 stycznia 2026!
```

---

## PROMPT 3: MEDICAL APIs - BEZPLATNE OPCJE

```
Dla panelu badawczego (799 PLN/mc) potrzebuję darmowych medical APIs:

1. PUBMED E-UTILITIES:
   - Czy nadal darmowe w 2026?
   - Rate limits (widziałem 10 req/sec z API key)
   - Jak uzyskać production API key?

2. SEMANTIC SCHOLAR (Allen AI):
   - Pricing 2026
   - Rate limits
   - Czy lepsze od PubMed dla citation network?

3. DRUGBANK:
   - Czy darmowa wersja nadal dostępna?
   - Co zawiera vs premium?

4. PHARMGKB:
   - Nadal darmowe?
   - Integracja z kliniczną farmakogenomiką

5. ONCOKB (Memorial Sloan Kettering):
   - Darmowe dla academic?
   - Jak uzyskać dostęp?

6. CLINICALTRIALS.GOV API V2:
   - Nadal darmowe?
   - Nowe features w 2026?

7. OPENFDA:
   - Adverse events API - nadal darmowe?
   - Rate limits

8. WILEY TDM / ELSEVIER:
   - Czy oferują startup programs?
   - Szacowany koszt dla 1000 users?

Priorytet: Maksymalizacja darmowych API, płatne tylko dla premium features.
```

---

## PROMPT 4: STRIPE POLAND - OPTYMALIZACJA PLATNOSCI

```
Konfiguracja Stripe dla polskiego med/edtech startupu:

1. METODY PLATNOSCI PL:
   - BLIK - aktualne prowizje 2026
   - Karty - Visa/Mastercard prowizje
   - Apple Pay / Google Pay - prowizje
   - Klarna BNPL - prowizje i limity
   - Przelewy24 - czy warto dodać?

2. STRIPE TAX:
   - Jak skonfigurować VAT 0% dla usług edukacyjnych?
   - Jak dla usług medycznych?
   - Czy automatycznie rozpoznaje?

3. STRIPE CONNECT (Marketplace):
   - Prowizja platformy za payout do edukatora
   - 70/30 split - jak skonfigurować?
   - KYC requirements dla polskich edukatorów
   - Czas payout - standard vs instant

4. SUBSCRIPTIONS:
   - Retry logic dla failed payments
   - Dunning management - best practices
   - Prorate przy upgrade/downgrade

5. INVOICING:
   - Automatyczne faktury polskie
   - Integracja z inFakt
   - Czy Stripe spełnia wymogi JPK?

Potrzebuję dokładnych prowizji w PLN.
```

---

## PROMPT 5: MOBILE DEPLOYMENT - EXPO EAS 2026

```
Planuję simultaneous deploy: Web (Vercel) + iOS (App Store) + Android (Google Play)

1. EXPO EAS BUILD:
   - Aktualny pricing 2026 (free tier limits?)
   - Czas build: iOS vs Android
   - Czy mogę użyć M1 runners za darmo?

2. APP STORE 2026:
   - Czas review (medical/education apps)
   - Wymagania dla health apps (HealthKit)
   - Privacy Nutrition Labels - co wypełnić?
   - In-App Purchases vs Web payments - co lepsze?

3. GOOGLE PLAY 2026:
   - Czas review
   - Data Safety section - wymagania
   - Czy instant publish działa dla updates?

4. JEDNOLITA CODEBASE:
   - Next.js 15 + Expo - best practices
   - Solito vs Tamagui vs custom setup
   - Czy Expo Router działa z Next.js App Router?

5. REVENUE SPLIT:
   - Apple 15% (small business) - jak się zakwalifikować?
   - Google 15% - czy dotyczy subskrypcji?
   - Jak ominąć (web payments)?

Cel: Jeden push = deploy na 3 platformy.
```

---

## PROMPT 6: RODO ART. 9 - DANE MEDYCZNE

```
Compliance dla polskiej platformy med/edtech:

1. SUPABASE FRANKFURT:
   - Czy wystarczy dla RODO Art. 9 (dane medyczne)?
   - Czy Supabase ma BAA (Business Associate Agreement)?
   - DPA (Data Processing Agreement) - jak uzyskać?

2. SZYFROWANIE:
   - AES-256-GCM via pgcrypto - czy wystarczy?
   - Czy potrzebuję HSM?
   - Key rotation - jak często?

3. RLS (Row Level Security):
   - Czy chroni przed SQL injection?
   - Pacjent widzi tylko swoje dane - jak zaimplementować?
   - Terapeuta widzi tylko swoich pacjentów?

4. RETENCJA DANYCH:
   - Notatki terapeutyczne - ile lat w Polsce?
   - Dane medyczne - ile lat?
   - Jak zaimplementować auto-purge?

5. PRAWO DO BYCIA ZAPOMNIANYM:
   - Jak usunąć wszystkie dane użytkownika?
   - Co z audit logs?
   - Backup retention?

6. ISO 27001:
   - Czy potrzebuję na start?
   - Koszt certyfikacji w Polsce
   - Self-assessment checklist

Priorytet: Minimum viable compliance dla startu, roadmap do ISO 27001.
```

---

## PROMPT 7: KOSZT OPERACYJNY - KALKULACJE

```
Potrzebuję dokładnych kalkulacji dla 1000 users na POTRZEBNY.AI:

INFRASTRUCTURE (stałe):
- Upstash Redis Prod Pack: $220/mc
- Supabase Pro Frankfurt: $25/mc
- Vercel Pro: $20/mc
- Domena + SSL: ~$50/rok

AI MODELS (zmienne):
Zakładam 50% users = Basic (29 PLN), 40% = Pro (49 PLN), 10% = Ultra (79 PLN)

Średnio na usera/mc:
- Basic: 100 requests × DeepSeek V3 ($0.0003/req) = $0.03
- Pro: 200 requests × Claude Sonnet ($0.008/req) = $1.60
- Ultra: 500 requests × Claude Sonnet ($0.008/req) = $4.00

HEALTH WEARABLES:
- Terra API: $0.50/user (tylko dla 30% users?) = $150/mc

EMAILS/SMS:
- Resend: $20/mc (10k emails)
- Twilio: $50/mc (2FA SMS)

OBLICZ:
1. Total monthly cost @ 1000 users
2. Average revenue per user (ARPU)
3. Gross margin %
4. Break-even point (ile users)

Cel: Marża 80-85%
```

---

## PROMPT 8: KONKURENCJA - POLSKA 2026

```
Analiza konkurencji dla POTRZEBNY.AI w Polsce:

1. EDTECH POLSKA:
   - Brainly - co oferują w 2026?
   - SuperMemo - nadal aktywni?
   - Eduelo - features i pricing
   - Czy ktoś łączy AI tutoring + terapię?

2. MEDTECH POLSKA:
   - Docplanner / ZnanyLekarz - nowe features?
   - Telemedi - telekonsultacje
   - Therapify - terapia online
   - Czy ktoś oferuje AI medical research?

3. TERAPIA ONLINE:
   - Mindgram - pricing i features
   - Hedepy - co oferują?
   - Better Help (US) - czy weszli do PL?

4. HEALTH WEARABLES PL:
   - Kto integruje Oura/Whoop w Polsce?
   - Jakie polskie startupy health-tech?

5. UNIQUE SELLING POINT:
   - Czy ktoś łączy: edukację + terapię + research + wearables?
   - Jaka jest luka rynkowa?

Potrzebuję: nazwy, pricing, mocne/słabe strony.
```

---

## JAK UŻYWAĆ TYCH PROMPTÓW

1. **Wklej każdy prompt oddzielnie** do Perplexity Max
2. **Włącz Pro Search** dla deep research
3. **Zapisz odpowiedzi** w `/docs/research/`
4. **Zaktualizuj** `.env.example` z nowymi wartościami
5. **Uruchom** Claude Code prompts z `/docs/CLAUDE-CODE-PROMPTS.md`

---

## PRIORYTETY

| Prompt | Pilność | Wpływ na deploy |
|--------|---------|-----------------|
| #1 AI Pricing | KRYTYCZNE | Koszty operacyjne |
| #2 VALIDIC Migration | PILNE (29 dni!) | Health features |
| #3 Medical APIs | Średnie | Panel badawczy |
| #4 Stripe Poland | KRYTYCZNE | Przychody |
| #5 Mobile Deploy | Wysokie | App Store/Play |
| #6 RODO | KRYTYCZNE | Compliance |
| #7 Koszty | Wysokie | Business model |
| #8 Konkurencja | Średnie | Strategia |

---

*Utworzono: 7 stycznia 2026*
*Claude Code dla POTRZEBNY.AI*
