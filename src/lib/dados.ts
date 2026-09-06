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
}

/**
 * A cobertura: Minas Gerais inteira, por região.
 *
 * O dado publicável forte não é "quantos estados" — é o que o próprio material do
 * cliente já dizia e eu não usei: **ele atendeu todos os distribuidores regionais
 * de MG e as filiais dos nacionais presentes no estado**. Isso é cobertura
 * demonstrável; doze estados não era.
 *
 * 🔒 AS CIDADES SAÍRAM (05/09, decisão do dono: "apenas as regiões").
 *
 * Cada região trazia três praças óbvias — Belo Horizonte, Uberlândia, Juiz de
 * Fora — marcadas aqui mesmo como "a confirmar com o Fábio". E a página já as
 * exibia: a regra dura nº 2 sendo esticada, exatamente como no caso dos "onze
 * estados" que ele próprio pegou.
 *
 * Cidade só volta com autorização explícita dele — e aí o campo volta junto.
 * O que fica é o que se sustenta: um estado inteiro, por região.
 */
export const regioes: readonly Regiao[] = [
  { nome: "Central / RMBH" },
  { nome: "Sul de Minas" },
  { nome: "Triângulo" },
  { nome: "Zona da Mata" },
  { nome: "Norte" },
  { nome: "Vale do Aço" },
  { nome: "Centro-Oeste" },
  { nome: "Alto Paranaíba" },
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
 *
 * `site` (05/09/2026): o portal oficial de cada indústria, pesquisado na web e conferido
 * pelo ramo (autopeças) para não linkar homônimo. É fato público, não afirmação sobre o
 * cliente — mas link errado num site de cliente real é erro real. Dois pontos a confirmar
 * com o Fábio:
 *   · a Nidec responde em http (não https) em nidec-gpm.com.br — conferir se o https existe
 *   · a marca de lubrificante escreve-se **HEXXLUB**, com dois X (hexxlub.com.br). Aqui está
 *     "Hexlub" desde a carta. NÃO corrigi o nome por conta — pergunta ao Fábio.
 */
export const representadas = [
  { id: "ntn-snr", nome: "NTN-SNR", fornece: "Rolamentos", site: "https://ntn.com.br/" },
  { id: "filtros-brasil", nome: "Filtros Brasil", fornece: "Filtros de ar, óleo, combustível e cabine", site: "https://www.filtrosbrasil.com.br/" },
  { id: "nidec", nome: "Nidec", fornece: "Bombas d'água e de óleo", site: "http://www.nidec-gpm.com.br/" },
  { id: "cofran", nome: "Cofran", fornece: "Lanternas e retrovisores", site: "https://cofranlanternas.com.br/" },
  { id: "pysko", nome: "Pysko", fornece: "Kits de suspensão", site: "https://www.pysko.com.br/" },
  { id: "hexlub", nome: "Hexlub", fornece: "Óleo lubrificante", site: "https://hexxlub.com.br/" },
  // As cinco que estavam sem descricao foram preenchidas em 03/09/2026 pela carta
  // de apresentacao (Agosto/26, versao da Valeria) — casadas marca a marca pela
  // pagina do PDF, nao adivinhadas.
  { id: "meca-brazil", nome: "Meca Brazil", fornece: "Bicos injetores, sensores, conectores e cabo de vela", site: "https://mecabrazil.com/" },
  { id: "auto-america", nome: "Auto América", fornece: "Química automotiva, óleo de transmissão e aromatizantes", site: "https://www.autoamerica.com.br/" },
  { id: "mundial-prime", nome: "Mundial Prime", fornece: "Desengripante, limpa-contato, descarbonizante e sprays", site: "https://mundialprime.com.br/" },
  { id: "sintech", nome: "Sintech", fornece: "Peças para motor", site: "https://www.sintechdobrasil.com.br/" },
  { id: "vp", nome: "VP", fornece: "Peças plásticas automotivas", site: "https://vp.ind.br/" },
] as const;

/**
 * OS ANOS DA H.M. BORÇATO — calculados, nunca escritos à mão.
 *
 * 🔒 A FONTE É O SITE DO PRÓPRIO CLIENTE (hmborcato.com.br, raspado em 05/09/2026),
 * que afirma textualmente: **em setembro de 2018 iniciaram a trajetória da H.M.
 * Borçato**. Isso é fato publicado por ele — não dedução nossa.
 *
 * ⚠️ POR QUE NÃO SÃO OS "14 ANOS DE ESTRADA":
 * O mesmo texto diz que os 14 anos de know-how vieram **antes de abrir** (boa parte
 * como gerente de OUTRO escritório). Contar 14 até hoje daria início em 2012 —
 * depois da própria fundação, o que não fecha. E derivar 2004 (2018 − 14) para
 * publicar "22 anos" seria inventar um ano que ninguém afirmou: foi o que eu fiz
 * primeiro, e é exatamente a regra dura nº 2.
 *
 * Os 14 anos anteriores continuam no capítulo 01, com as palavras dele.
 *
 * Um dado que NÃO usamos, e por quê: o CNPJ 28.427.986/0001-08 registra constituição
 * em 16/08/2017. O site dele diz setembro de 2018 (quando a operação começou). Onde
 * as duas fontes divergem, vale a que o cliente publica sobre si.
 *
 * Deriva do relógio: vira 9 em setembro de 2027 sozinho.
 */
export const INICIO = { ano: 2018, mes: 9 };
export function anosDeEstrada(hoje = new Date()): number {
  const anos = hoje.getFullYear() - INICIO.ano;
  // o aniversário é em setembro: antes disso ainda não completou o ano
  return hoje.getMonth() + 1 >= INICIO.mes ? anos : anos - 1;
}

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
