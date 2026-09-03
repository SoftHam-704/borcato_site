import { useState } from "react";
import { representadas } from "@/lib/dados";

// As 11 representadas como PASTILHAS na base da tela, com a ativa acesa.
// Referência: Grigoletto #26 (Ferrari), onde as marcas de carro ficam em círculos no
// rodapé do hero em vez de numa grade perdida no meio da página.
//
// Por que aqui e não numa seção de logos: para um representante comercial, as marcas que
// ele carrega SÃO a credencial. Enfiá-las numa grade a três telas de distância é enterrar
// o argumento mais forte. Na base do hero, elas são a primeira prova que o visitante vê.
//
// Os arquivos são os recortes monocromáticos (representadas/mono/), pelo mesmo motivo da
// parede da SoftHam: 10 dos 11 originais são retângulos brancos chapados, de qualidade
// desigual, e o monocromático unifica sem depender da resolução da cor.
const logos = import.meta.glob<{ default: string }>("../../assets/marcas/*.png", {
  eager: true,
});

function arquivoDe(id: string): string | undefined {
  const chave = Object.keys(logos).find((k) => k.endsWith(`/${id}.png`));
  return chave ? logos[chave]?.default : undefined;
}

export function BarraMarcas() {
  const [emFoco, setEmFoco] = useState<string | null>(null);
  const atual = representadas.find((r) => r.id === emFoco);

  return (
    <div className="marcas" aria-label="Indústrias representadas">
      <p className="marcas__titulo">
        <span>Onze indústrias representadas</span>
        {/* a legenda muda com o foco, em vez de existir um rótulo por pastilha —
            é o que mantém a base limpa com 11 marcas */}
        <em aria-live="polite">
          {atual ? atual.fornece || atual.nome : "passe o cursor para conhecer"}
        </em>
      </p>

      <ul className="marcas__lista">
        {representadas.map((r) => {
          const src = arquivoDe(r.id);
          return (
            <li key={r.id}>
              <button
                type="button"
                className={emFoco === r.id ? "is-foco" : undefined}
                onMouseEnter={() => setEmFoco(r.id)}
                onMouseLeave={() => setEmFoco(null)}
                onFocus={() => setEmFoco(r.id)}
                onBlur={() => setEmFoco(null)}
                aria-label={r.fornece ? `${r.nome} — ${r.fornece}` : r.nome}
              >
                {src ? <img src={src} alt="" aria-hidden /> : <span>{r.nome}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
