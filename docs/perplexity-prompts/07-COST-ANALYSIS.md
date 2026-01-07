# PERPLEXITY MAX PROMPT #7: ANALIZA KOSZTÓW

## KONTEKST
POTRZEBNY.AI - cel marża 80-85%.
Infrastruktura: Upstash $220, Supabase $25, Vercel $20, Claude Max $180.
Pricing: 29/49/79/699/799 PLN.

## MCP GITHUB
- Repozytorium: `PotrzebnyAI/potrzebny-ai`
- Zapisz do: `docs/research/COST-ANALYSIS-RESULTS.md`

---

## WKLEJ TO DO PERPLEXITY MAX:

```
Jestem agentem AI z MCP GitHub. Research dla POTRZEBNY.AI.

## ZADANIE: Pełna analiza kosztów operacyjnych

### DANE WEJŚCIOWE:

**Infrastruktura stała:**
- Upstash Redis Prod Pack: $220/mc
- Supabase Pro Frankfurt: $25/mc
- Vercel Pro: $20/mc
- Claude Max 20x: $180/mc
- Perplexity Max: $240/mc
- Google Cloud: $300/mc credit
- Domeny: ~$100/rok

**Pricing użytkowników:**
- Basic: 29 PLN/mc
- Pro: 49 PLN/mc
- Ultra: 79 PLN/mc
- Supermózg ULTRA: 699 PLN/mc
- Research Premium: 799 PLN/mc
- Ćwiczenia: 29 PLN/mc
- Telebim: 499-3999 PLN/mc

**Założenia:**
- 1000 users po 6 miesiącach
- Rozkład: 50% Basic, 35% Pro, 10% Ultra, 3% Premium, 2% Telebim
- Kurs: 1 USD = 4 PLN

### OBLICZ:

1. **Fixed costs (miesięczne):**
   - Suma infrastruktury
   - Break-even users

2. **Variable costs per user:**
   - AI API costs per tier
   - Health API (Terra) for applicable panels
   - Stripe fees per transaction

3. **Revenue projections:**
   - ARPU (Average Revenue Per User)
   - MRR at 100/500/1000/5000 users

4. **Margin analysis:**
   - Gross margin per tier
   - Overall margin at scale

5. **Sensitivity analysis:**
   - What if 80% Basic users?
   - What if Opus pricing increases 20%?

### FORMAT ODPOWIEDZI:

```json
{
  "fixed_costs_monthly": {
    "upstash": 220,
    "supabase": 25,
    "vercel": 20,
    "claude_max": 180,
    "perplexity_max": 240,
    "google_cloud": 300,
    "total_usd": 985,
    "total_pln": 3940
  },
  "variable_costs_per_user": {
    "basic": {
      "ai_cost_pln": "X",
      "health_api": "N/A",
      "stripe_fee_pln": "X",
      "total_pln": "X"
    },
    "pro": { ... },
    "ultra": { ... },
    "premium_699": { ... },
    "premium_799": { ... }
  },
  "margin_per_tier": {
    "basic_29pln": {
      "revenue": 29,
      "variable_cost": "X",
      "margin_pln": "X",
      "margin_percent": "X%"
    },
    "pro_49pln": { ... },
    "ultra_79pln": { ... },
    "premium_699pln": { ... },
    "premium_799pln": { ... }
  },
  "projections": {
    "100_users": {
      "mrr_pln": "X",
      "costs_pln": "X",
      "profit_pln": "X",
      "margin": "X%"
    },
    "500_users": { ... },
    "1000_users": { ... },
    "5000_users": { ... }
  },
  "break_even": {
    "users_needed": "X",
    "at_arpu": "X PLN"
  },
  "target_margin_85_percent": {
    "achievable": true/false,
    "at_scale": "X users",
    "required_adjustments": "opis"
  }
}
```

### ZAPISZ DO GITHUB:
Plik: `docs/research/COST-ANALYSIS-RESULTS.md`
Commit: "research: full cost analysis and margin projections"
```

---

## CEL:
- Potwierdzenie marży 80-85%
- Break-even point
- Skalowanie do 5000 users
