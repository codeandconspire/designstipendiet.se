var html = require('choo/html')
var Banner = require('../../components/banner')

module.exports = thanks

function thanks (state, emit) {
  var contact = state.contact ? state.contact.toUpperCase() : '?'

  return html`
    <body>
      <main class="Thanks">
        <div class="Thanks-text">
          <h1 class="Thanks-title">Tack!</h1>
          <p>Vi kontaktar dig på <span class="u-textBreak">${contact}</span> när urvalet till Designstipendiet är beslutat. Svaret kommer runt 25 juni 2019.</p>
        </div>
      </main>
    </body>
  `
}
