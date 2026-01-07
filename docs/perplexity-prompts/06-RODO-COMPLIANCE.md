# PERPLEXITY MAX PROMPT #6: RODO / COMPLIANCE

## KONTEKST
POTRZEBNY.AI - dane medyczne (Art. 9 RODO).
Supabase Frankfurt, AES-256-GCM.
Panel Pacjenta, Panel Terapeuty - szyfrowane dane.

## MCP GITHUB
- Repozytorium: `PotrzebnyAI/potrzebny-ai`
- Zapisz do: `docs/research/RODO-COMPLIANCE-RESULTS.md`

---

## WKLEJ TO DO PERPLEXITY MAX:

```
Jestem agentem AI z MCP GitHub. Research dla POTRZEBNY.AI.

## ZADANIE: RODO Art. 9 compliance dla danych medycznych

### WYSZUKAJ DOKŁADNIE:

1. "RODO Article 9 medical data requirements Poland 2026"
   - Podstawy prawne przetwarzania
   - Wymagane zgody
   - Retencja danych

2. "Supabase GDPR DPA agreement"
   - Czy ma BAA?
   - DPA process
   - Frankfurt server compliance

3. "AES-256-GCM encryption GDPR compliance"
   - Czy wystarczy?
   - Key management
   - At-rest vs in-transit

4. "Medical data retention period Poland therapy notes"
   - Ile lat przechowywać?
   - Notatki terapeutyczne
   - Dane pacjenta

5. "Zero-knowledge encryption GDPR"
   - Implementacja
   - Key management
   - Recovery options

6. "Row Level Security PostgreSQL GDPR"
   - Best practices
   - Audit logging
   - pgaudit setup

7. "GDPR right to be forgotten implementation"
   - Technical requirements
   - Backup handling
   - Audit logs retention

8. "GDPR Article 20 data portability"
   - Export format
   - Timeline
   - Implementation

9. "ISO 27001 certification cost Poland startup"
   - Czas certyfikacji
   - Koszt
   - Self-assessment first

10. "RODO DPO requirements Poland"
    - Czy obowiązkowy?
    - Outsourcing możliwy?

### FORMAT ODPOWIEDZI:

```json
{
  "legal_basis": {
    "article_9_options": ["zgoda", "zdrowie publiczne", "inne"],
    "required_consents": ["lista"],
    "consent_template": "link/opis"
  },
  "data_retention": {
    "therapy_notes": "20 lat (UODO)",
    "patient_data": "X lat",
    "audit_logs": "X lat",
    "source": "URL"
  },
  "encryption": {
    "aes_256_sufficient": true,
    "key_rotation": "co X dni",
    "zero_knowledge": "implementacja"
  },
  "supabase_compliance": {
    "dpa_available": true/false,
    "baa_available": true/false,
    "frankfurt_compliant": true
  },
  "rls_implementation": {
    "patient_sees_own": "policy",
    "therapist_sees_patients": "policy",
    "audit_logging": "pgaudit config"
  },
  "right_to_be_forgotten": {
    "steps": ["krok po kroku"],
    "backup_handling": "opis",
    "timeline": "30 dni"
  },
  "iso_27001": {
    "required_for_start": false,
    "cost_poland": "X PLN",
    "timeline": "X miesięcy"
  },
  "dpo": {
    "required": true/false,
    "outsource_options": ["firmy w PL"]
  },
  "sources": ["URLs"]
}
```

### ZAPISZ DO GITHUB:
Plik: `docs/research/RODO-COMPLIANCE-RESULTS.md`
Commit: "research: RODO Article 9 compliance requirements"
```

---

## CEL:
- Minimum viable compliance na start
- Roadmap do ISO 27001
- Policy templates dla RLS
