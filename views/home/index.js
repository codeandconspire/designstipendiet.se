var html = require('choo/html')
var { i18n } = require('../../components/base')
var Intro = require('../../components/intro')
var Countdown = require('../../components/countdown')

let DEADLINE = new Date('2024-06-22')

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
      <main class="Home js-scroll">
        <div class="Home-main">
          <div class="Home-content">
            <p>Din framtid kan börja på Beckmans Kvällsskola!</p>
            <p>
              Ett stipendium till för dig som vill gå någon av de tre kvällskurserna på <a href="https://beckmans.se/kvallsskolan/" target="_blank">Beckmans Kvällsskola</a>. Familjen Robert Weils stiftelse har grundat Designstipendiet för att alla, oavsett bakgrund, ska kunna ha möjlighet att tacka ja om de erbjuds en plats.
            </p>
            <nav class="Home-nav">
              ${DEADLINE > Date.now()
                ? html`<a href="/ansok" class="Home-apply">Sök Stipendiet</a>`
                : html`<span style="color: black">Årets ansökning är nu stängd<br /><br/></span>`}
              <a href="/info" class="Home-menu">Mer info</a>
            </nav>
          </div>
          ${DEADLINE > Date.now()
            ? html`
                <div class="Home-footer">
                  ${state.cache(Countdown, 'home-timer').render(DEADLINE)}
                </div>
              `
            : null}
        </div>
        <div class="Home-sidebar">
          ${state.cache(Intro, 'homepage-intro').render()}
        </div>
      </main>
    </body>
  `
}
