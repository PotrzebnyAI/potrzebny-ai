# PERPLEXITY MAX AUTO-RESEARCH INSTRUCTION
## Z MCP GitHub Integration dla POTRZEBNY.AI

---

## WKLEJ TO DO PERPLEXITY MAX:

```
Jestem agentem AI pracującym nad platformą POTRZEBNY.AI. Mam dostęp do MCP GitHub (repozytorium: PotrzebnyAI/potrzebny-ai).

## MOJE ZADANIE:

Wykonaj research i AUTOMATYCZNIE zaktualizuj pliki w repozytorium z wynikami.

## KROK 1: RESEARCH - CENY AI (styczeń 2026)

Wyszukaj DOKŁADNIE:
- "Anthropic Claude pricing January 2026"
- "Claude Opus 4.5 price per token"
- "Claude Sonnet 4.5 API pricing"
- "DeepSeek V3 API pricing 2026"
- "Groq Whisper pricing per minute"

Zapisz wyniki jako JSON:
{
  "claude_opus_45": { "input": "$X/MTok", "output": "$Y/MTok" },
  "claude_sonnet_45": { "input": "$X/MTok", "output": "$Y/MTok" },
  "deepseek_v3": { "input": "$X/MTok", "output": "$Y/MTok" },
  "groq_whisper": { "per_minute": "$X" }
}

## KROK 2: RESEARCH - HEALTH APIs

Wyszukaj DOKŁADNIE:
- "Terra API pricing 2026 per user"
- "Validic API pricing tiers"
- "Apple HealthKit data access limits"
- "Google Fit API rate limits 2026"

## KROK 3: RESEARCH - STRIPE POLAND

Wyszukaj DOKŁADNIE:
- "Stripe BLIK fees Poland 2026"
- "Stripe card fees Poland EEA"
- "Stripe Connect payout fees Poland"
- "Stripe Tax VAT education exemption Poland"

## KROK 4: RESEARCH - MEDICAL APIs

Wyszukaj DOKŁADNIE:
- "PubMed E-utilities API rate limits 2026"
- "Semantic Scholar API free tier limits"
- "DrugBank API academic access"
- "ClinicalTrials.gov API v2 documentation"
- "OncoKB API academic license"

## KROK 5: RESEARCH - APP STORE/PLAY

Wyszukaj DOKŁADNIE:
- "App Store review time health apps 2026"
- "Google Play review time 2026"
- "Apple Small Business Program 15% commission"
- "Expo EAS build pricing 2026"

## KROK 6: ZAPISZ WYNIKI DO GITHUB

Użyj MCP GitHub aby:

1. Odczytaj plik: docs/research/06-PERPLEXITY-AUTO-RESULTS.md
2. Jeśli nie istnieje, utwórz go
3. Zapisz wszystkie wyniki researchu w formacie:

---
# AUTO-RESEARCH RESULTS
Data: [DZISIEJSZA DATA]
Agent: Perplexity Max

## 1. AI MODEL PRICING
[WYNIKI]

## 2. HEALTH APIs
[WYNIKI]

## 3. STRIPE POLAND
[WYNIKI]

## 4. MEDICAL APIs
[WYNIKI]

## 5. APP STORE/PLAY
[WYNIKI]

## 6. REKOMENDACJE
[TWOJE WNIOSKI]
---

## KROK 7: ZAKTUALIZUJ .env.example

Jeśli znalazłeś nowe wartości, zaktualizuj komentarze w .env.example:
- Dodaj aktualne ceny przy modelach AI
- Dodaj rate limits przy API keys
- Dodaj prowizje przy Stripe

## FORMAT ODPOWIEDZI:

Po wykonaniu wszystkich kroków, odpowiedz:

RESEARCH COMPLETED ✅

Zaktualizowane pliki:
- docs/research/06-PERPLEXITY-AUTO-RESULTS.md
- .env.example (jeśli zmiany)

Kluczowe odkrycia:
1. [NAJWAŻNIEJSZE ODKRYCIE 1]
2. [NAJWAŻNIEJSZE ODKRYCIE 2]
3. [NAJWAŻNIEJSZE ODKRYCIE 3]

Rekomendowane działania:
1. [AKCJA 1]
2. [AKCJA 2]
3. [AKCJA 3]
```

