import { useEffect, useRef } from "react";

import fabioEscuro from "@/assets/site/fabio-escuro.jpg";
import { empresa } from "@/lib/dados";
import { som } from "@/lib/som";

/**
 * O fecho tem seu próprio relógio porque a homenagem precisa existir antes da
 * pessoa entrar. O JS só escreve progresso; o CSS decide a composição de cada
 * camada e reproduz a sequência quando o visitante volta.
 */
export function FechoFabio() {
  const ref = useRef<HTMLDivElement>(null);

  const aoMoverLink = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const dx = Math.max(-6, Math.min(6, (e.clientX - (r.left + r.width / 2)) * 0.14));
    const dy = Math.max(-4, Math.min(4, (e.clientY - (r.top + r.height / 2)) * 0.22));
    el.style.setProperty("--link-ima-x", `${dx.toFixed(1)}px`);
    el.style.setProperty("--link-ima-y", `${dy.toFixed(1)}px`);
  };

  const aoSairLink = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--link-ima-x", "0px");
    el.style.setProperty("--link-ima-y", "0px");
  };

  const baixarVCard = () => {
    som.clique();
    const telCel = empresa.celular.rotulo.replace(/\D/g, "");
    const telFixo = empresa.telefone.rotulo.replace(/\D/g, "");
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Borçato;Fábio;;;",
      "FN:Fábio Borçato",
      "ORG:H.M. Borçato Representação Comercial e Marketing",
      "TITLE:Diretor Executivo",
      `TEL;TYPE=CELL,VOICE:+55${telCel}`,
      `TEL;TYPE=WORK,VOICE:+55${telFixo}`,
      `EMAIL;TYPE=WORK,INTERNET:${empresa.email}`,
      "ADR;TYPE=WORK:;;Belo Horizonte;MG;;Brasil",
      "URL:https://hmborcato.com.br",
      "NOTE:Representação de 11 indústrias de autopeças pesadas em Minas Gerais",
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Fabio-Borcato-HMBorcato.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const msgWhatsApp = encodeURIComponent(
    "Olá Fábio, visitei o site da H.M. Borçato e gostaria de falar sobre as indústrias representadas em Minas Gerais.",
  );
  const urlWhatsAppDireto = `${empresa.celular.href}?text=${msgWhatsApp}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const capNome = el.closest<HTMLElement>(".cap--nome");
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pedido = 0;
    let ultimoT = "";

    const medir = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        if (reduzido.matches) {
          if (ultimoT !== "1") {
            ultimoT = "1";
            el.style.setProperty("--fecho-t", "1");
            capNome?.style.setProperty("--fecho-t", "0");
          }
          return;
        }
        const r = el.getBoundingClientRect();
        // A cena começa quando seu topo está no rodapé e termina quando o
        // painel ocupa a viewport; ao voltar, a mesma faixa reproduz o gesto.
        const t = Math.min(1, Math.max(0, (window.innerHeight - r.top) / window.innerHeight));
        const tStr = t.toFixed(4);
        if (tStr !== ultimoT) {
          ultimoT = tStr;
          el.style.setProperty("--fecho-t", tStr);
          capNome?.style.setProperty("--fecho-t", tStr);
        }
      });
    };

    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    reduzido.addEventListener("change", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
      reduzido.removeEventListener("change", medir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div className="fecho" ref={ref}>
      <div className="fecho__retrato">
        <img src={fabioEscuro} alt="Fábio Borçato" loading="lazy" decoding="async" />
        <span aria-hidden>H.M. BORÇATO</span>
      </div>
      <div className="fecho__conteudo">
        <div className="fecho__selo" aria-hidden>
          <span className="fecho__selo-brasao">HB</span>
          <span className="fecho__selo-meta">
            <b>FÁBIO BORÇATO</b>
            <small>DIRETORIA · COMPROMISSO DIRETO</small>
          </span>
        </div>

        <div className="fecho__acoes-executivas">
          <button
            type="button"
            className="fecho__btn-vcard"
            onClick={baixarVCard}
            onPointerEnter={() => som.tique()}
            aria-label="Salvar contato de Fábio Borçato na agenda do telefone (.vcf)"
          >
            <i aria-hidden>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </i>
            <span>Salvar Contato na Agenda</span>
          </button>
          <a
            href={urlWhatsAppDireto}
            target="_blank"
            rel="noopener noreferrer"
            className="fecho__btn-whats"
            onPointerEnter={() => som.tique()}
            onClick={() => som.clique()}
            aria-label="Iniciar conversa direta no WhatsApp com Fábio Borçato"
          >
            <i aria-hidden>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </i>
            <span>WhatsApp com o Diretor</span>
          </a>
        </div>

        <p className="fecho__chamada">Fale com quem roda a estrada.</p>
        <ul className="fecho__vias">
          <li>
            <a
              href={empresa.celular.href}
              onPointerMove={aoMoverLink}
              onPointerLeave={aoSairLink}
              onPointerEnter={() => som.tique()}
              onClick={() => som.clique()}
            >
              {empresa.celular.rotulo}
            </a>
            <span>Celular · WhatsApp</span>
          </li>
          <li>
            <a
              href={empresa.telefone.href}
              onPointerMove={aoMoverLink}
              onPointerLeave={aoSairLink}
              onPointerEnter={() => som.tique()}
              onClick={() => som.clique()}
            >
              {empresa.telefone.rotulo}
            </a>
            <span>Escritório · {empresa.base}</span>
          </li>
          <li>
            <a
              href={`mailto:${empresa.email}`}
              onPointerMove={aoMoverLink}
              onPointerLeave={aoSairLink}
              onPointerEnter={() => som.tique()}
              onClick={() => som.clique()}
            >
              {empresa.email}
            </a>
            <span>E-mail</span>
          </li>
        </ul>
        {/* duas linhas em bloco: em uma só, "MARKETING" descia sozinho */}
        <p className="fecho__assinatura">
          <span>{empresa.nome}</span>
          <span>{empresa.descritor}</span>
        </p>
      </div>
    </div>
  );
}
