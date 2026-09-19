[LINK_VÍDEO_PARTE_1](https://www.loom.com/share/e604b96622d64a43a60634649dd051be)

[LINK_VÍDEO_PARTE_2](https://www.loom.com/share/efcd86e30dbd449bbe469a4baa69a080)



```markdown
# 🚀 Tenurima - Landing Page

Esta é a landing page responsiva desenvolvida para o produto **Tenurima**, focada em performance, acessibilidade, semântica e experiência do utilizador (UX/UI).

---

## 🛠️ Como Executar o Projeto

Para rodar este projeto localmente no teu ambiente de desenvolvimento, segue os passos abaixo:

1. **Instalar as dependências:**
   ```bash
   npm i

```

2. **Iniciar o servidor de desenvolvimento:**
```bash
npm run dev

```


3. **página:**
O terminal indicará o endereço local (geralmente `http://localhost:5173` ou similar).

---

## 🎨 Decisões de Design e UX (Onde o Figma era Omisso)

Como o protótipo no Figma apresentava um layout estático, tomei a iniciativa de implementar microinterações, animações e estados visuais para enriquecer a experiência do utilizador:

* **Animações dos Elementos:**
* **Pílulas e Produto:** Adicionadas animações suaves de entrada/flutuação para dar tridimensionalidade e dinamismo às secções principais.
* **Transições do FAQ:** Implementadas animações de abertura/fecho no acordeão para uma navegação fluida.
* **Carrossel de Depoimentos:** Adicionada transição suave com cálculo dinâmico de largura (`scrollBy` / `scrollTo`) para navegação contínua/loop entre cartões.


* **Estados de Hover e Interatividade:**
* **Botões de Ação (CTA):** Adicionados efeitos visuais no *hover* e *active* para um feedback claro de clique.
* **Navlinks do Header:** Efeitos de transição nos links de navegação no header para indicar o foco/seleção.


* **Animações no Geral:** Integração de transições suaves (`ease-in-out`) em múltiplos pontos da interface para evitar mudanças bruscas de estado.

---

## 💡 Boas Práticas, Performance e Acessibilidade

O código foi construído do zero seguindo os padrões modernos da web:

* **Otimização com `loading="lazy"`:**
Definido nas imagens fora da dobra inicial (*fold*). O atributo `loading="lazy"` instrui o navegador a adiar o carregamento dessas imagens até que o utilizador navegue para perto delas na página. Isto reduz drasticamente o tempo de carregamento inicial, o consumo de dados e melhora as métricas de *Core Web Vitals*.
* **HTML Semântico:** Utilização rigorosa de tags semânticas (`<header>`, `<section>`, `<article>`, `<main>`, `<footer>`, `<blockquote`, `<cite>`) para garantir a correta hierarquia e estrutura do documento.
* **Acessibilidade (A11y):**
* **O atributo `aria-hidden="true"`:** Aplicado em ícones e imagens meramente decorativas para as esconder da árvore de acessibilidade. Desta forma, leitores de ecrã ignoram esses elementos, evitando poluição sonora para utilizadores que dependem de tecnologias assistivas.
* **Textos Alternativos (`alt`):** Todas as imagens relevantes possuem descrições claras através do atributo `alt`.


* **Arquitetura SCSS & Responsividade:**
* **Variáveis SCSS:** Centralização do sistema de design (cores, fontes) em variáveis para facilitar alterações globais e manutenção do código.
* **Mixins:** Utilizados para reaproveitamento de código e padronização dos pontos de quebra (*breakpoints*).
* **Media Queries Fluida:** Layout totalmente responsivo ajustado para smartphones, tablets, desktops e ecrãs ultra-wide.



---

## 🔮 O Que Faria Diferente com Mais Tempo

Caso dispusesse de mais tempo para o desenvolvimento deste projeto, focaria nos seguintes aspetos:

1. **Efeitos Visuais e Interatividade Completa:**
   * Aplicação de estados de *hover*, *focus* e *active* padronizados em **todos** os botões e links de navegação do site.
   * Implementação de mais animações e recursos interativos (como *scroll reveal* e microinterações no carregamento de componentes) para tornar a experiência visual ainda mais rica.

2. **Refatoração Avançada de Layout:**
   * **CSS Grid / Subgrid:** Aprofundar o alinhamento das grelhas nas secções mais complexas para garantir suporte nativo em casos extremos de variação de tamanho de texto e resoluções específicas.
   * **Sintonia Fina com o Figma:** Mapear e abstrair com antecedência todas as variações de breakpoint (como a transição da estrutura vertical do card no mobile para horizontal de 584px no desktop) diretamente nas variáveis e mixins SCSS.

3. **Otimização de Mídia e Performance:**
   * Converter e servir todas as imagens em formatos de próxima geração (WebP/AVIF).
   
4. **Organização e Gestão de Tempo no Desenvolvimento:**
   * Adotar uma abordagem *Mobile-First* mais rigorosa desde o minuto zero para evitar refatorações de CSS na transição para o desktop.
   * Criar um *checklist* prévio de escopo de interatividade e estados de interface para priorizar tarefas críticas antes da entrega final.
