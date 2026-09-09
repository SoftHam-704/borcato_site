# Coleta de portais oficiais

`scrapling_portais.py` usa o Scrapling para criar um inventário público dos
portais das 11 indústrias. O resultado fica em `pesquisa/portais-oficiais.json`.

`qualificar_logos.py` mede tipo e resolução dos candidatos e grava
`pesquisa/qualidade-candidatos-logo.json`. A avaliação é técnica: um SVG ou um
PNG grande ainda precisa ser confirmado pela indústria como logo autorizado.

Ele serve para localizar referências e candidatos de logo para validação. A
origem oficial continua sendo o arquivo vetorial fornecido por cada indústria;
nada coletado aqui deve substituir esse ativo ou ser publicado automaticamente.
