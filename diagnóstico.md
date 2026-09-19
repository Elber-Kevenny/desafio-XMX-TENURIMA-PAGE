## Erro 1: Desalinhamento, Esticamento Dinâmico e Estouro de Conteúdo nos Cards de Depoimento

### 1. O que está errado

- **Em telas menores (até 900px):** Os cards de depoimento não mantêm uma altura padronizada. Depoimentos mais longos esticam o card verticalmente, enquanto depoimentos curtos os deixam menores, quebrando a harmonia visual do grid/carrossel.(_PRINT 1_)
- **Em telas maiores (Desktop, após exceder a media query de 900px):** O comportamento das imagens eram desproporcionais, as imagens não encolhem para acomodar o texto, além disso, o excesso de texto no último card (_Richard_) fazem com que o conteúdo do depoimento estoure os limites do card, além de achatar ou esticar a imagem.(_PRINT 2_)

---

### 2. Onde está

- **Na página:** Na seção de depoimentos (`.testemonials`), afetando todos os cards (`.testemonial-card`), com destaque crítico para o último card do cliente _Richard_.
- **No código HTML:** Na estrutura dos cards e do container de conteúdo:

```html
<div class="testemonial-card"></div>
```

---

### 3. Por que acontece

1. **Uso de `height: auto` no Mobile:** A instrução `height: auto` força o navegador a calcular a altura do card com base na quantidade de conteúdo interno. Como a extensão dos textos varia de cliente para cliente, cada card assume uma altura diferente.
2. **Falta de Restrição e Proporção na Imagem (Desktop):** A imagem tem uma largura fixa, quando a página encolhe a imagem permanece estática, não acompanhando a proporção da tela, logo, a div que envolve o titulo e paragráfo encolhe.
3. **Ausência de Trativa para Exceções de Texto (Outlier):** O depoimento do _Richard_ possui um volume de texto significativamente maior, logo, o texto estoura a área útil do card.

---

### 4. Como eu corrigiria

A abordagem de solução exigirá:

1. Definir uma altura fixa de `700px` para os cards na media query de `900px` (sendo `380px` para a imagem e `320px` para o `.content`).
2. Ajustar as propriedades da imagem no desktop (`width: 40%`, `max-width: 250px`, `flex: 0 0 40%`, `object-fit: cover`) para que a imagem encolha proporcionalmente junto ao div que envolve o h3 e o parágrafo, ademais reajustá-la criando uma `@media(max-width: 900px)` com `height: 380px` e `flex: 0 0 236px` para que no mobile a imagem mantenha sua proporção.
3. Criar uma classe modificadora no HTML especificamente para o card do _Richard_ (_PRINT 3_), permitindo alterar o tamanho da fonte do `h3` e do parágrafo no desktop, mantendo uma media query para preservar os estilos originais em dispositivos móveis.

---

### 5. Gravidade

**Médio.** O erro compromete diretamente a interface do usuário (UI) e a experiência de leitura (UX), quebrando o alinhamento visual e causando o vazamento de informações essenciais da página.

## Erro 2: Transbordamento de Layout e Rolagem Horizontal na Seção de Kits no Mobile

### 1. O que está errado

Em dispositivos móveis (telas a partir de 360px de largura), a seção de venda de kits (`.area-kits`) estoura os limites da tela do usuário. Isso faz com que apareça uma barra de rolagem horizontal indesejada na página e corta visualmente parte das laterais dos cards de produtos à venda.

---

### 2. Onde está

- **Na página:** Na seção de compra de kits ("Order Your Alpha Rock"), visível ao inspecionar o container e observar a margem/extensão do elemento ultrapassando a viewport em 10%.
- **No código HTML:** No elemento pai que envolve os kits:

```html
<section class="area-kits pd" id="kits">
  <div class="container center-flex">
    <h2 class="title lora">Order Your Alpha Rock</h2>
    <p>Select the package that fits your goals and save more:</p>
    <ul class="z10">
      <li class="kit-option k1">...</li>
      <li class="kit-option best-option">...</li>
      <li class="kit-option k3">...</li>
    </ul>
  </div>
</section>
```

- **No código CSS:** Na regra de estilo aplicada à classe `.container` ou `.container.center-flex`:

