import type { EditorialLocale } from './editorialCopy.ts'
import type { EditorialPrivacyCopy } from './editorialPrivacyCopy.ts'

// Terms of use and data processing agreement for the Lettrine self-service.
// DRAFT (version draft-2026-10): written without legal review, and the
// transfer clause depends on SCCs with Pangram Labs that are not signed yet.
// Must be reviewed and the draft banner removed before launch.

const CONTACT = 'contact@auditelle.fr'
const ENTITY_FR =
  'Auditelle SASU, société par actions simplifiée unipersonnelle au capital de 1 000 €, immatriculée au RCS de Paris sous le numéro 945 117 000, siège social : 128 rue La Boétie, 75008 Paris, France'
const ENTITY_SV =
  'Auditelle SASU, ett franskt aktiebolag (société par actions simplifiée unipersonnelle) med aktiekapital på 1 000 €, registrerat i handelsregistret i Paris under nummer 945 117 000, med säte på 128 rue La Boétie, 75008 Paris, Frankrike'

export type LegalDocument = 'terms' | 'dpa'

export const lettrineLegalCopy: Record<EditorialLocale, Record<LegalDocument, EditorialPrivacyCopy>> = {
  sv: {
    terms: {
      locale: 'sv',
      htmlLang: 'sv',
      path: '/vetenskapliga-tidskrifter/villkor',
      backPath: '/vetenskapliga-tidskrifter',
      backLabel: 'Tillbaka till Lettrine Editorial',
      metadata: {
        title: 'Användarvillkor | Lettrine Editorial',
        description: 'Användarvillkor för Lettrine Editorial, tjänsten för redaktionell integritet för vetenskapliga tidskrifter.',
      },
      title: 'Användarvillkor',
      updated: 'Version draft-2026-10',
      draftNotice: 'Utkast. Villkoren har ännu inte granskats juridiskt och kan ändras före lanseringen.',
      sections: [
        {
          heading: '1. Parter',
          paragraphs: [
            `Tjänsten Lettrine Editorial tillhandahålls av ${ENTITY_SV} ("Auditelle"). Kontakt: ${CONTACT}.`,
            'Villkoren gäller mellan Auditelle och den tidskrift, det förlag eller den organisation som skapar kontot ("Kunden"). Tjänsten riktar sig enbart till yrkesverksamma och organisationer, inte till konsumenter.',
          ],
        },
        {
          heading: '2. Tjänsten',
          paragraphs: [
            'Lettrine analyserar texter som Kunden skickar in och visar tecken på AI-genererat eller AI-assisterat innehåll, markerade avsnitt och textlikhet med källor på nätet. Kunden kan dokumentera sitt redaktionella beslut och exportera rapporten.',
            'Resultaten är signaler, inte bevis. De kan innehålla fel, både falska positiva och falska negativa. Kunden ansvarar ensam för sina redaktionella beslut och ska inte grunda en sanktion mot en författare enbart på resultaten.',
          ],
        },
        {
          heading: '3. Konto',
          paragraphs: [
            'Kontot skapas med en arbetsrelaterad e-postadress. Kunden ansvarar för att uppgifterna är korrekta och för att inloggningsuppgifterna hålls hemliga.',
          ],
        },
        {
          heading: '4. Enheter, priser och betalning',
          paragraphs: [
            'Analyser debiteras i enheter. En enhet motsvarar upp till 1 000 ord och omfattar både AI-analys och textlikhet. Kostnaden visas innan analysen startar.',
            'Ett nytt konto får 10 provenheter, en gång per e-postdomän. Därefter köps förbetalda paket på webbplatsen. Priserna anges exklusive moms; moms tillkommer enligt gällande regler beroende på Kundens land och momsregistreringsnummer. Betalning sker med kort via Stripe och faktura skickas via e-post.',
            'Köpta enheter gäller i 24 månader från köpet. Använda enheter återbetalas inte, inte heller om en analys raderas. Om en analys inte kan genomföras dras inga enheter.',
          ],
        },
        {
          heading: '5. Kundens ansvar',
          paragraphs: [
            'Kunden intygar att den har rätt att skicka in texterna för analys och att den informerar författarna i enlighet med sin egen policy. Kunden ska inte skicka in fler personuppgifter än vad som krävs och inte använda tjänsten i strid med lag.',
          ],
        },
        {
          heading: '6. Personuppgifter',
          paragraphs: [
            'När Auditelle behandlar personuppgifter i de inskickade texterna för Kundens räkning gäller personuppgiftsbiträdesavtalet, som är en del av dessa villkor. Kontouppgifter behandlas enligt integritetspolicyn.',
          ],
        },
        {
          heading: '7. Tillgänglighet och ändringar av tjänsten',
          paragraphs: [
            'Auditelle strävar efter att hålla tjänsten tillgänglig men garanterar inte oavbruten drift. Tjänsten kan utvecklas och ändras; väsentliga försämringar meddelas i förväg via e-post.',
          ],
        },
        {
          heading: '8. Ansvarsbegränsning',
          paragraphs: [
            'Auditelles sammanlagda ansvar är begränsat till de belopp Kunden har betalat under de tolv månader som föregår skadan. Auditelle ansvarar inte för indirekta skador eller för Kundens redaktionella beslut.',
          ],
        },
        {
          heading: '9. Uppsägning',
          paragraphs: [
            `Kunden kan avsluta kontot när som helst genom att skriva till ${CONTACT}. Auditelle kan stänga av ett konto vid väsentligt brott mot villkoren. Analyser raderas enligt personuppgiftsbiträdesavtalet.`,
          ],
        },
        {
          heading: '10. Ändringar av villkoren',
          paragraphs: [
            'Ändringar meddelas via e-post minst 30 dagar innan de börjar gälla. Fortsatt användning efter den dagen innebär att Kunden godkänner de nya villkoren.',
          ],
        },
        {
          heading: '11. Tillämplig lag och tvister',
          paragraphs: ['Villkoren regleras av fransk lag. Tvister avgörs av behörig domstol i Paris.'],
        },
      ],
    },
    dpa: {
      locale: 'sv',
      htmlLang: 'sv',
      path: '/vetenskapliga-tidskrifter/dpa',
      backPath: '/vetenskapliga-tidskrifter',
      backLabel: 'Tillbaka till Lettrine Editorial',
      metadata: {
        title: 'Personuppgiftsbiträdesavtal | Lettrine Editorial',
        description: 'Personuppgiftsbiträdesavtal för Lettrine Editorial enligt artikel 28 i dataskyddsförordningen.',
      },
      title: 'Personuppgiftsbiträdesavtal',
      updated: 'Version draft-2026-10',
      draftNotice:
        'Utkast. Avtalet har ännu inte granskats juridiskt. Överföringen till Pangram Labs i USA förutsätter standardavtalsklausuler som ännu inte har undertecknats; tjänsten öppnas inte innan detta är klart.',
      sections: [
        {
          heading: '1. Parter och roller',
          paragraphs: [
            `Kunden är personuppgiftsansvarig och ${ENTITY_SV} ("Auditelle") är personuppgiftsbiträde för de personuppgifter som finns i texter som Kunden skickar in till Lettrine Editorial. Avtalet uppfyller kraven i artikel 28 i dataskyddsförordningen.`,
          ],
        },
        {
          heading: '2. Föremål och varaktighet',
          paragraphs: [
            'Behandlingen pågår så länge Kunden har ett konto. Analyser och resultat raderas automatiskt 180 dagar efter analysen, eller tidigare om Kunden raderar dem.',
          ],
        },
        {
          heading: '3. Behandlingens art och ändamål',
          paragraphs: [
            'Texten skickas till analysmotorn för att ta fram en rapport om AI-signaler och textlikhet. Resultatet, de markerade avsnitten och Kundens beslut lagras. Hela manuskriptet lagras inte. Uppgifterna behandlas inte för andra ändamål.',
          ],
        },
        {
          heading: '4. Kategorier av registrerade och personuppgifter',
          paragraphs: [
            'Registrerade: manuskriptens författare, personer som nämns i texterna och Kundens användare. Personuppgifter: namn och andra uppgifter som förekommer i texterna samt kontouppgifter. Känsliga personuppgifter förväntas inte behandlas.',
          ],
        },
        {
          heading: '5. Biträdets skyldigheter',
          paragraphs: [
            'Auditelle behandlar uppgifterna endast enligt Kundens dokumenterade instruktioner, som utgörs av dessa villkor och Kundens användning av tjänsten.',
            'Personer med åtkomst omfattas av tystnadsplikt. Tekniska och organisatoriska skyddsåtgärder omfattar kryptering vid överföring, åtkomstkontroll per organisation och databas samt webbhotell i Europeiska unionen.',
            'Auditelle bistår Kunden vid förfrågningar från registrerade och vid konsekvensbedömningar, meddelar personuppgiftsincidenter utan onödigt dröjsmål och senast inom 48 timmar efter upptäckt, och tillhandahåller den information som behövs för att visa efterlevnad.',
          ],
        },
        {
          heading: '6. Underbiträden',
          paragraphs: [
            'Kunden ger ett allmänt förhandsgodkännande till följande underbiträden: Pangram Labs Inc. (USA) för analys av texten; Supabase (databas, Europeiska unionen, Paris); Vercel Inc. (drift av webbplatsen, region Paris); Stripe (betalning, endast faktureringsuppgifter); Resend (e-post, endast kontouppgifter).',
            'Ändringar meddelas via e-post minst 30 dagar i förväg. Kunden kan invända och avsluta kontot innan ändringen börjar gälla.',
          ],
        },
        {
          heading: '7. Överföring till tredjeland',
          paragraphs: [
            'Pangram Labs behandlar texten i USA. Överföringen sker med stöd av EU-kommissionens standardavtalsklausuler mellan Auditelle och Pangram Labs [ska undertecknas före lansering]. Pangram Labs anger i sin integritetspolicy att inskickade texter inte används för att träna modeller.',
          ],
        },
        {
          heading: '8. Kontakt',
          paragraphs: [`Frågor om avtalet: ${CONTACT}.`],
        },
      ],
    },
  },
  fr: {
    terms: {
      locale: 'fr',
      htmlLang: 'fr',
      path: '/revues-scientifiques/conditions',
      backPath: '/revues-scientifiques',
      backLabel: 'Retour à Lettrine Éditorial',
      metadata: {
        title: "Conditions d'utilisation | Lettrine Éditorial",
        description: "Conditions d'utilisation de Lettrine Éditorial, le service d'intégrité éditoriale pour les revues scientifiques.",
      },
      title: "Conditions d'utilisation",
      updated: 'Version draft-2026-10',
      draftNotice: "Projet. Ces conditions n'ont pas encore fait l'objet d'une revue juridique et peuvent changer avant le lancement.",
      sections: [
        {
          heading: '1. Parties',
          paragraphs: [
            `Le service Lettrine Éditorial est fourni par ${ENTITY_FR} (« Auditelle »). Contact : ${CONTACT}.`,
            "Les présentes conditions s'appliquent entre Auditelle et la revue, la maison d'édition ou l'organisation qui crée le compte (le « Client »). Le service est réservé aux professionnels et aux organisations ; il n'est pas destiné aux consommateurs.",
          ],
        },
        {
          heading: '2. Le service',
          paragraphs: [
            "Lettrine analyse les textes soumis par le Client et présente des signaux de contenu généré ou assisté par IA, les passages signalés et la similarité avec des sources en ligne. Le Client peut documenter sa décision éditoriale et exporter le rapport.",
            "Les résultats sont des signaux, pas des preuves. Ils peuvent comporter des erreurs, faux positifs comme faux négatifs. Le Client reste seul responsable de ses décisions éditoriales et ne doit pas fonder une sanction contre un auteur sur les seuls résultats.",
          ],
        },
        {
          heading: '3. Compte',
          paragraphs: [
            "Le compte est créé avec une adresse email professionnelle. Le Client garantit l'exactitude des informations et la confidentialité de ses identifiants.",
          ],
        },
        {
          heading: '4. Unités, prix et paiement',
          paragraphs: [
            "Les analyses sont décomptées en unités. Une unité correspond à 1 000 mots maximum et comprend l'analyse IA et la similarité. Le coût s'affiche avant le lancement de l'analyse.",
            "Un nouveau compte reçoit 10 unités d'essai, une seule fois par domaine email. Des blocs prépayés sont ensuite achetés sur le site. Les prix sont indiqués hors taxes ; la TVA s'applique selon les règles en vigueur, en fonction du pays et du numéro de TVA du Client. Le paiement se fait par carte via Stripe et la facture est envoyée par email.",
            "Les unités achetées sont valables 24 mois à compter de l'achat. Les unités consommées ne sont pas remboursées, y compris en cas de suppression d'une analyse. Aucune unité n'est décomptée si une analyse ne peut pas être réalisée.",
          ],
        },
        {
          heading: '5. Obligations du Client',
          paragraphs: [
            "Le Client garantit disposer du droit de soumettre les textes à l'analyse et informer les auteurs conformément à sa propre politique. Il ne soumet pas plus de données personnelles que nécessaire et n'utilise pas le service de manière illicite.",
          ],
        },
        {
          heading: '6. Données personnelles',
          paragraphs: [
            "Lorsque Auditelle traite pour le compte du Client des données personnelles contenues dans les textes soumis, l'accord de traitement des données, qui fait partie des présentes conditions, s'applique. Les données de compte sont traitées conformément à la politique de confidentialité.",
          ],
        },
        {
          heading: '7. Disponibilité et évolution du service',
          paragraphs: [
            "Auditelle s'efforce de maintenir le service disponible sans garantir une continuité absolue. Le service peut évoluer ; toute dégradation substantielle est annoncée à l'avance par email.",
          ],
        },
        {
          heading: '8. Limitation de responsabilité',
          paragraphs: [
            "La responsabilité totale d'Auditelle est limitée aux sommes payées par le Client au cours des douze mois précédant le dommage. Auditelle n'est pas responsable des dommages indirects ni des décisions éditoriales du Client.",
          ],
        },
        {
          heading: '9. Résiliation',
          paragraphs: [
            `Le Client peut fermer son compte à tout moment en écrivant à ${CONTACT}. Auditelle peut suspendre un compte en cas de manquement grave aux présentes conditions. Les analyses sont supprimées conformément à l'accord de traitement des données.`,
          ],
        },
        {
          heading: '10. Modification des conditions',
          paragraphs: [
            "Toute modification est notifiée par email au moins 30 jours avant son entrée en vigueur. La poursuite de l'utilisation après cette date vaut acceptation.",
          ],
        },
        {
          heading: '11. Droit applicable et litiges',
          paragraphs: ['Les présentes conditions sont régies par le droit français. Tout litige relève des tribunaux compétents de Paris.'],
        },
      ],
    },
    dpa: {
      locale: 'fr',
      htmlLang: 'fr',
      path: '/revues-scientifiques/dpa',
      backPath: '/revues-scientifiques',
      backLabel: 'Retour à Lettrine Éditorial',
      metadata: {
        title: 'Accord de traitement des données | Lettrine Éditorial',
        description: "Accord de traitement des données de Lettrine Éditorial, conforme à l'article 28 du RGPD.",
      },
      title: 'Accord de traitement des données',
      updated: 'Version draft-2026-10',
      draftNotice:
        "Projet. Cet accord n'a pas encore fait l'objet d'une revue juridique. Le transfert vers Pangram Labs aux États-Unis suppose des clauses contractuelles types qui ne sont pas encore signées ; le service n'ouvrira pas avant.",
      sections: [
        {
          heading: '1. Parties et rôles',
          paragraphs: [
            `Le Client est responsable du traitement et ${ENTITY_FR} (« Auditelle ») est sous-traitant pour les données personnelles contenues dans les textes que le Client soumet à Lettrine Éditorial. Le présent accord répond aux exigences de l'article 28 du RGPD.`,
          ],
        },
        {
          heading: '2. Objet et durée',
          paragraphs: [
            "Le traitement dure tant que le Client dispose d'un compte. Les analyses et résultats sont supprimés automatiquement 180 jours après l'analyse, ou plus tôt si le Client les supprime.",
          ],
        },
        {
          heading: '3. Nature et finalité du traitement',
          paragraphs: [
            "Le texte est transmis au moteur d'analyse pour produire un rapport sur les signaux IA et la similarité. Le résultat, les passages signalés et la décision du Client sont conservés. Le manuscrit complet n'est pas conservé. Les données ne sont pas traitées à d'autres fins.",
          ],
        },
        {
          heading: '4. Catégories de personnes et de données',
          paragraphs: [
            "Personnes concernées : auteurs des manuscrits, personnes citées dans les textes et utilisateurs du Client. Données : noms et autres informations présentes dans les textes, données de compte. Aucune donnée sensible n'est censée être traitée.",
          ],
        },
        {
          heading: '5. Obligations du sous-traitant',
          paragraphs: [
            "Auditelle traite les données uniquement sur instruction documentée du Client, constituée des présentes conditions et de l'utilisation du service par le Client.",
            "Les personnes autorisées sont tenues à la confidentialité. Les mesures techniques et organisationnelles comprennent le chiffrement en transit, le contrôle d'accès par organisation et en base de données, et l'hébergement dans l'Union européenne.",
            "Auditelle assiste le Client pour les demandes des personnes concernées et les analyses d'impact, notifie toute violation de données sans délai injustifié et au plus tard 48 heures après sa découverte, et met à disposition les informations nécessaires pour démontrer la conformité.",
          ],
        },
        {
          heading: '6. Sous-traitants ultérieurs',
          paragraphs: [
            "Le Client donne une autorisation générale préalable aux sous-traitants suivants : Pangram Labs Inc. (États-Unis) pour l'analyse du texte ; Supabase (base de données, Union européenne, Paris) ; Vercel Inc. (hébergement du site, région de Paris) ; Stripe (paiement, données de facturation uniquement) ; Resend (emails, données de compte uniquement).",
            "Toute modification est notifiée par email au moins 30 jours à l'avance. Le Client peut s'y opposer et fermer son compte avant son entrée en vigueur.",
          ],
        },
        {
          heading: '7. Transferts hors de l’Union européenne',
          paragraphs: [
            "Pangram Labs traite le texte aux États-Unis. Le transfert repose sur les clauses contractuelles types de la Commission européenne conclues entre Auditelle et Pangram Labs [à signer avant le lancement]. Pangram Labs indique dans sa politique de confidentialité ne pas utiliser les textes soumis pour entraîner ses modèles.",
          ],
        },
        {
          heading: '8. Contact',
          paragraphs: [`Questions sur cet accord : ${CONTACT}.`],
        },
      ],
    },
  },
}

export function getLettrineLegalCopy(locale: EditorialLocale, document: LegalDocument): EditorialPrivacyCopy {
  return lettrineLegalCopy[locale][document]
}
