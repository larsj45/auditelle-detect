# Auditelle — Plano de Marketing (27/02/2026)

**Status atual:**
- 34 usuários Auditelle | 48 NovaLearn
- MRR: €174 (2 assinaturas pagas)
- Google Ads: 50.636 imp · 1.591 cliques · CTR 3,1% · €127 gasto
- Problema central: signup → pagamento ≈ 0%

---

## Prioridade 1 — Email Nurturing (esta semana)

Sequência para os ~30 usuários free que ainda não converteram:

| Dia | Assunto | Objetivo |
|-----|---------|----------|
| D+0 | Boas-vindas (já existe) | Onboarding |
| D+3 | "Vous saviez que 40% des travaux académiques utilisent l'IA ?" | Educar, criar urgência |
| D+7 | Case: comment un professeur a détecté 12 travaux d'IA en 1 heure | Social proof |
| D+14 | Offre: 30% de réduction (LIMITE30) | Conversão |

**Owner:** OpenClaw (implementar no código) + Claude (escrever copy FR)
**Deadline:** 28/02

---

## Prioridade 2 — SEO em Francês (próximas 2 semanas)

5 artigos de blog em francês targeting:
1. "Comment détecter les textes générés par ChatGPT" (1.200+ buscas/mês)
2. "Meilleur détecteur IA pour enseignants 2026"
3. "Détecteur IA gratuit vs payant — comparaison"
4. "Comment l'IA transforme la triche académique"
5. "Auditelle vs GPTZero vs Turnitin — comparaison complète"

**Owner:** Claude (escrever rascunhos FR) + Lars (revisar e publicar)
**Deadline:** 15/03

---

## Prioridade 3 — Reduzir Atrito no Upgrade (esta semana)

- [ ] Verificar se /dashboard/upgrade está funcionando end-to-end
- [ ] Banner "X análises restantes" mais visível no dashboard
- [ ] Progressbar de uso sempre visível (não só quando próximo do limite)
- [ ] CTA de upgrade inline quando score for alto (usuário viu valor, momento certo)

**Owner:** OpenClaw
**Deadline:** 28/02

---

## Prioridade 4 — Parcerias com Professores (próximo mês)

- Twitter/X: buscar #enseignant #intégritéacadémique #IA
- LinkedIn: educadores universitários FR
- Oferta: 3 meses gratuitos em troca de menção/review autêntica

**Owner:** Lars
**Deadline:** 15/03

---

## Prioridade 5 — A/B Test nos Anúncios (esta semana)

**Variante A (medo/urgência):**
> "Vos étudiants utilisent-ils l'IA ? Détectez en 3 secondes"

**Variante B (autoridade/prova social):**
> "Utilisé par 200.000+ enseignants. Précision 99,98%"

**Owner:** Lars (criar no Google Ads) + OpenClaw (monitorar via API)
**Deadline:** 01/03

---

## Métricas de Sucesso (30 dias)

| Métrica | Atual | Meta |
|---------|-------|------|
| MRR | €174 | €500 |
| Conversão signup→paid | ~0% | 5% |
| Usuários Auditelle | 34 | 100 |
| Tráfego orgânico | 0 | 200 visitas/mês |

---

## Notas Técnicas (para Claude Code)

- Repo: `larsj45/auditelle-detect`
- Email templates: `src/lib/email.ts` + strings em `config/auditelle-fr.ts`
- Dashboard: `src/app/dashboard/page.tsx`
- Upgrade page: `src/app/dashboard/upgrade/page.tsx`

Para a sequência de nurturing, adicionar 3 novos templates em `config/auditelle-fr.ts`
na seção `strings.emails` e funções correspondentes em `email.ts`.
O cron em `src/app/api/cron/emails/route.ts` já existe e pode ser estendido.

*Criado por Tyr (OpenClaw) em colaboração com Lars — revisão e execução com Claude Code*