```css
@media (max-width: 900px) {
  .area-kits .container {
    width: 110%;
    max-width: 1000px;
  }
}
```

---

### 3. Por que acontece

A causa raiz do erro é a definição da propriedade `width: 110%` no container principal (`.container.center-flex`).

Como os cards de produtos (listados na tag `<ul>`) são elementos filhos e herdam/acompanham o tamanho do container pai, a largura total da seção passa a ser 10% maior do que a própria largura útil da tela (`100vw`). Isso força a viewport do navegador a criar um scroll horizontal para conseguir exibir todo o conteúdo que sobrou fora da área visível.

---

### 4. Como eu corrigiria

A abordagem de solução exigirá:

1. Localizar a regra da classe `.container` / `.container.center-flex` na folha de estilos.
2. Alterar a propriedade de largura de `width: 110%` para `width: 100%` (ou `max-width: 100%`), garantindo que o container e os cards contidos nele respeitem rigorosamente o limite da tela do dispositivo sem gerar transbordamento lateral.

---

### 5. Gravidade

**Crítico.** A presença de rolagem lateral não planejada (_horizontal overflow_) quebra a usabilidade em dispositivos móveis, prejudica severamente a experiência do usuário (UX) e interfere na conversão de vendas, além de ser uma falha grave nos critérios de responsividade.

## Erro 3: Ausência de Contraste e Invisibilidade do Texto na Seção "Sobre"

### 1. O que está errado

Na seção "Sobre" (`#about`) (_PRINT 4_), o texto dos dois parágrafos descritivos do produto fica completamente invisível para o usuário. Como a cor da fonte é idêntica à cor do plano de fundo da seção, o conteúdo não apresenta nenhum contraste visual, parecendo um espaço em branco no layout da página.

---

### 2. Onde está

- **Na página:** Na seção institucional "WHY ALPHA ROCK" (`<div class="content">` dentro da seção com id `#about`).
- **No código HTML:** Nos elementos `<p>` contidos na estrutura:

```html
<div class="content">
  <span class="headline">WHY ALPHA ROCK</span>
  <h1>Built for Men Who Demand More From Themselves</h1>
  <p>
    Most supplements promise everything and deliver nothing. Alpha Rock was
    designed differently — with a precise combination of vitamins, adaptogens,
    and botanical extracts backed by centuries of traditional use.
  </p>
  <p>
    Every capsule works with your body's own chemistry to promote energy,
    desire, and endurance from the inside out. No synthetic stimulants. No
    fillers. Just a clean formula manufactured under strict GMP standards that
    you can take with confidence, day after day.
  </p>
  <a href="#kits" class="btn" id="btn-about">order now</a>
</div>
```

- **No código CSS:** Na regra de estilo aplicada ao seletor `.sobre .container .content p `, onde a propriedade `color` está configurada com o mesmo valor hex/RGB do `background-color`.

---

### 3. Por que acontece

A causa raiz do problema é a atribuição de uma cor de texto (`color`) idêntica à cor de fundo (`background-color`) do container.

A falta de abstração das cores do projeto através de variáveis CSS faz com que ajustes de tema precisem ser feitos manualmente em cada seletor. Sem uma variável global as cores dos textos ou sem o uso da propriedade `inherit` para herdar a cor padrão herdável do elemento pai, alterações manuais das coreas acabam reduzindo a produtividade.

---

### 4. Como eu corrigiria

A abordagem de solução exigirá:

1. **Opção com Variável CSS (Recomendada):** Criar/utilizar uma variável (por exemplo `--text-white: #ffffff` ou `--text-primary`) e aplicá-la à propriedade `color` dos parágrafos. Isso centraliza a manutenção, permitindo que futuras alterações de cor no tema do site sejam feitas em um único ponto, sem a necessidade de alterar o código de parágrafo em parágrafo.
2. **Opção com Herança (`inherit`):** Definir `color: inherit` na regra dos parágrafos para que eles herdem automaticamente a cor legível declarada no container pai ou no título principal.

---

### 5. Gravidade

**Crítico.** A falha oculta complementa a proposta de valor do produto e as informações institucionais vitais para a conversão do usuário, além de violar diretamente as diretrizes fundamentais de acessibilidade (WCAG) relativas ao contraste mínimo de texto.

