var html = require('choo/html')
var { i18n } = require('../../components/base')
var Intro = require('../../components/intro')
var Countdown = require('../../components/countdown')

var DEADLINE = new Date('2021-06-24')

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
            <p>Ett stipendium till för dig som sökt någon av de tre utbildningarna Form, Mode och Visuell Kommunikation på Beckmans Kvällsskola. Vi i Familjen Robert Weils stiftelse har grundat Designstipendiet för att alla ska kunna gå utbildningarna, trots att det kostar 34 000 för ett år. Stipendiet täcker kostnaden för utbildningen.</p>
            <nav class="Home-nav">
              ${DEADLINE > Date.now() ? html`<a href="/ansok" class="Home-apply">Sök Stipendiet</a>` : null}
              <a href="/info" class="Home-menu">Mer info</a>
            </nav>
          </div>
          ${DEADLINE > Date.now() ? html`
            <div class="Home-footer">
              ${state.cache(Countdown, 'home-timer').render(DEADLINE)}
            </div>
          ` : null}
        </div>
        <div class="Home-sidebar">
          ${state.cache(Intro, 'homepage-intro').render()}
        </div>
      </main>
    </body>
  `
}