---

## ALTERNATYWNA WERSJA (bez MCP, tylko research):

```
Wykonaj szczegółowy research dla polskiej platformy MED/EDTECH (POTRZEBNY.AI).

WYSZUKAJ I PODAJ KONKRETNE LICZBY:

### AI MODELS (styczeń 2026):
1. "Anthropic Claude API pricing" - Opus 4.5, Sonnet 4.5, Haiku 4.5
2. "DeepSeek V3 API cost per token"
3. "Groq Whisper API pricing"
4. "OpenAI GPT-4 Turbo pricing 2026"

### HEALTH WEARABLES:
5. "Terra API pricing per user monthly"
6. "Validic production pricing"
7. "Oura Ring API partner requirements"

### STRIPE POLAND:
8. "Stripe Poland BLIK processing fees"
9. "Stripe Poland card transaction fees"
10. "Stripe Tax VAT exemption education Poland"

### MEDICAL APIs:
11. "PubMed API NCBI rate limits production"
12. "Semantic Scholar API limits"
13. "ClinicalTrials.gov API access"

### MOBILE DEPLOYMENT:
14. "Expo EAS build pricing free tier"
15. "App Store review time medical apps"
16. "Google Play instant publishing"

### KONKURENCJA POLSKA:
17. "Brainly Poland 2026 features"
18. "Docplanner ZnanyLekarz AI features"
19. "Polish edtech startups 2026"

FORMAT: Dla każdego podaj:
- KONKRETNA WARTOŚĆ/CENA
- ŹRÓDŁO (URL)
- DATA INFORMACJI
- CZY AKTUALNE NA STYCZEŃ 2026?

Na końcu: PODSUMOWANIE z rekomendacjami dla platformy z 19 panelami,
cel marża 80-85%, tiery cenowe 29/49/79/699/799 PLN.
```

---

## QUICK RESEARCH PROMPTS (pojedyncze zapytania):

### Ceny AI:
```
Find exact API pricing for Claude Opus 4.5, Claude Sonnet 4.5, and DeepSeek V3 as of January 2026. Include input/output token costs and any volume discounts.
```

### Health APIs:
```
Compare Terra API vs Validic pricing for health wearables integration. Which is better for a startup with <1000 users? Include setup time and device coverage.
```

### Stripe Poland:
```
What are the exact Stripe processing fees in Poland for: BLIK, Visa/Mastercard, Apple Pay, Google Pay, Klarna? Include per-transaction fees in PLN.
```

### Medical Research:
```
List all FREE medical research APIs: PubMed, Semantic Scholar, DrugBank, PharmGKB, OncoKB, ClinicalTrials.gov. What are their rate limits and how to get production API keys?
```

### App Store:
```
What is the current App Store review time for health/medical apps in January 2026? How to qualify for Apple's 15% Small Business Program?
```

---

## MCP GITHUB COMMANDS (jeśli Perplexity ma dostęp):

```javascript
// Odczyt pliku
mcp.github.readFile({
  owner: "PotrzebnyAI",
  repo: "potrzebny-ai",
  path: "docs/research/06-PERPLEXITY-AUTO-RESULTS.md"
})

// Zapis pliku
mcp.github.createOrUpdateFile({
  owner: "PotrzebnyAI",
  repo: "potrzebny-ai",
  path: "docs/research/06-PERPLEXITY-AUTO-RESULTS.md",
  content: "[WYNIKI RESEARCHU]",
  message: "research: auto-research results from Perplexity Max"
})

// Sprawdź branch
mcp.github.getBranch({
  owner: "PotrzebnyAI",
  repo: "potrzebny-ai",
  branch: "claude/setup-environment-variables-WmDfK"
})
```

---

## OCZEKIWANE WYNIKI:

Po wykonaniu researchu powinieneś otrzymać:
- Aktualne ceny wszystkich modeli AI
- Porównanie Terra vs Validic
- Dokładne prowizje Stripe dla Polski
- Lista darmowych medical APIs z limitami
- Czas review App Store/Google Play
- Analiza konkurencji w Polsce

---

*Instrukcja dla Perplexity Max z MCP GitHub*
*POTRZEBNY.AI - Styczeń 2026*