## Erro 4: Deformação e Achatamento da Seta nos Itens de FAQ

### 1. O que está errado

Nos itens da seção de Perguntas Frequentes (FAQ) para telas de 360px de largura, a seta indicadora de expansão (gerada via pseudo-elemento `::after`) aparece espremida, achatada ou visivelmente deformada quando o texto da pergunta ocupa um espaço horizontal maior na tela. (_PRINT 5_)

---

### 2. Onde está

- **Na página:** Na lista de sanfonas/accordion da seção de FAQ, especificamente no cabeçalho dos itens (`.item .header`).
- **No código HTML:** Na estrutura dos blocos de pergunta:

```html
<div class="item">
  <div class="header">
    <p>How does Alpha Rock compare to similar supplements?</p>
  </div>
  <div class="body">
    <p>
      Many male supplements rely on aggressive stimulants. Alpha Rock is
      different — it was formulated to provide
      <b>consistent, daily support</b> using essential nutrients and plant
      extracts without unnecessary overstimulation.
    </p>
  </div>
</div>
```

- **No código CSS:** Na regra aplicada ao pseudo-elemento `.item .header::after` que controla o ícone de seta.

---

### 3. Por que acontece

A causa raiz do problema é o comportamento padrão do layout **Flexbox** configurado no elemento pai `.header`.

O pseudo-elemento `::after` (a seta) está inserido diretamente no fluxo flex do container sem uma largura mínima ou trava de encolhimento. Quando o texto da pergunta (`<p>`) é longo, o algoritmo do Flexbox distribui o espaço e tenta encolher os elementos irmãos para fazer o conteúdo caber na mesma linha. Como a seta não possui a propriedade `flex-shrink: 0`, ela é comprimida lateralmente pelo texto, gerando a deformação visual.

Evidência em formato `diff` do código atual:

```diff
.faq .item .header::after {
    content: "";
    width: 32px;
    height: 32px;
    background: IMAGEM
    background-size: contain;
+    /* CORREÇÃO DO ACHATAMENTO */
+    flex-shrink: 0;
+    min-width: 32px;
+    display: inline-block;
    transition: all .4s ease
}
```

---

### 4. Como eu corrigiria

A abordagem de solução exigirá:

1. Adicionar a propriedade `flex-shrink: 0` na regra do pseudo-elemento `.item .header::after`.
2. Garantir dimensões mínimas (`min-width: 32px`) no `::after` para impedir que o algoritmo Flexbox altere as proporções da seta, independentemente do tamanho do texto da pergunta ao lado.

---

### 5. Gravidade

**Baixo.** Trata-se de uma falha puramente estética na interface do usuário (UI) que não impede a leitura do texto nem quebra a funcionalidade do FAQ, porém compromete o acabamento do design e o alinhamento dos componentes visuais.

## Erro 5: Inconsistência de Precificação e Falhas de Layout no Kit "Best Option"

### 1. O que está errado

- **Inconsistência de Regra de Negócio/Precificação:** No kit de 6 frascos (`.kit-option.best-option`), o valor unitário exibido é de **$49 / bottle**, porém o valor total cobrado aparece como **$150**. O valor matemático correto para o pacote (6 × $49) deveria ser **$294**. (_PRINT 6_)

- **Desalinhamento no Mobile/Tablet (900px):** Em telas com largura de `900px` até aproximadamente `970px` o bloco `.valores` ("TOTAL =") fica desalinhado horizontalmente em relação ao restante do texto do card devido ao tamanho excessivo da fonte (_PRINT 7_).

- **Falta de Padronização de Cores:** O valor final exibido no kit `best-option` utiliza a cor `#5d5d5d`, enquanto os outros kits utilizam a cor `#101010` (ou vice-versa), quebrando a consistência visual da tabela de preços. (_PRINT 8_)

---

### 2. Onde está

- **Na página:** Na seção de compra de kits (`.area-kits`), especificamente no card do meio/destaque (`.kit-option.best-option`).
- **No código HTML:** Na estrutura do container `.valores`:

```html
<li class="kit-option best-option">
  ...
  <div class="footer">
    <div class="price"><strong>$49</strong> / bottle</div>
    ...
    <div class="valores">
      <span>Total =</span>
      <s>$1074</s>
      <span>$150</span>
    </div>
  </div>
</li>
```

