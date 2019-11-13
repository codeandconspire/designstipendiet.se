var html = require('choo/html')

module.exports = thanks

function thanks (state, emit) {
  var contact = state.contact ? state.contact.toLowerCase() : '?'

  return html`
    <body>
      <main class="Thanks">
        <div class="Thanks-text">
          <h1 class="Thanks-title">Tack!</h1>
          <p>Vi kontaktar dig på <span class="u-textBreak">${contact}</span> när urvalet till Designstipendiet är beslutat. Svaret kommer runt 18 juni 2020.</p>
        </div>
      </main>
    </body>
  `
}
