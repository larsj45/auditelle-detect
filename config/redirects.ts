import { default as auditelleFr } from "./auditelle-fr";
import { default as novalearnUk } from "./novalearn-uk";
import { default as veritextoEs } from "./veritexto-es";
import { default as klartextSe } from "./klartext-se";

const redirects: Record<string, any[]> = {
  'auditelle-fr': auditelleFr.redirects || [],
  'novalearn-uk': novalearnUk.redirects || [],
  'veritexto-es': veritextoEs.redirects || [],
  'klartext-se': klartextSe.redirects || [],
};

export default redirects;