- **No código CSS:** Na regra de estilo aplicada à classe `.area-kits .container ul a .footer .valores *` e na media query.

---

### 3. Por que acontece

1. **Erro de Digitação/Hardcode no HTML:** O valor final de `$150` foi inserido manualmente de forma incorreta dentro do HTML, divergindo do cálculo unitário de 6 frascos a $49 cada.
2. **Dimensionamento de Fonte Inadequado no Breakpoint:** A fonte do bloco `.valores` para telas acima de 900px ficaria melhor enquadrada com o valor de `font-size: 20px`.
3. **Ausência de Classe Utilitária ou Variável Visual para Preços:** A propriedade `color` do valor final não foi padronizada através de uma classe comum, resultando na aplicação manual de hexadecimais diferentes (`#101010` vs `#5d5d5d`) entre os três cards.

Evidência em formato `diff` no HTML e CSS:

```diff
<!-- HTML com erro de precificação -->
<div class="valores">
  <span>Total =</span>
  <s>$1074</s>
- <span>$150</span>
</div>

/* CSS sem padronização de cor e sem reajuste de fonte no mobile */
- .area-kits .valores {
-     color: #5d5d5d; /* Inconsistente com o padrão #101010 dos demais kits */
- }

```

---

### 4. Como eu corrigiria

A abordagem de solução exigirá:

1. **Correção do HTML:** Alterar o valor exibido da tag `<span>` de `$150` para `$294` para bater com o cálculo matemático do produto.
2. **Ajuste de Tipografia no Breakpoint:** Reduzindo o `font-size` da classe `.area-kits .container ul a .footer .valores *` para `20px` (ou equivalente), reestabelecendo o alinhamento com os demais textos.
3. **Padronização de Cor:** Unificar a propriedade `color` de todos os elementos `.valores` para o tom padrão `#101010` (ou através de uma variável CSS).

---

### 5. Gravidade

**Crítico.** Erros de precificação afetam diretamente a confiabilidade do e-commerce, podendo gerar problemas jurídicos/CDC, abandono de carrinho e prejuízo financeiro. Além disso, as falhas de alinhamento e falta de padrão de cores comprometem a qualidade visual da oferta principal do site.

## Erro 6: Flutuação Visual da Imagem da Seção "Sobre" em Desktops Médios (900px a 1100px)

### 1. O que está errado

Em telas intermediárias de desktop (com largura entre 900px e 1100px), o bloco visual de imagens da seção "Sobre" (`.area-img`) fica "flutuando" preso ao topo do container. Isso deixa um espaço em branco desproporcional logo abaixo da imagem do produto, quebrando o alinhamento de base com a coluna de texto e comprometendo o fluxo visual da seção. (_PRINT 9_)

---

### 2. Onde está

- **Na página:** Na seção institucional "Sobre" (`<div class="sobre pd" id="about">`).
- **No código HTML:** Na relação entre a coluna de texto e o container de imagens dentro da div pai:

```html
<div class="sobre pd" id="about">
  <div class="container">
    <div class="content">
      <span class="headline">WHY ALPHA ROCK</span>
      <h1>Built for Men Who Demand More From Themselves</h1>
      <p>Most supplements promise everything...</p>
      <p>Every capsule works with your body's own chemistry...</p>
      <a href="#kits" class="btn" id="btn-about">order now</a>
    </div>
    <div class="area-img">
      <img
        src="assets/img/sobre-base.png"
        class="base"
        alt="AlphaRock"
        loading="lazy"
      />
      <img
        src="assets/img/sobre-hero-main.png"
        class="main_product sobre-hero-main"
        alt="AlphaRock"
        loading="lazy"
      />
      <img
        src="assets/img/sobre-hero-1.png"
        class="secondary sobre-hero-1"
        alt="AlphaRock"
        loading="lazy"
      />
      <img
        src="assets/img/sobre-hero-2.png"
        class="secondary sobre-hero-2"
        alt="AlphaRock"
        loading="lazy"
      />
    </div>
  </div>
</div>
```

- **No código CSS:** Na regra aplicada ao container Flexbox `.sobre .container`:

