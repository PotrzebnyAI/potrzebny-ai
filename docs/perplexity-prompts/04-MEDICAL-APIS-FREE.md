# PERPLEXITY MAX PROMPT #4: MEDICAL APIs (DARMOWE)

## KONTEKST
Panel Badawczy Premium (#17) - 799 PLN/mc.
Wymaga: PubMed, Semantic Scholar, DrugBank, OncoKB, ClinicalTrials.gov.
Cel: Maksymalizacja darmowych APIs.

## MCP GITHUB
- Repozytorium: `PotrzebnyAI/potrzebny-ai`
- Zapisz do: `docs/research/MEDICAL-APIS-RESULTS.md`

---

## WKLEJ TO DO PERPLEXITY MAX:

```
Jestem agentem AI z MCP GitHub. Research dla POTRZEBNY.AI.

## ZADANIE: Darmowe Medical APIs dla panelu badawczego

### WYSZUKAJ DOKŁADNIE:

1. "PubMed E-utilities API rate limits 2026"
   - Bez API key: X req/sec
   - Z API key: X req/sec
   - Jak uzyskać production API key?
   - Czy nadal darmowe?

2. "Semantic Scholar API free tier 2026"
   - Rate limits
   - SPECTER2 embeddings
   - Academic vs commercial use

3. "DrugBank API academic free access"
   - Co zawiera darmowa wersja?
   - Drug interactions
   - Cena premium

4. "PharmGKB API free access 2026"
   - Farmakogenomika
   - Rate limits
   - Cytochrome P450 data

5. "OncoKB API academic license application"
   - Jak złożyć wniosek?
   - Czas approval
   - Co obejmuje?

6. "ClinicalTrials.gov API v2 documentation 2026"
   - Nowe features
   - Rate limits
   - Filter by status=RECRUITING

7. "OpenFDA API adverse events rate limits"
   - Darmowe?
   - Rate limits

8. "RxNorm API NCBI usage limits"
   - Darmowe?
   - Drug normalization

9. "Wiley TDM API startup pricing"
   - Text & Data Mining
   - Academic discount

10. "Elsevier Scopus API academic access"
    - Cena dla startupu
    - Alternatywy

### FORMAT ODPOWIEDZI:

```json
{
  "free_apis": {
    "pubmed": {
      "free": true,
      "rate_limit_no_key": "3 req/sec",
      "rate_limit_with_key": "10 req/sec",
      "how_to_get_key": "instrukcja",
      "articles_count": "50M+"
    },
    "semantic_scholar": {
      "free": true,
      "rate_limit": "X req/sec",
      "embeddings": "SPECTER2"
    },
    "drugbank": {
      "free_version": "opis",
      "includes_interactions": true/false,
      "premium_price": "$X/mc"
    },
    "pharmgkb": { ... },
    "oncokb": { ... },
    "clinicaltrials": { ... },
    "openfda": { ... },
    "rxnorm": { ... }
  },
  "paid_apis": {
    "wiley_tdm": { "startup_price": "$X/rok" },
    "scopus": { "price": "$X/rok" }
  },
  "recommendation": {
    "start_with": ["lista darmowych"],
    "add_later": ["lista płatnych"],
    "total_monthly_cost": "$X"
  },
  "sources": ["URLs"]
}
```

### ZAPISZ DO GITHUB:
Plik: `docs/research/MEDICAL-APIS-RESULTS.md`
Commit: "research: free medical APIs for research panel"
```

---

## CEL:
- Lista darmowych API z rate limits
- Instrukcje jak uzyskać dostęp
- Szacowany koszt dla płatnych (później)
