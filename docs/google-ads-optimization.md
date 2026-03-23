# Google Ads Auditelle — Plano de Otimização

Data: 2026-03-23

## Problema

98% dos 529 signups são estudantes (gmail pessoal, nomes jovens).
O Google Ads Performance Max está otimizando para "signup fácil" = estudantes.
Professores quase nunca se cadastram.

## Diagnóstico

- **Performance Max não permite negative keywords** — não podemos excluir "vérifier mon texte", "est-ce que mon texte est IA"
- **Conversão = signup** (mudado de Purchase em 01/03) — isso treinou o algoritmo para buscar o público mais fácil de converter: estudantes
- **Ad copy misturado** — "Essai Gratuit · Sans CB" atrai curiosos, não decisores
- **Sem exclusão de idade** — PMax tem controle limitado de demografia

## Plano de Ação

### Ação 1 — Criar campanha Search (não PMax) — PRIORIDADE 1

Performance Max é ruim para B2B de nicho. Criar uma campanha **Search** manual com:

**Keywords (exact/phrase match):**
```
[détection ia travaux étudiants]
[outil anti-triche ia université]
[détecter chatgpt copie étudiant]
[logiciel détection ia enseignement]
[plagiat intelligence artificielle université]
[détecteur ia pour professeur]
[vérifier travaux étudiants chatgpt]
[intégrité académique intelligence artificielle]
[alternative turnitin france]
[détection ia conforme rgpd]
```

**Negative keywords (excluir estudantes):**
```
-vérifier mon texte
-mon devoir
-mon mémoire
-gratuit
-free
-tricher
-comment éviter
-contourner
-bypasser
-indétectable
-humanizer
-paraphraser
```

**Ad copy focado em professores:**

Headline 1: Détection IA Pour Enseignants
Headline 2: 99,9% Précision · Vérifié
Headline 3: Service Français · RGPD
Headline 4: Vérifiez les Travaux Étudiants
Headline 5: Tableau de Bord Professeur

Description 1: Outil de détection IA conçu pour les enseignants. Vérifiez les copies en quelques secondes. Précision 99,9%.
Description 2: Détectez ChatGPT, Claude et Gemini dans les travaux de vos étudiants. Conforme RGPD. Support français.

### Ação 2 — Pausar ou reduzir PMax — PRIORIDADE 1

- Reduzir PMax para €5/dia (manter dados)
- Transferir €10/dia para a campanha Search
- Ou pausar PMax completamente se Search performar melhor

### Ação 3 — Mudar conversão primária de volta para Purchase — PRIORIDADE 2

Com o limite de 3 scans/mês + CTA de upgrade, devemos ter conversões de compra em breve.
Quando tivermos 5+ purchases, mudar a conversão primária de volta para Purchase.
Isso faz o algoritmo buscar perfis que PAGAM, não que só se cadastram.

### Ação 4 — Landing page específica para ads — PRIORIDADE 3

Criar `/professeurs` com:
- Copy 100% focado em professores (não "essai gratuit")
- Testemunhos de professores
- Comparação com Turnitin
- CTA: "Demander une démo" em vez de "Essai gratuit"
- Usar como URL de destino dos anúncios Search

### Ação 5 — LinkedIn Ads — PRIORIDADE 3

Para decisores (VP numérique, responsable intégrité académique):
- Target: Job title contains "professeur", "enseignant", "maître de conférences", "directeur département"
- Location: France
- Budget: €10/dia
- Format: Single image ou message ad
- CTA: "Demander une démo"

## Budget Proposto

| Canal | Budget/dia | Público |
|---|---|---|
| Google Search (novo) | €10 | Professores pesquisando soluções |
| Google PMax (reduzir) | €5 | Manter para brand awareness |
| LinkedIn (futuro) | €10 | Decisores universitários |
| **Total** | **€25** | |

## Métricas de Sucesso

- Reduzir % de emails pessoais para <70% (hoje: 98%)
- Primeiro pagante dentro de 7 dias
- CPA de signup qualificado (email .edu ou profissional) < €5
