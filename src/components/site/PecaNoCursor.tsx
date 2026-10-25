// MAPA DE PEÇAS POR REPRESENTADA — usado pelos cartões 3D da EsteiraMarcas.
//
// As 11 peças foram geradas, normalizadas (mesma luz, mesmo preto, mesmo
// enquadramento) e tratadas em duotom na paleta do site. Nenhuma tem marca
// visível: seriam logos de terceiro em contexto não autorizado.

const pecas = import.meta.glob<{ default: string }>("../../assets/pecas/*.jpg", {
  eager: true,
});

/** Qual arquivo de peça pertence a cada representada. */
const DE_QUEM: Record<string, string> = {
  "ntn-snr": "rolamento",
  "filtros-brasil": "filtro",
  nidec: "bomba",
  cofran: "lanterna",
  pysko: "suspensao",
  hexlub: "oleo",
  "meca-brazil": "injetor",
  "auto-america": "quimica",
  "mundial-prime": "spray",
  sintech: "motor",
  vp: "plastico",
};

export function pecaDe(id: string): string | undefined {
  const nome = DE_QUEM[id];
  if (!nome) return undefined;
  const chave = Object.keys(pecas).find((k) => k.endsWith(`/${nome}.jpg`));
  return chave ? pecas[chave]?.default : undefined;
}
