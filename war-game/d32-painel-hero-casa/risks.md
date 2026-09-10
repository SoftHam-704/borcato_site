# Riscos

| Código | Risco | Sinal | Recuperação |
| --- | --- | --- | --- |
| R1 | A Casa aparece antes do final do hero | painel ou texto visível antes da janela | manter `--cap-entra` em zero até o limiar do hero |
| R2 | O painel cobre o hero em movimento reduzido | sobreposição sem animação | limitar margem negativa a `no-preference` |
| R3 | Dois relógios divergem | recorte e conteúdo chegam em tempos diferentes | derivar ambos do progresso existente do hero |
| R4 | A passagem seguinte perde o palco preso | marcas sobe antes da esteira terminar | não transformar o ancestral `passagem-casa-marcas` |
