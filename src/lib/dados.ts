// Dados da H.M. Borçato — a fonte única do site.
//
// REGRA DURA, não negociável: nada de faturamento, número de clientes ou pedidos.
// Temos acesso ao RepOne (a Borçato é cliente da frota SoftHam) e esses números
// existem, mas são dados comerciais do cliente e NÃO vão para uma página pública.
// O que fica é alcance geográfico e as marcas — ambos verificáveis e autorizados.

// ⚠️ CORRIGIDO EM 03/09/2026, DEPOIS DE O PRÓPRIO FÁBIO PEGAR O ERRO NO HERO.
//
// O site dizia "de Minas para outros onze estados". ERA FALSO. Ele atende
// APENAS MINAS GERAIS.
//
// De onde veio o erro: o RepOne mostra 12 UFs com pedido, e eu transformei isso
// em manchete. Mas os números diziam o contrário — 226 clientes em MG contra 22
// nos outros onze estados SOMADOS. Aquilo não era cobertura: era cliente que se
// mudou ou comprou de longe. E o meu próprio arquivo DADOS-DO-SISTEMA.md tinha
// escrito "(a confirmar com o Fábio)". Nunca confirmei.
//
// LIÇÃO, que virou regra dura no QG: dado de sistema não vira manchete sem o
// cliente confirmar.

/** Uma região de Minas onde a Borçato atende — a cobertura REAL. */
export interface Regiao {
  nome: string;
  /** as praças que ancoram a região, para o mapa e para a legenda */
  ancoras: string;
}

/**
 * A cobertura: Minas Gerais inteira, por região.
 *
 * O dado publicável forte não é "quantos estados" — é o que o próprio material do
 * cliente já dizia e eu não usei: **ele atendeu todos os distribuidores regionais
 * de MG e as filiais dos nacionais presentes no estado**. Isso é cobertura
 * demonstrável; doze estados não era.
 *
 * ⚠️ As âncoras abaixo são as praças óbvias de cada região mineira. PRECISAM da
 * confirmação do Fábio (pergunta 2 da lista de 03/09) antes de irem ao ar como
 * roteiro de viagem. Se ele não confirmar, o mapa mostra as regiões sem nomear
 * cidade.
 */
export const regioes: readonly Regiao[] = [
  { nome: "Central / RMBH", ancoras: "Belo Horizonte · Contagem · Betim" },
  { nome: "Sul de Minas", ancoras: "Varginha · Poços de Caldas · Pouso Alegre" },
  { nome: "Triângulo", ancoras: "Uberlândia · Uberaba · Araguari" },
  { nome: "Zona da Mata", ancoras: "Juiz de Fora · Muriaé · Ubá" },
  { nome: "Norte", ancoras: "Montes Claros · Janaúba · Pirapora" },
  { nome: "Vale do Aço", ancoras: "Ipatinga · Governador Valadares · Coronel Fabriciano" },
  { nome: "Centro-Oeste", ancoras: "Divinópolis · Formiga · Pará de Minas" },
  { nome: "Alto Paranaíba", ancoras: "Patos de Minas · Patrocínio · Araxá" },
] as const;

/** A casa. Um estado só, e é esse o argumento. */
export const casa = {
  uf: "MG",
  nome: "Minas Gerais",
  /** IBGE 2024 — número público, do estado, não do cliente. */
  municipios: 853,
} as const;

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
  // As cinco que estavam sem descricao foram preenchidas em 03/09/2026 pela carta
  // de apresentacao (Agosto/26, versao da Valeria) — casadas marca a marca pela
  // pagina do PDF, nao adivinhadas.
  { id: "meca-brazil", nome: "Meca Brazil", fornece: "Bicos injetores, sensores, conectores e cabo de vela" },
  { id: "auto-america", nome: "Auto América", fornece: "Química automotiva, óleo de transmissão e aromatizantes" },
  { id: "mundial-prime", nome: "Mundial Prime", fornece: "Desengripante, limpa-contato, descarbonizante e sprays" },
  { id: "sintech", nome: "Sintech", fornece: "Peças para motor" },
  { id: "vp", nome: "VP", fornece: "Peças plásticas automotivas" },
] as const;

export const empresa = {
  nome: "H.M. Borçato",
  descritor: "Representação Comercial e Marketing",
  fundacao: 2018,
  base: "Belo Horizonte · MG",
  // A frase que o próprio Fábio publicou. É o fecho do site.
  homenagem: "O nome da empresa é uma homenagem aos dois filhos do sócio-fundador — Henrique e Mateus — e ao nome de sua família.",
  telefone: { rotulo: "(31) 3146-1975", href: "tel:+553131461975" },
  /* O rotulo diz "Celular · WhatsApp" e o href era `tel:` — anunciava uma coisa
     e fazia outra. O CTA do hero ja usava wa.me; o fecho da pagina, nao.
     Achado pela revisao do gerente em 05/09. */
  celular: {
    rotulo: "(31) 99656-8022",
    href: "https://wa.me/5531996568022",
    href_ligar: "tel:+5531996568022",
  },
  email: "contato@hmborcato.com.br",
} as const;
