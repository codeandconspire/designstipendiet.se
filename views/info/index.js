var html = require('choo/html')
var { i18n } = require('../../components/base')

var text = i18n()

module.exports = home

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
            <p>Kvällsskolan på Beckmans har tre inriktningar: Form, Mode och Visuell Kommunikation. Utbildningen är förberedande och vilar på konstnärlig grund.</p>
            <p>Kvällsskolan erbjuder grundläggande orientering i ämnen som exempelvis möbelformgivning, mönsterkomposition, modedesign, fotografi, grafisk design och teckning.</p>
            <p>Familjen Robert Weils Stiftelse vill medverka till att skolan fortsätter att vara den kreativa samlingsplats den varit sen 1939. En högskola där en mångfald av erfarenheter är med och skapar vår gemensamma framtid i en demokratisk och hållbar riktning.</p>
            <p>Därför har vi instiftat Designstipendiet.</p>
            <nav>
              <a href="/" class="Info-menu">Tillbaka</a>
            </nav>
          </div>
        </div>
        <div class="Info-sidebar">
          <ol class="Info-instructions">
            <li class="Info-step">Du söker till Kvällsskolan på <a href="https://www.beckmans.se/studera/forberedande-utbildning-kvallsskola/kvallskola-form/">beckmans.se</a></li>
            <li class="Info-step">Därefter kan du söka Designstipendiet</li>
            <li class="Info-step">Blir du utvald slipper du betala utbildningen</li>
          </ol>
          <div class="Info-footer">
            Sista ansökningsdag 23 juni 2021 och besked om stipendiet ges runt den 1 juli.
          </div>
        </div>
      </main>
    </body>
  `
}
