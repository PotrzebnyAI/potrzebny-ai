# POTRZEBNY.AI - Dokumentacja

## 21 Paneli | Marża 80-85% | Autodeploy

---

## Prompty dla Perplexity Max (NOWE!)

**Wyspecjalizowane prompty z MCP GitHub:**

| # | Prompt | Priorytet |
|---|--------|-----------|
| 1 | [Health APIs (VALIDIC → Terra)](./perplexity-prompts/01-HEALTH-APIS-VALIDIC-TERRA.md) | 🔴 KRYTYCZNY |
| 2 | [AI Model Pricing](./perplexity-prompts/02-AI-MODEL-PRICING.md) | 🔴 KRYTYCZNY |
| 3 | [Stripe Poland](./perplexity-prompts/03-STRIPE-POLAND.md) | 🟠 WYSOKI |
| 4 | [Medical APIs (darmowe)](./perplexity-prompts/04-MEDICAL-APIS-FREE.md) | 🟡 ŚREDNI |
| 5 | [App Store Deploy](./perplexity-prompts/05-APP-STORE-DEPLOY.md) | 🟠 WYSOKI |
| 6 | [RODO Compliance](./perplexity-prompts/06-RODO-COMPLIANCE.md) | 🟠 WYSOKI |
| 7 | [Cost Analysis](./perplexity-prompts/07-COST-ANALYSIS.md) | 🟡 ŚREDNI |
| 8 | [Konkurencja Polska](./perplexity-prompts/08-KONKURENCJA-POLSKA.md) | 🟢 NISKI |

→ [Instrukcja użycia promptów](./perplexity-prompts/README.md)

---

## Pliki Implementacyjne

- **[CLAUDE-CODE-PROMPTS.md](./CLAUDE-CODE-PROMPTS.md)** - 7 promptów do 24h autodeploy
- **[CODE-IMPLEMENTATION.md](./CODE-IMPLEMENTATION.md)** - Gotowy kod TypeScript do wdrożenia

---

## Research (Styczeń 2026)

- **[research/01-CZYM-JEST-POTRZEBNY-AI.md](./research/01-CZYM-JEST-POTRZEBNY-AI.md)** - Wizja i opis platformy
- **[research/02-KEY-RESEARCH-1.md](./research/02-KEY-RESEARCH-1.md)** - Kluczowe odkrycia cz. 1
- **[research/03-KEY-RESEARCH-2.md](./research/03-KEY-RESEARCH-2.md)** - Kluczowe odkrycia cz. 2
- **[research/04-POTRZEBNY-AI-RESEARCH-FINAL.md](./research/04-POTRZEBNY-AI-RESEARCH-FINAL.md)** - Finalna konfiguracja
- **[research/05-RESEARCH-2026.md](./research/05-RESEARCH-2026.md)** - Research techniczny 2026

---

## Struktura 21 Paneli

### GRUPA 1: Admin (9 paneli, DARMOWE)
| # | Panel | Widoczność | Health API |
|---|-------|------------|------------|
| 1 | Nauczyciel | Publiczny | - |
| 2 | Wykładowca | Publiczny | - |
| 3 | Terapeuta | Publiczny | ✅ |
| 4 | Lekarz Szkolący | Publiczny | ✅ |
| 5 | Terapeuta Szkolący | Publiczny | - |
| 6 | Personalizacyjny | Publiczny | - |
| 7 | Rodzic | Publiczny | - |
| 8 | **Super Admin** | 🔒 PRYWATNY | - |
| 9 | **Comet Assistant** | 🔒 PRYWATNY | - |

### GRUPA 2: User (5 paneli, 29/49/79 PLN)
| # | Panel | Health API |
|---|-------|------------|
| 10 | Uczeń | - |
| 11 | Student | - |
| 12 | Pacjent | ✅ |
| 13 | Kursant Medyczny | - |
| 14 | Szkoleniowy | - |

### GRUPA 3: Premium (3 panele, 699/799 PLN)
| # | Panel | Health API | AI Model |
|---|-------|------------|----------|
| 15 | Supermózg | ✅ | Sonnet |
| 16 | Supermózg ULTRA | ✅ | **Opus 4.5** |
| 17 | Badawczy Premium | ✅ | **Opus 4.5** |

### GRUPA 4: Special (4 panele)
| # | Panel | Uwagi |
|---|-------|-------|
| 18 | **PsychoMedic** | B2B dla sieci PsychoMedic (Dr Barlik) |
| 19 | Ćwiczenia Terapeutyczne | 29 PLN |
| 20 | Telebim LED | 📺 **TYLKO WEB** (499-3999 PLN) |
| 21 | Dynamiczny | Tworzony przez admina z panelu #8 |

---

## Prywatne Panele

### Panel #8 - Super Admin
- Email: `ai@potrzebny.ai`
- God Mode - pełny dostęp do wszystkich 21 paneli
- Tworzenie/usuwanie/edycja paneli
- Auto-debugging platformy
- Zatwierdzanie zmian z panelu #9

### Panel #9 - Comet Assistant
- Email: `asystent@potrzebny.ai`
- Integracja Perplexity Max Agent / Claude
- Wolny wybieg dla AI
- **WSZYSTKIE ZMIANY WYMAGAJĄ ZATWIERDZENIA** z panelu #8

---

## Kluczowe Decyzje Techniczne

### AI Model Routing (Marża 80-85%)
| Tier | Cena | Model | Koszt/request |
|------|------|-------|---------------|
| Basic | 29 PLN | DeepSeek V3 | ~$0.0002 |
| Pro | 49 PLN | Claude Sonnet 4.5 | ~$0.008 |
| Ultra | 79 PLN | Claude Sonnet 4.5 | ~$0.008 |
| Premium | 699/799 PLN | Claude Opus 4.5 | ~$0.05 |

### Infrastruktura Miesięczna
- Upstash Redis Prod Pack: $220/mc
- Claude Max 20x: $180/mc
- Perplexity Max: $240/mc
- Google Cloud: $300/mc credit
- Supabase Pro Frankfurt: $25/mc
- Vercel Pro: $20/mc

### Health Wearables (VALIDIC → Terra)
- **VALIDIC** - sandbox wygasa **29 stycznia 2026** ⚠️
- **Terra API** - migracja zaplanowana ($0.50/user/mc)
- **Apple HealthKit + Google Fit** - natywne, DARMOWE

### Płatności (Stripe Poland)
- BLIK: 1.6% + 1 PLN (65% e-commerce PL)
- Karty EOG: 1.5% + 1 PLN
- VAT 0% dla edukacji/medycyny
- Stripe Connect: 70/30 split dla edukatorów

---

## Deployment Timeline

```
T-24h: Testy + review + wersjonowanie
T-0:   Git tag + push
T+30m: EAS builds (iOS + Android + Web)
T+1h:  App Store + Google Play submission
T+2h:  Web na Vercel
T+24-72h: App Store review
```

---

*Ostatnia aktualizacja: 7 stycznia 2026*
*Claude Code dla POTRZEBNY.AI*