```css
/* Código atual gerador do erro */
.sobre .container {
  display: flex;
  align-items: flex-start; /* Alinha os elementos no topo do eixo vertical */
  flex-direction: row-reverse;
  gap: 65px;
}
```

---

### 3. Por que acontece

A causa raiz do problema é a utilização da propriedade `align-items: flex-start` no container com layout Flexbox (`display: flex`).

No fluxo horizontal do Flexbox, a propriedade `align-items` gerencia o alinhamento dos elementos filhos no eixo cruzado (eixo vertical). Ao utilizar `flex-start`, o navegador força tanto a coluna de texto (`.content`) quanto a caixa de imagem (`.area-img`) a se alinharem rigorosamente ao topo. Como a coluna do texto é verticalmente mais alta devido aos dois parágrafos e botão, a `.area-img` permanece "presa" na parte superior do espaço útil, deixando um grande espaço vazio abaixo de si e parecendo desconectada da base da seção.

Evidência em formato `diff`:

```diff
.sobre .container {
    display: flex;
-   align-items: flex-start; /* Causa o deslocamento da imagem para o topo */
+   align-items: flex-end; /* correção */
    flex-direction: row-reverse;
    gap: 65px;
}

```

---

### 4. Como eu corrigiria

A abordagem de solução exigirá:

1. Alterar o alinhamento do eixo vertical do container `.sobre .container` no intervalo de telas aplicável (entre 900px e 1100px).
2. Substituir `align-items: flex-start` por `align-items: flex-end`. Isso forçará a caixa `.area-img` a colar na base/fundo do container `.sobre`, nivelando o final da imagem com o limite inferior da seção, independentemente da altura do texto ao lado.

---

### 5. Gravidade

**Médio.** Trata-se de uma falha de layout responsivo (UI/UX) que prejudica a composição estética e a simetria da marca em monitores de resolução média (como laptops e tablets na horizontal), sem impedir o uso funcional da página.

## Erro 7: Desalinhamento do Botão de Ação e Quebra do Alinhamento do Titulo em Container Grid

### 1. O que está errado

Ao visualizar a caixa de conteúdo da seção "Sobre" (`.content`), o botão de ação "order now" (`#btn-about`) aparece desalinhado em relação ao fluxo vertical dos elementos do container Grid (_PRINT 10_). Ao tentar alinhar o botão centralizando os itens do grid, o título `.headline` ("WHY ALPHA ROCK") passa a ser centralizado indevidamente, quebrando o alinhamento à esquerda esperado para os textos da seção.

---

### 2. Onde está

- **Na página:** Na seção "Sobre" (`#about`), dentro da coluna de conteúdo `<div class="content">`.
- **No código HTML:** Na relação entre o cabeçalho, os parágrafos e o botão de conversão:

```html
<div class="content">
  <span class="headline">WHY ALPHA ROCK</span>
  <h1>Built for Men Who Demand More From Themselves</h1>
  <p>Most supplements promise everything...</p>
  <p>Every capsule works with your body's own chemistry...</p>
  <a href="#kits" class="btn" id="btn-about">order now</a>
</div>
```

---

### 3. Por que acontece

Duas causas encadeadas geram a falha visual:

1. **Comportamento Padrão dos Filhos no CSS Grid:** Quando o container pai `.content` é configurado com `display: grid`, o uso de `justify-items: center` aplica o alinhamento central a **todos** os elementos filhos (incluindo a tag `<span>` da `.headline` e o botão `<a>`).
2. **Largura Indefinida do Elemento Inline/Grid:** Como a classe `.headline` não possuía uma largura explícita (`width`) definida, ela encolheu para o tamanho exato do seu texto ("WHY ALPHA ROCK") e foi empurrada para o centro do grid pelo container pai.
3. **Colapso de Dimensões do Botão:** O botão de chamada para ação (`#btn-about`) encolheu ao centralizar no grid, perdendo a proporção de preenchimento desejada por não possuir a instrução explícita de ocupar 100% da sua trava máxima (`max-width: 400px`).

Evidência em formato `diff` no CSS:

```diff
.sobre .container .content {
    max-width: 488px;
    display: grid;
    position: relative;
    z-index: 10;
    gap: 16px;
+    justify-items: center;

}

.headline {
    color: #e2c677;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
+   width: 100%
}

```

