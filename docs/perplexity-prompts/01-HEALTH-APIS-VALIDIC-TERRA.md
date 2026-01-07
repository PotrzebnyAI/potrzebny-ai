# PERPLEXITY MAX PROMPT #1: HEALTH APIs (VALIDIC → TERRA)

## KONTEKST
Platforma POTRZEBNY.AI - polski med/edtech z 21 panelami.
VALIDIC sandbox wygasa **29 stycznia 2026** - PILNE!
Health APIs potrzebne dla paneli: 3, 4, 12, 15, 16, 17, 18 (Terapeuty, Lekarza, Pacjenta, Supermózg, Research, PsychoMedic).

## MCP GITHUB
- Repozytorium: `PotrzebnyAI/potrzebny-ai`
- Branch: `claude/setup-environment-variables-WmDfK`
- Zapisz wyniki do: `docs/research/HEALTH-APIS-RESULTS.md`

---

## WKLEJ TO DO PERPLEXITY MAX:

```
Jestem agentem AI z MCP GitHub. Wykonuję research dla platformy POTRZEBNY.AI.

PILNE: VALIDIC sandbox wygasa 29 stycznia 2026!

## ZADANIE: Znajdź optymalne Health APIs dla wearables

### WYSZUKAJ DOKŁADNIE:

1. "Terra API pricing January 2026"
   - Cena za użytkownika/miesiąc
   - Starter plan dla <1000 users
   - Enterprise pricing

2. "Terra API supported devices 2026"
   - Oura Ring
   - Whoop
   - Apple Watch
   - Fitbit
   - Garmin
   - Samsung Galaxy Watch

3. "Validic API production pricing 2026"
   - Tiers cenowe
   - Startup program
   - Migration path

4. "Terra vs Validic comparison 2026"
   - Feature comparison
   - Reliability
   - Setup time

5. "Apple HealthKit web integration"
   - Czy możliwe bez native app?
   - Data sharing do backend

6. "Google Fit API rate limits production"
   - Limity dzienne
   - Koszt enterprise

7. "Oura Ring API partner program requirements"
   - Jak zostać partnerem
   - Koszt
   - Czas approval

8. "Whoop API business access 2026"
   - B2B integration
   - Pricing

### FORMAT ODPOWIEDZI:

```json
{
  "terra": {
    "price_per_user": "$X/mc",
    "starter_plan": "opis",
    "supported_devices": ["lista"],
    "setup_time": "X dni",
    "source": "URL"
  },
  "validic": {
    "production_price": "$X/mc",
    "startup_program": "tak/nie",
    "source": "URL"
  },
  "native_apis": {
    "apple_healthkit": { "web_possible": true/false },
    "google_fit": { "rate_limits": "X req/day" }
  },
  "recommendation": "Terra/Validic/Native",
  "migration_plan": "krok po kroku",
  "deadline_risk": "wysoki/średni/niski"
}
```

### ZAPISZ DO GITHUB:
Plik: `docs/research/HEALTH-APIS-RESULTS.md`
Commit: "research: health APIs comparison - VALIDIC migration"

### PRIORYTETY:
1. Musi działać przed 29 stycznia 2026
2. Koszt <$1/user/mc
3. Obsługa Oura + Whoop obowiązkowa
4. HRV, sleep, activity data
```

---

## OCZEKIWANE WYNIKI:
- Decyzja: Terra vs Validic vs Native
- Plan migracji krok po kroku
- Koszty miesięczne dla 100/1000/10000 users
- Timeline wdrożenia
