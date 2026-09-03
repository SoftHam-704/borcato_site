import newsBearing from "@/assets/news-bearing.jpg";
import newsLed from "@/assets/news-led.jpg";
import partsCollage from "@/assets/parts-collage.jpg";

export interface NewsItem {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "ntn-20-anos",
    category: "Representadas",
    title: "NTN 20 anos!",
    excerpt:
      "Celebramos duas décadas de uma das maiores marcas de rolamentos do mundo, presente em nosso portfólio de representação.",
    date: "2020",
    image: newsBearing,
    imageAlt: "Rolamento de esferas em close, metal polido com reflexos azuis",
  },
  {
    slug: "lancamento-rolamento-nissan-kicks",
    category: "Rolamentos",
    title: "Lançamento — Rolamento Nissan Kicks",
    excerpt:
      "Nova referência de rolamento para o Nissan Kicks chega à reposição mineira, com aplicação completa e qualidade de origem.",
    date: "2020",
    image: newsBearing,
    imageAlt: "Rolamentos industriais de precisão em fundo escuro",
  },
  {
    slug: "lancamento-rolamento-duster-oroch",
    category: "Rolamentos",
    title: "Lançamento — Rolamento Duster Oroch",
    excerpt:
      "Ampliação da linha de rolamentos com nova aplicação para Renault Duster Oroch, reforçando a cobertura de reposição.",
    date: "2020",
    image: partsCollage,
    imageAlt: "Conjunto de autopeças dispostas sobre superfície clara",
  },
  {
    slug: "lancamento-reposicao",
    category: "Reposição",
    title: "Lançamentos na reposição — 26/06/2020",
    excerpt:
      "Novos códigos entram no mercado de reposição, ampliando as opções de peças de qualidade para distribuidores e oficinas.",
    date: "2020",
    image: partsCollage,
    imageAlt: "Autopeças variadas de reposição",
  },
  {
    slug: "lampadas-tungsram",
    category: "Iluminação",
    title: "Lâmpadas Tungsram",
    excerpt:
      "A tradicional marca de iluminação automotiva Tungsram faz parte do nosso portfólio, unindo tecnologia e confiabilidade.",
    date: "2020",
    image: newsLed,
    imageAlt: "Farol automotivo de LED aceso em azul no escuro",
  },
  {
    slug: "airmaks",
    category: "Segurança",
    title: "Airmaks — a melhor máscara",
    excerpt:
      "Conforto e qualidade: máscara lavável que não abafa, desenvolvida para o dia a dia de quem trabalha no setor automotivo.",
    date: "2020",
    image: partsCollage,
    imageAlt: "Linha de produtos de segurança e autopeças",
  },
];
