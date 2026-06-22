import { default as auditelleFr } from "./auditelle-fr";
import { default as novalearnUk } from "./novalearn-uk";
import { default as veritextoEs } from "./veritexto-es";
import { default as klartextSe } from "./klartext-se";
import type { ResellerConfig } from "./types";

type Redirect = ResellerConfig["redirects"][number]

const redirects: Record<string, Redirect[]> = {
  'auditelle-fr': auditelleFr.redirects || [],
  'novalearn-uk': novalearnUk.redirects || [],
  'veritexto-es': veritextoEs.redirects || [],
  'klartext-se': klartextSe.redirects || [],
};

export default redirects;