---

### 4. Como eu corrigiria

A abordagem de solução exigirá:

1. **Ajuste no Container Grid:** Aplicar `justify-items: center` no container `.sobre .container .content ` para permitir a centralização padronizada do botão de ação.

2. **Fixação da Largura do Botão:** Definir `width: 100%` combinada com `max-width: 400px` no botão `#btn-about`, garantindo que ele ocupe exatamente o limite máximo de 400px de largura de forma responsiva.

3. **Restauração do Alinhamento do Título:** Definir `width: 100%` na classe `.headline`. Como o elemento passa a ocupar toda a largura útil da linha do grid, o seu texto retorna naturalmente ao alinhamento inicial (à esquerda/start), sem ser afetado pela centralização do grid pai.

---

### 5. Gravidade

**Baixo.** Trata-se de um problema de alinhamento e simetria de componentes (UI), que afeta a precisão visual do layout sem impedir o clique no botão ou o direcionamento do usuário para a seção de compras.

## Bônus 1: Desaparecimento da Imagem Principal do Hero em Dispositivos Móveis (até 420px)

### 1. O que está errado

Em dispositivos móveis com largura de tela de até `420px`, a imagem principal do produto (`.main_product`) desaparece completamente do layout da seção principal (`main`), deixando um espaço em branco ou desalinhando os elementos decorativos ao redor (como pílulas e folhas) (_PRINT 11_).

---

### 2. Onde está

- **Na página:** Na seção principal (Hero) do site, no bloco de destaque do produto (`.area-img`).
- **No código HTML:** Na estrutura que envolve as imagens sobrepostas:

```html
<div class="area-img">
  <img
    src="assets/img/product_main_1.png"
    class="main_product"
    alt="AlphaRock"
    loading="lazy"
  />

  <div class="pills">
    <img
      src="assets/img/pill.png"
      class="pill p1"
      alt="AlphaRock"
      loading="lazy"
    />
    <img
      src="assets/img/pill_2.png"
      class="pill p2"
      alt="AlphaRock"
      loading="lazy"
    />
  </div>

  <img
    src="assets/img/folha1.png"
    loading="lazy"
    alt="AlphaRock"
    class="leaf leaf-1"
  />
  <img
    src="assets/img/folha2.png"
    loading="lazy"
    alt="AlphaRock"
    class="leaf leaf-2"
  />

  <img
    src="assets/img/product_secondary.png"
    class="secondary_product"
    alt="AlphaRock"
    loading="lazy"
  />
</div>
```

- **No código CSS:** Na regra `@media(max-width: 420px)` aplicada ao seletor `main .container .area-img .main_product` e no container pai com a classe `.z10`:

```css
.z10 {
  position: relative;
  z-index: 10;
}

@media (max-width: 420px) {
  main .container .area-img .main_product {
    /* Configurado com position: absolute sem coordenadas definidas */
  }
}
```

---

### 3. Por que acontece

A causa raiz do problema é o uso da propriedade `position: absolute` na imagem `.main_product` dentro de um container pai (`.z10`) que possui `position: relative`, sem a declaração explícita das coordenadas de ancoragem (`top`, `bottom`, `left`, `right`).

Quando um elemento possui posicionamento absoluto em telas muito pequenas sem coordenadas definidas, o navegador tenta calcular sua posição com base no fluxo normal do documento. Como o container colapsa de tamanho na media query de `420px`, a imagem é renderizada fora da área visível (_overflow_) ou colapsa a sua dimensão/z-index, tornando-se invisível para o usuário.

Evidência em formato `diff`:

```diff
@media(max-width: 420px) {
    main .container .area-img .main_product {
-       position: absolute; /* Sem top, left, bottom ou right declarados */
    }
}

```

---

### 4. Como você corrigiria

_(Etapa reservada para a fase de implementação conforme as regras de diagnóstico)._

A abordagem de solução exigirá duas alternativas possíveis:

1. **Remoção do Posicionamento Absoluto (Recomendado):** Remover `position: absolute` no breakpoint de `420px` (definindo `position: static` ou `relative`), fazendo com que a imagem volte ao fluxo normal do layout e ocupe seu espaço real no container.
2. **Definição Explícita de Coordenadas:** Caso seja necessário manter a imagem em camada absoluta, declarar explicitamente o posicionamento (ex: `top: 0; left: 50%; transform: translateX(-50%);`) para garantir que ela permaneça ancorada dentro dos limites visíveis do container pai.

