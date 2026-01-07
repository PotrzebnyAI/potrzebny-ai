# PERPLEXITY MAX PROMPT #2: AI MODEL PRICING

## KONTEKST
Platforma POTRZEBNY.AI - cel marża 80-85%.
AI Routing:
- Basic (29 PLN) → najtańszy model
- Pro (49 PLN) → Claude Sonnet
- Ultra (79 PLN) → Claude Sonnet
- Premium (699/799 PLN) → Claude Opus 4.5

## MCP GITHUB
- Repozytorium: `PotrzebnyAI/potrzebny-ai`
- Zapisz do: `docs/research/AI-PRICING-RESULTS.md`

---

## WKLEJ TO DO PERPLEXITY MAX:

```
Jestem agentem AI z MCP GitHub. Research dla POTRZEBNY.AI.

## ZADANIE: Aktualne ceny AI modeli (styczeń 2026)

### WYSZUKAJ DOKŁADNIE:

1. "Anthropic Claude API pricing January 2026"
   - Claude Opus 4.5 per million tokens input/output
   - Claude Sonnet 4.5 per million tokens
   - Claude Haiku 4.5 per million tokens
   - Prompt Caching discount %

2. "DeepSeek V3 API pricing 2026"
   - Per million tokens
   - Porównanie jakości do Claude
   - Rate limits
   - Reliability for production

3. "Groq API pricing 2026"
   - Whisper Large v3 per audio minute
   - Llama 3.1 70B per million tokens
   - Rate limits

4. "OpenAI GPT-4 Turbo pricing January 2026"
   - Czy jest nowy model?
   - Per million tokens

5. "Google Gemini 2.0 Pro API pricing"
   - Dostępność
   - Cena vs Claude

### KALKULACJA DLA POTRZEBNY.AI:

Zakładając średnio:
- Basic user: 100 requests/mc, 1000 tokens/request
- Pro user: 200 requests/mc, 2000 tokens/request
- Ultra user: 500 requests/mc, 2000 tokens/request
- Premium user: 1000 requests/mc, 5000 tokens/request

Oblicz koszt/user/mc dla każdego tier.

### FORMAT ODPOWIEDZI:

```json
{
  "models": {
    "claude_opus_45": {
      "input": "$X/MTok",
      "output": "$Y/MTok",
      "prompt_cache_discount": "X%",
      "source": "URL"
    },
    "claude_sonnet_45": { ... },
    "claude_haiku_45": { ... },
    "deepseek_v3": { ... },
    "groq_whisper": { "per_minute": "$X" }
  },
  "cost_per_user": {
    "basic_29pln": "$X/mc",
    "pro_49pln": "$X/mc",
    "ultra_79pln": "$X/mc",
    "premium_699pln": "$X/mc"
  },
  "margin_analysis": {
    "basic": "X% margin",
    "pro": "X% margin",
    "ultra": "X% margin",
    "premium": "X% margin"
  },
  "recommendation": {
    "basic_model": "DeepSeek V3 / Haiku",
    "pro_model": "Sonnet 4.5",
    "premium_model": "Opus 4.5"
  }
}
```

### ZAPISZ DO GITHUB:
Plik: `docs/research/AI-PRICING-RESULTS.md`
Commit: "research: AI model pricing analysis January 2026"
```

---

## CEL:
- Potwierdzić marżę 80-85%
- Wybrać optymalny model dla każdego tier
- Sprawdzić czy DeepSeek jest production-ready
