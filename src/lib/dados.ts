// Dados da H.M. Borçato — a fonte única do site.
//
// REGRA DURA, não negociável: nada de faturamento, número de clientes ou pedidos.
// Temos acesso ao RepOne (a Borçato é cliente da frota SoftHam) e esses números
// existem, mas são dados comerciais do cliente e NÃO vão para uma página pública.
// O que fica é alcance geográfico e as marcas — ambos verificáveis e autorizados.

/** Os 12 estados atendidos, em ordem de relevância na operação (RepOne, 09/2026). */
export const estados = [
  { uf: "MG", nome: "Minas Gerais", casa: true },
  { uf: "ES", nome: "Espírito Santo" },
  { uf: "GO", nome: "Goiás" },
  { uf: "SP", nome: "São Paulo" },
  { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RJ", nome: "Rio de Janeiro" },
  { uf: "PA", nome: "Pará" },
  { uf: "MT", nome: "Mato Grosso" },
  { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" },
  { uf: "PR", nome: "Paraná" },
  { uf: "SC", nome: "Santa Catarina" },
] as const;

/**
 * As 11 representadas.
 *
 * 🔒 ESTA LISTA É DECISÃO DO CLIENTE E NÃO SE DISCUTE.
 * O Fábio enviou exatamente estas por WhatsApp (01/09/2026). O cadastro do RepOne
 * mostra outras indústrias ativas, e o painel de faturamento de 2026 mostra outras
 * ainda — nenhuma delas entra. Ele tem os motivos dele (contrato, exclusividade,
 * negociação). Ver representadas/LEIA-PRIMEIRO.md.
 *
 * `fornece` vem da carta de apresentação. Onde a carta não deixa claro qual descrição
 * pertence a qual marca, o campo fica vazio — não inventar.
 */
export const representadas = [
  { id: "ntn-snr", nome: "NTN-SNR", fornece: "Rolamentos" },
  { id: "filtros-brasil", nome: "Filtros Brasil", fornece: "Filtros de ar, óleo, combustível e cabine" },
  { id: "nidec", nome: "Nidec", fornece: "Bombas d'água e de óleo" },
  { id: "cofran", nome: "Cofran", fornece: "Lanternas e retrovisores" },
  { id: "pysko", nome: "Pysko", fornece: "Kits de suspensão" },
  { id: "hexlub", nome: "Hexlub", fornece: "Óleo lubrificante" },
  { id: "meca-brazil", nome: "Meca Brazil", fornece: "" },
  { id: "auto-america", nome: "Auto América", fornece: "" },
  { id: "mundial-prime", nome: "Mundial Prime", fornece: "" },
  { id: "sintech", nome: "Sintech", fornece: "" },
  { id: "vp", nome: "VP", fornece: "" },
] as const;

export const empresa = {
  nome: "H.M. Borçato",
  descritor: "Representação Comercial e Marketing",
  fundacao: 2018,
  base: "Belo Horizonte · MG",
  // A frase que o próprio Fábio publicou. É o fecho do site.
  homenagem: "O nome da empresa é uma homenagem aos dois filhos do sócio-fundador — Henrique e Mateus — e ao nome de sua família.",
  telefone: { rotulo: "(31) 3146-1975", href: "tel:+553131461975" },
  celular: { rotulo: "(31) 99656-8022", href: "tel:+5531996568022" },
  email: "contato@hmborcato.com.br",
} as const;