---

### 5. Gravidade

**Crítico.** A imagem principal do produto é o elemento visual mais importante da dobra principal do site (_Above the Fold_). Seu desaparecimento prejudica gravemente a apresentação do produto e o apelo visual de conversão para usuários em dispositivos móveis.

## Bônus 2: Imagens com Largura Fixa e Falha de Responsividade na Página de Contato

### 1. O que está errado

Na página de contato (seção de instruções/passo a passo para envio de e-mail), as imagens demonstrativas das etapas (`etapa2.webp` e `etapa3.webp`) possuem dimensões de largura travadas diretamente ou por falta de regras de adaptação fluida(_PRINT _). Em telas menores, conforme a tela aumenta de largura de `360px até 764px` a imagem não acompanha a largura do grid.

---

### 2. Onde está

- **Na página:** Na página de instruções de contato/suporte, nas etapas 3 ("Fill in the Subject line") e 4 ("In the body of the email").
- **No código HTML:** Nas marcas de imagem inseridas dentro das colunas do CSS Grid (Tailwind CSS):

```html
<div>
  <img
    src="assets/img/etapa2.webp"
    alt="Screenshot showing subject line field"
  />
</div>

<div class="order-2 md:order-1">
  <img src="assets/img/etapa3.webp" alt="Screenshot showing email body" />
</div>
```

---

### 3. Por que acontece

A causa raiz do erro é que as imagens possuem a largura limitada por restrições de max-width, sem a definição de uma largura relacional fluida (width: 100%).

Quando o container da grade (grid-cols-1) se expande ou se ajusta ao layout da tela, a imagem não cresce para acompanhar o container pai, permanecendo menor do que a coluna e quebrando a proporção pretendida para o layout.

### 4. Como eu corrigiria

A abordagem de solução exigirá:

2. **Via CSS Global:** Definir a regra de esticamento fluido no arquivo CSS do projeto:

```css
img,
video {
  width: 100%;
  height: auto;
}
```

---

### 5. Gravidade

**Médio.** Impede o encaixe perfeito das capturas de tela demonstrativas em dispositivos móveis e tablets, prejudicando a estética visual da página de suporte (UI/UX) e a clareza das instruções para o usuário.

## Bônus 3: Rolagem Lateral no Mobile por Transbordamento de Texto Longo e Padding na Lista de Referências

### 1. O que está errado

Em dispositivos móveis (telas a partir de 360px de largura), a lista de referências (`<ul>` ou `<ol>`) causa um estouro de layout horizontal, gerando uma rolagem lateral indesejada na página.(_PRINT 13_)

---

### 2. Onde está

- **Na página:** Na seção de referências científicas/acadêmicas no rodapé da página.
- **No código HTML:** Nos itens de lista (`<li>`) contendo citações com URLs ou DOIs longos e sem quebra de linha manual:

```html
<li>
  Dehghani S, Mehri S, Hosseinzadeh H. The effects of Crataegus pinnatifida
  (Chinese hawthorn) on metabolic syndrome: A review. Iran J Basic Med Sci. 2019
  May;22(5):460-468. doi: 10.22038/IJBMS.2019.31964.7678. PMID: 31217924; PMCID:
  PMC6556496.
</li>
```

- **No código CSS:** Na regra global aplicada aos elementos `ol, ul`:

```css
ol,
ul {
  padding: 0 0 0 40px; /* Recuo à esquerda excessivo em telas de 360px */
  margin-bottom: 40px;
}
```

---

### 3. Por que acontece

Duas causas encadeadas geram o transbordamento horizontal em viewport móvel (360px):

1. **Recuo Lateral Excessivo (`padding-left`):** O espaçamento à esquerda padrão de `40px` consome uma porcentagem significativa do espaço útil da tela de 360px, empurrando o bloco do texto da citação para fora do limite visível.

