# POTRZEBNY.AI - Dokumentacja

## Struktura Dokumentacji

### Pliki Implementacyjne
- **[CLAUDE-CODE-PROMPTS.md](./CLAUDE-CODE-PROMPTS.md)** - 7 promptow do 24h autodeploy
- **[CODE-IMPLEMENTATION.md](./CODE-IMPLEMENTATION.md)** - Gotowy kod TypeScript do wdrozenia
- **[PERPLEXITY-MAX-PROMPTS-2026.md](./PERPLEXITY-MAX-PROMPTS-2026.md)** - 8 promptow dla Perplexity Max (NOWE!)
- **[PERPLEXITY-MAX-RESEARCH-PROMPT.md](./PERPLEXITY-MAX-RESEARCH-PROMPT.md)** - Prompty do researchu API/zmiennych

### Research (Styczeń 2026)
- **[research/01-CZYM-JEST-POTRZEBNY-AI.md](./research/01-CZYM-JEST-POTRZEBNY-AI.md)** - Wizja i opis platformy
- **[research/02-KEY-RESEARCH-1.md](./research/02-KEY-RESEARCH-1.md)** - Kluczowe odkrycia cz. 1
- **[research/03-KEY-RESEARCH-2.md](./research/03-KEY-RESEARCH-2.md)** - Kluczowe odkrycia cz. 2
- **[research/04-POTRZEBNY-AI-RESEARCH-FINAL.md](./research/04-POTRZEBNY-AI-RESEARCH-FINAL.md)** - Finalna konfiguracja
- **[research/05-RESEARCH-2026.md](./research/05-RESEARCH-2026.md)** - Research techniczny 2026

---

## Kluczowe Decyzje Techniczne

### AI Model Routing (Marza 80-85%)
| Tier | Cena | Model | Koszt/request |
|------|------|-------|---------------|
| Basic | 29 PLN | DeepSeek V3 | $0.0002 |
| Pro | 49 PLN | Claude Sonnet 4.5 | $0.008 |
| Ultra | 79 PLN | Claude Sonnet 4.5 | $0.008 |
| Premium | 699/799 PLN | Claude Opus 4.5 | $0.05 |

### Infrastruktura Miesięczna
- Upstash Redis Prod Pack: $220/mc
- Claude Max 20x: $180/mc
- Perplexity Max: $240/mc
- Google Cloud: $300/mc credit
- Supabase Pro Frankfurt: $25/mc
- Vercel Pro: $20/mc

### Health Wearables
- **VALIDIC** - sandbox wygasa 29 stycznia 2026
- **Terra API** - migracja zaplanowana ($0.50/user/mc)
- **Apple HealthKit + Google Fit** - natywne, DARMOWE

### Platnosci (Stripe Poland)
- BLIK: 1.6% + 1 PLN (65% e-commerce PL)
- Karty EOG: 1.5% + 1 PLN
- VAT 0% dla edukacji/medycyny
- Stripe Connect: 70/30 split dla edukatorow

---

## 19 Paneli POTRZEBNY.AI

### Grupa 1: Admin (DARMOWE)
1. Panel Nauczyciela
2. Panel Wykladowcy
3. Panel Terapeuty
4. Panel Lekarza Szkolacego
5. Panel Terapeuty Szkolacego
6. Panel Personalizacyjny
7. Panel Rodzica
8. Panel Super Admin
9. Panel Comet Assistant

### Grupa 2: User (29/49/79 PLN)
10. Panel Ucznia
11. Panel Studenta
12. Panel Pacjenta
13. Panel Kursanta Medycznego
14. Panel Szkoleniowy

### Grupa 3: Premium (699/799 PLN)
15. Supermozg
16. Supermozg ULTRA
17. Research Premium

### Grupa 4: Special
18. Cwiczenia Terapeutyczne
19. Telebim LED

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
