# Especificação fechada

- `CortinaMarcas` renderiza rótulo, manchete curta e linha de apoio dentro de
  `.cortina-marcas__conteudo`.
- O teaser usa `--sobe` para `opacity` e `translate`; não cria estado novo em React.
- A cortina continua fixa, decorativa e oculta em telas <=900 px e em reduced-motion.
- O texto principal de Marcas permanece no capítulo original e assume após o recuo.
- Aceite visual: no auge da cobertura, o painel contém texto legível; no recuo,
  não há salto nem colisão entre os dois cabeçalhos.