2. **Textos Contínuos sem Quebra (`overflow` de Strings):** Identificadores como DOIs (`10.22038/IJBMS.2019.31964.7678`) formam palavras contínuas sem espaços. Combinados a um tamanho de fonte elevado (`18px`), a linha excede a largura restante do item de lista se não houver quebra automática ativada.

Evidência em formato `diff` no CSS:

```diff
ol, ul {
-   padding: 0 0 0 40px; /* Consome muito espaço útil no mobile */
+    padding: 0 0 0 30px;
    margin-bottom: 40px;
}

```

---

### 4. Como eu corrigiria

A abordagem de solução exigirá:

1. **Ajuste de Tipografia e Espaçamento Responsivo:** Reduzir o `font-size` dos itens da lista de `18px` para `16px` em telas menores, ajustando o `padding-left` de `40px` para `30px` (ou `20px`) dentro da media query mobile.
2. **Quebra Forçada de Strings Longas:** Adicionar a propriedade `overflow-wrap: break-word` (ou `word-break: break-all`) nos itens de lista `li` para garantir que textos contínuos (como links e DOIs) quebrem de linha sem estourar o container.

---

### 5. Gravidade

**Médio.** A presença de rolagem lateral quebra a fluidez do design responsivo em celulares pequenos, embora afete prioritariamente a seção de rodapé/Scientific References.

## Bônus 4: Inconsistência de Cabeçalho, Rodapé e Cor de Fundo em Páginas Secundárias

### 1. O que está errado

Existe uma quebra grave de padronização estrutural e visual nas páginas institucionais secundárias do site:

- **Falta de Rodapé (Footer):** As páginas `Terms`, `Privacy Policy`, `Contact`, `Disclaimer` e `Reference` não possuem a seção de rodapé renderizada.
- **Cor de Fundo Inconsistente:** A página `Refund` possui o rodapé, porém o seu plano de fundo geral exibe a cor bege/creme (`#fff5e8`) em vez do fundo branco padrão (`#ffffff`) adotado pelas demais páginas.
- **Ausência de Estrutura Global (Header/Footer):** A página `Shipping` encontra-se completamente isolada, sem o cabeçalho de navegação (`Header`) e sem o rodapé (`Footer`).

---

### 2. Onde está

- **Na página:** Nas páginas institucionais/legais do projeto (`/terms`, `/privacy`, `/contact`, `/disclaimer`, `/reference`, `/refund` e `/shipping`).
- **No código HTML:**
- Nas marcas de estrutura de `terms.html`, `privacy.html`, `contact.html`, `disclaimer.html` e `reference.html`, pela ausência da tag `<footer>`.
- Na tag `<body>` com a cor de fundo incorreta:

```html
<!-- refund.html com cor de fundo divergente -->
<body style="background-color: #fff5e8;"></body>
```

- Em `shipping.html`, pela ausência completa dos componentes `<header>` e `<footer>`.

---

### 3. Por que acontece

Duas causas principais originam essas inconsistências:

1. **Incomplemude na Montagem/Omissão de Template Base:** As páginas secundárias foram criadas de forma isolada sem a inclusão dos blocos reutilizáveis do cabeçalho e rodapé, resultando em arquivos HTML incompletos (`shipping.html` e demais páginas legais).
2. **Atribuição Manual/Hardcoded de Estilo de Fundo:** A página `Refund` recebeu uma regra de cor de fundo específica (`#fff5e8`) aplicada em uma variável, divergindo do padrão de design das outras páginas institucionais (`#ffffff`).

---

### 4. Como eu corrigiria

A abordagem de solução exigirá:

1. **Inclusão dos Componentes de Header e Footer:** Copiar e padronizar a estrutura HTML do `<header>` e do `<footer>` das páginas principais para `terms.html`, `privacy.html`, `contact.html`, `disclaimer.html`, `reference.html` e `shipping.html`.

2. **Normalização da Cor de Fundo em `refund.html`:** Remover a cor `#fff5e8` e aplicar a cor de fundo padrão (`#ffffff` à classe do tema global) para garantir a identidade visual consistente entre todas as páginas.

---

### 5. Gravidade

**Médio.** Prejudica a navegação do usuário (UX), a consistência da marca e a confiabilidade do e-commerce, pois a ausência de links de rodapé em páginas legais dificulta o retorno à página principal e gera uma experiência visual fragmentada.
