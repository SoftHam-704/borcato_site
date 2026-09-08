# War Game D-21

## Triagem

Método completo aplicável. Embora o site esteja quase pronto, há risco comercial e
reputacional, várias versões anteriores e histórico de tentativas que corrigiram
medidas locais sem reverter a percepção. Esta rodada planeja e audita; não implementa.

## Contexto real

- Projeto: H.M. Borçato Representações.
- Público de negócio: indústrias e distribuidores de autopeças em Minas Gerais.
- Público de avaliação: cliente, potenciais compradores e eventualmente júri do
  Awwwards.
- Estado observado: build saudável, forte direção visual, narrativa longa, capítulo
  de marcas dominante, falhas de navegação/mobile e transições sem conclusão clara.
- Restrição central: fatos e números não podem ser inventados; onze representadas são
  lista fechada.

## Objetivo

Recuperar confiança do cliente com uma versão mais curta, clara e demonstrável, sem
descartar os ativos fortes e sem abrir nova rodada de motion no site inteiro.

## Caminho crítico

### Fase 1 — congelar e alinhar a rejeição

**Faz:** congela novas animações, apresenta a auditoria e obtém D-21 e respostas
I-21 a I-25. **Não faz:** editar código.

**Otimista:** Fábio rejeita principalmente duração e transições. **Pessimista:** ele
rejeita também a linguagem visual e o posicionamento.

**Ação → reação → contra-ação:** mostrar gravação curta e cinco perguntas → feedback
genérico (“não gostei”) → pedir que ele marque três instantes e escolha o objetivo
comercial prioritário.

**Falha/sinal:** começar implementação sem causa confirmada. **Detecção:** ledger sem
resposta. **Recuperação:** parar. **Saída:** D-21 aprovada e objetivo registrado.
**Orçamento:** uma reunião. **Dono:** dono + Fábio. **Evidência:** ledger assinado.

### Fase 2 — piloto de edição estrutural

**Faz:** P-21A e P-21B. **Não faz:** mapa, fecho, SEO ou troca ampla de copy.

**Otimista:** o corte reduz 35% do capítulo sem perda de representação. **Pessimista:**
o cliente entende a redução das peças como redução do portfólio.

**Ação → reação → contra-ação:** mostrar todas as marcas uma vez e amostrar categorias
→ cobrança pelas onze peças → oferecer exploração opcional fora do fluxo principal.

**Falhas:** âncora chega no meio; marca ausente; vazio persiste; mobile sem gesto claro.
**Detecção:** gates S-01 a S-08. **Recuperação:** reverter piloto e corrigir a spec, não
propagar exceções. **Saída:** comparação aprovada. **Aborto:** duas tentativas sem
reduzir comprimento e melhorar o primeiro quadro. **Dono:** executor. **Evidência:**
tiras e medidas.

### Fase 3 — piloto de costuras

**Faz:** P-21C e define a gramática das demais passagens. **Não faz:** sete efeitos
independentes.

**Otimista:** três transições bastam para a assinatura do site. **Pessimista:** a
arquitetura de scroll atual consome a janela do mapa e exige reescrita.

**Ação → reação → contra-ação:** peça entrega mapa inteiro → rota perde janela → separar
progresso de entrada e progresso de viagem com marcadores de layout explícitos.

**Falha/sinal:** mapa cortado, rota regressiva, quadro vazio. **Detecção:** ida/volta
quadro a quadro. **Recuperação:** corte editorial deliberado. **Saída:** S-06 e S-07.
**Aborto:** duas tentativas. **Dono:** executor. **Evidência:** valores e vídeo.

### Fase 4 — fechamento comercial e técnico

**Faz:** copy aprovada, CTA final, SVGs, SEO social, acessibilidade, lint e matriz
responsiva. **Não faz:** novos fatos ou provas artificiais.

**Otimista:** ativos chegam e o cliente reconhece a voz. **Pessimista:** faltam logos e
provas autênticas.

**Ação → reação → contra-ação:** solicitar pacote mínimo → atraso → limitar escala e
adiar a inscrição, sem publicar material borrado.

**Falha/sinal:** lint vermelho, CTA encoberto, promessa sem aprovação. **Detecção:**
S-09 a S-12. **Recuperação:** impedir release. **Saída:** gates técnicos e comerciais.
**Aborto:** qualquer regra dura violada. **Dono:** executor + Fábio. **Evidência:**
check final e aprovação.

## Gate humano

A próxima decisão é D-21. A recomendação é **A — edição estrutural dirigida**. Depois
da aprovação, o executor lê o pacote inteiro, executa somente P-21A e P-21B, atualiza
os registros e para para nova revisão.

Nenhuma implementação começa sem este gate.

