# Teorema Concursos — site institucional

Site estático da plataforma de preparação para o **Teste ANPAD** e concursos públicos.
HTML + CSS + JS puros: sem build, sem bundler, sem framework, sem `node_modules`.
Abra `index.html` no navegador e funciona.

## Estrutura

```
index.html                            Página principal
anpad.html                            Trilha 01 — Teste ANPAD
bndes.html                            Trilha 02 — BNDES
nivel-superior.html                   Trilha 03 — Concursos de Nível Superior
administracao.html                    Trilha 04 — Área de Administração (hub das duas rotas)
administracao-tecnicos.html           Rota 4.1 — cargos técnicos
administracao-nivel-superior.html     Rota 4.2 — cargos de nível superior
assets/
  styles.css                          Todo o CSS (design system em custom properties no :root)
  app.js                              Todo o JS (menu, dropdown, revelação, quiz, vídeo, ano)
  favicon.svg                         Marca
```

Regras que o projeto segue e que convém manter:

- Nenhum `<style>` ou `<script>` inline, nenhum `style="…"` em elemento. Todo estilo vive em `assets/styles.css`.
- Caminhos sempre relativos (`assets/…`).
- Fontes vêm do Google Fonts (Fraunces, Inter, JetBrains Mono); tudo o mais é local.
- Cada região tem uma classe própria; tokens de cor, tipografia, raio e espaçamento estão no `:root`.

## Design system

Linguagem visual de **prova matemática**: malha técnica de fundo, linhas de construção,
numeração de axiomas, marcas de canto nos cartões e o quadrado de Q.E.D. como fecho.

| Token | Valor | Uso |
|---|---|---|
| `--ink-900` | `#060B14` | Fundo padrão |
| `--paper` | `#F6F3EC` | Faixas claras (`.paper`), papel milimetrado |
| `--amber` | `#F5A524` | Acento único: números, grifos, CTA primário |
| `--mint` | `#6FD3A8` | Estados positivos (acerto, compromisso, edital aberto) |
| `--rose` | `#E4736B` | Erro e preço riscado |

Tipografia: **Fraunces** (títulos), **Inter** (texto), **JetBrains Mono** (rótulos, números, códigos).

## Conteúdo já parametrizado

Os dados abaixo estão escritos direto no HTML e são os primeiros candidatos a virar tabela no banco:

| Bloco | Onde aparece | Observação |
|---|---|---|
| Preço do pacote | todas as páginas, `#planos` | 12 × R$ 389,90 riscado → **12 × R$ 119,90**, 6 meses |
| Conteúdo programático | `.proof-rows` no hero de cada trilha | tópico + número de aulas |
| Notícias e quadro de editais | `index.html`, `#noticias` | 5 notícias + 5 editais |
| Amostra de ebook | cada trilha | capa + sumário, com capítulos marcados "amostra grátis" |
| 5 questões inéditas | cada trilha, `#questoes` | enunciado, 5 alternativas, gabarito e comentário |
| FAQ | todas as páginas, `#duvidas` | `<details>` nativo |

## Pontos de integração para a próxima fase (Supabase)

Nada hoje faz requisição de rede. Os ganchos previstos:

- **Questões** — cada item é `<article class="q" data-q>`; a alternativa correta carrega
  `data-correct="true"` e o comentário fica em `.q-feedback[hidden]`. O bloco em
  `assets/app.js` que trata `[data-quiz]` já calcula o placar; basta trocar a origem do markup
  por dados vindos do banco e registrar a resposta do usuário.
- **Autenticação** — os botões `Entrar` (header) e `Quero começar` apontam hoje para `#planos`.
  São os dois pontos a religar para login e checkout.
- **Vídeo de apresentação** — `<button class="video" data-video>` é um placeholder; o handler em
  `app.js` apenas troca o texto de `[data-video-note]`. Substituir pelo player real.
- **Notícias** — a lista `.news` e o `.board` (quadro de editais) são estáticos e devem virar
  consulta ao banco quando houver CMS.
- **Download da amostra de ebook** e **assinatura do pacote** — botões sem destino em `#planos`.

## Verificações feitas

- HTML validado (aninhamento correto nas 7 páginas), zero estilo ou script inline.
- Sem overflow horizontal a 365 px de viewport em nenhuma página.
- Interações testadas em navegador: quiz (acerto, erro, trava após resposta, placar),
  menu mobile, dropdown de Administração, fechamento por `Esc`, ano do rodapé, placeholder de vídeo.
- Todos os links internos e âncoras resolvem.
