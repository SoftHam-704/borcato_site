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

      {/* CARROSSEL: as onze marcas correm devagar, sem parar, e param no hover.
          Pedido do dono. Sao quatro copias da lista num trilho que anda um quarto
          do proprio comprimento: quando a animacao reinicia, a copia 2 esta
          exatamente onde a 1 comecou — e o loop nao tem emenda.
          Quatro copias, e nao duas, porque a lista (~900px) e mais estreita que
          o container em 1440 (~1230px): com duas copias apareceria um buraco.
          So a primeira copia e acessivel; as outras sao decoracao. */}
      <div className="marcas__trilho">
        {[0, 1, 2, 3].map((copia) => (
          <ul
            className="marcas__lista"
            key={copia}
            aria-hidden={copia > 0 || undefined}
          >
            {representadas.map((r) => {
              const src = arquivoDe(r.id);
              return (
                <li key={`${copia}-${r.id}`}>
                  <button
                    type="button"
                    className={emFoco === r.id ? "is-foco" : undefined}
                    tabIndex={copia > 0 ? -1 : undefined}
                    onMouseEnter={() => setEmFoco(r.id)}
                    onMouseLeave={() => setEmFoco(null)}
                    onFocus={() => setEmFoco(r.id)}
                    onBlur={() => setEmFoco(null)}
                    aria-label={copia > 0 ? undefined : r.fornece ? `${r.nome} — ${r.fornece}` : r.nome}
                  >
                    {src ? <img src={src} alt="" aria-hidden /> : <span>{r.nome}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
