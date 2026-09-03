import type { CSSProperties } from "react";

// PALAVRAS — o texto que se ESCREVE em vez de aparecer.
//
// O dono apontou: "não notei efeitos ao escrever os textos". Estava certo — o
// título entrava como bloco, com fade. Aqui cada palavra vira um <span> com o
// índice (--i) e o total (--n), e o CSS decide o gesto:
//
//   · no hero, cada palavra sobe em cascata quando a abertura termina
//   · nos capítulos, cada palavra entra conforme o scroll, na ordem da leitura
//
// O componente não anima nada. Só entrega as peças — padrão da casa.
//
// A palavra inteira fica dentro de um <span> com overflow:hidden (o "berço"),
// e a palavra sobe de dentro dele: é o gesto de máscara do lukebaffait.fr
// (clip por linha), sem clip-path por elemento.

interface Props {
  texto: string;
  /** deslocamento do índice, para uma segunda linha continuar a contagem */
  desde?: number;
  /** total de palavras do conjunto, quando várias linhas dividem a cascata */
  total?: number;
}

export function Palavras({ texto, desde = 0, total }: Props) {
  const palavras = texto.split(/\s+/).filter(Boolean);
  const n = total ?? palavras.length;
  return (
    <>
      {palavras.map((p, i) => (
        <span className="berco" key={`${p}-${i}`}>
          <span
            className="pal"
            style={{ "--i": desde + i, "--n": n } as CSSProperties}
          >
            {p}
          </span>
          {i < palavras.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

/** Quantas palavras tem um texto — para encadear a cascata entre linhas. */
export function contar(texto: string): number {
  return texto.split(/\s+/).filter(Boolean).length;
}
