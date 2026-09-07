# War Game D-20

## Evidência e objetivo

As passagens atuais aplicam máscaras a seções em fluxo; a anterior não permanece
no quadro. Textos inferiores herdam o progresso do topo da seção e podem concluir
fora da tela. A abertura revela o lado do texto antes do retrato e possui dois
caminhos concorrentes para remover a camada.

Objetivo: provar dois contratos reutilizáveis — painel sobre quadro retido e
abertura que entrega um elemento concreto do hero.

## Caminho crítico

1. Congelar estado atual e critérios — concluído.
2. Implementar pilotos sem tocar nos demais capítulos — autorizado.
3. Testar build, portão, 1440/375, ida/volta e movimento reduzido.
4. Corrigir apenas falha essencial, com orçamento total de duas tentativas.
5. Gate humano para propagar a linguagem aos capítulos 02→03, 03→04 e fecho.

## Simulação

**Otimista:** o sticky conserva o último quadro, o painel assume a tela e então a
prancha inicia. **Pessimista:** a altura de “A casa” excede a viewport e o pin
corta conteúdo. A contra-ação é limitar o estágio ao desktop e manter a leitura
normal no mobile; se ainda cortar, reverter o pin, não calibrar offsets em loop.

Na abertura, o cenário pessimista é a máscara revelar o retrato mas esconder a
manchete por tempo demais. A contra-ação é atrasar somente o evento de entrada do
hero, sem criar outro estado visual. Se houver salto no fim, a remoção deve ser
derivada da transição de 900 ms.

Saída: capturas sequenciais mostram os três momentos de cada piloto; zero erro,
overflow e alvo pequeno. Aborto: conteúdo inacessível ou segunda tentativa sem
resolver o mesmo defeito.

