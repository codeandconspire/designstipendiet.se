var html = require('choo/html')
var { i18n } = require('../../components/base')

var text = i18n()

module.exports = home

var DEADLINE = new Date('2022-07-01')

function home (state, emit) {
  emit('meta', {
    title: text`SITE_NAME`,
    description: text`SITE_DESCRIPTION`,
    'og:image': '/share-image.png'
  })

  return html`
    <body>
      <main class="Info js-scroll">
        <div class="Info-main">
          <div class="Info-content">
            <p>Designstipendiet täcker kostnaden för utbildningen, men innebär också att stipendiaten ges möjlighet att använda jurygruppen som bollplank under studietiden.</p>
            <p>Kvällsskolan på Beckmans har tre inriktningar: Form, Mode och Visuell Kommunikation. Utbildningen är förberedande och vilar på konstnärlig grund.</p>
            <p>Kvällsskolan erbjuder grundläggande orientering i ämnen som exempelvis möbelformgivning, mönsterkomposition, modedesign, fotografi, grafisk design och teckning.</p>
            <p>Familjen Robert Weils Stiftelse vill medverka till att skolan fortsätter att vara den kreativa samlingsplats den varit sen 1939. En högskola där en mångfald av erfarenheter och berättelser är med och skapar vår gemensamma framtid i en demokratisk och hållbar riktning.</p>
            <p>Därför har vi instiftat Designstipendiet.</p>
            <nav>
              <a href="/" class="Info-menu">Tillbaka</a>
            </nav>
          </div>
        </div>
        <div class="Info-sidebar">
          ${DEADLINE > Date.now() ? html`
            <ol class="Info-instructions">
              <li class="Info-step">Du söker till Kvällsskolan på <a href="https://beckmans.se/studera/forberedande-utbildning-kvallsskolan/">beckmans.se</a>.</li>
              <li class="Info-step">Designstipendiet <a href="/ansok">ansöker du om här</a>.</li>
              <li class="Info-step">Blir du utvald bekostar stipendiet utbildningen och du får jurygruppen som bollplank under året.</li>
            </ol>
            <div class="Info-footer">
              Sista ansökningsdag 30 juni 2022 och besked om stipendiet ges kort där efter.
            </div>
          ` : html`
            <ol class="Info-instructions">
              <li>Årets ansökning är nu stängd.</li>
            </ol>
          `}
        </div>
      </main>
    </body>
  `
}
