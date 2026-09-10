# F1 — Auditoria observada

Data: 10/09/2026. URL local: `http://127.0.0.1:5188/`.

## Veredito

O site tem três cenas apresentáveis: Hero assentado, mapa no meio da rota e fecho com
Fábio frontal. Não está apresentável como percurso completo porque duas transições
produzem defeitos visíveis e a seção de Marcas ainda funciona como três demonstrações
consecutivas do mesmo argumento.

## Achados por severidade

### P0 — bloqueiam apresentação

1. **Abertura mobile:** a máscara lateral desktop vira uma abertura vertical estreita;
   preloader, Hero, retrato e CTA coexistem cortados.
2. **Estrada → O Nome:** uma faixa preta larga aparece entre os capítulos. O CSS já
   contém um comentário dizendo que ela teria sido corrigida, mas a captura atual
   refuta o comentário.

### P1 — derrubam percepção de acabamento

3. **Casa → Marcas:** a cortina agora tem texto, porém é uma segunda introdução
   decorativa. A seção real chega depois e repete a mensagem.
4. **Marcas:** introdução, prancha e peças ocupam 3.675 px no viewport auditado; a
   duração excede a quantidade de argumento.
5. **Navegação:** marcadores e rótulos atravessam costuras e podem sugerir dois
   capítulos ativos.
6. **O Nome:** a primeira mensagem tem contraste baixo e entra tarde; o fecho posterior
   é melhor resolvido que a abertura do capítulo.

### P2 — podem esperar a recuperação visual

7. Logos raster não suportam a escala atual. O dono já está buscando SVGs oficiais.
8. Débito de lint/format e metadados sociais não explica os defeitos atuais, mas deve
   ser fechado antes da publicação.

## Causa sistêmica

Não falta quantidade de efeitos. Falta propriedade da cena. Em alguns pontos, a
superfície é um pseudo-elemento, a mensagem está numa cortina `aria-hidden`, a posição
vem do fluxo normal e o progresso é calculado por outro elemento. Cada parte funciona
isoladamente, mas ninguém garante o quadro completo.

O reparo precisa reduzir mecanismos: superfície, progresso e conteúdo real devem
pertencer à mesma passagem.

## Base técnica

- Build de produção: aprovado.
- TypeScript: aprovado.
- Overflow horizontal no fim de 1280 px: 0.
- Altura observada: 8.918 px em 1280 × 720.
- Fecho: preservável.
- Diretório `ferramentas/vistoria/`: não tocar nem versionar.

