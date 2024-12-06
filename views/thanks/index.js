var html = require("choo/html");

module.exports = thanks;

function thanks(state, emit) {
  return html`
    <body>
      <main class="Thanks">
        <div class="Thanks-text">
          <h1 class="Thanks-title">Tack!</h1>
          <p>
            Vi kontaktar dig när urvalet till Designstipendiet är beslutat.
            Svaret kommer i början av juli, 2025.
          </p>
          <p>Fler än en person kan få stipendet, så tipsa gärna en kompis.</p>
        </div>
      </main>
    </body>
  `;
}
