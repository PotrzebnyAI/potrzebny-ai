# PERPLEXITY MAX PROMPT #3: STRIPE POLAND

## KONTEKST
POTRZEBNY.AI - JDG, VAT 0%, Ryczałt 12%.
Płatności: BLIK, Karty, Apple Pay, Google Pay, Klarna.
Telebim (panel 20) - TYLKO WEB, dodatkowe: przelewy.

## MCP GITHUB
- Repozytorium: `PotrzebnyAI/potrzebny-ai`
- Zapisz do: `docs/research/STRIPE-POLAND-RESULTS.md`

---

## WKLEJ TO DO PERPLEXITY MAX:

```
Jestem agentem AI z MCP GitHub. Research dla POTRZEBNY.AI.

## ZADANIE: Konfiguracja Stripe Poland dla med/edtech

### WYSZUKAJ DOKŁADNIE:

1. "Stripe BLIK processing fees Poland 2026"
   - Prowizja % + stała opłata PLN
   - Czy dostępne w Stripe Checkout?

2. "Stripe Poland card transaction fees 2026"
   - Karty polskie
   - Karty EEA
   - Karty międzynarodowe

3. "Stripe Apple Pay Google Pay fees Poland"
   - Czy inne niż karty?

4. "Stripe Klarna Poland fees 2026"
   - Prowizja dla sprzedawcy
   - Limity kwotowe

5. "Stripe Tax VAT exemption education Poland"
   - Jak skonfigurować VAT 0%?
   - Automatic tax calculation

6. "Stripe Connect Poland payout fees"
   - Prowizja dla marketplace (70/30 split)
   - KYC wymagania dla polskich edukatorów
   - Czas payout: standard vs instant

7. "Stripe Poland subscription retry logic"
   - Dunning management
   - Ile prób przy failed payment?

8. "Stripe automatic invoicing Poland requirements"
   - Czy spełnia JPK?
   - Integracja z inFakt

### FORMAT ODPOWIEDZI:

```json
{
  "payment_methods": {
    "blik": {
      "fee_percent": "X%",
      "fee_fixed_pln": "X PLN",
      "available_in_checkout": true/false
    },
    "cards_poland": { "fee": "X% + X PLN" },
    "cards_eea": { "fee": "X% + X PLN" },
    "apple_pay": { "fee": "X% + X PLN" },
    "google_pay": { "fee": "X% + X PLN" },
    "klarna": { "fee": "X%", "min_amount": "X PLN" }
  },
  "vat_config": {
    "education_exemption": "jak skonfigurować",
    "medical_exemption": "jak skonfigurować",
    "automatic_tax": true/false
  },
  "stripe_connect": {
    "platform_fee": "X%",
    "payout_time_standard": "X dni",
    "payout_time_instant": "X minut",
    "kyc_requirements": ["lista"]
  },
  "invoicing": {
    "jpk_compliant": true/false,
    "infakt_integration": "możliwe/niemożliwe"
  },
  "sources": ["URLs"]
}
```

### ZAPISZ DO GITHUB:
Plik: `docs/research/STRIPE-POLAND-RESULTS.md`
Commit: "research: Stripe Poland configuration"
```

---

## CEL:
- Dokładne prowizje dla kalkulacji marży
- Konfiguracja VAT 0% dla edukacji/medycyny
- Setup Stripe Connect dla edukatorów (70/30)
