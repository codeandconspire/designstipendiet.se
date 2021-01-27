var html = require('choo/html')
var Component = require('choo/component')

var LINK1 = 'entry.538718527'
var LINK2 = 'entry.1737729401'
var LINK3 = 'entry.374175773'

module.exports = class Links extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {
      id,
      [LINK1]: state.answers[LINK1] || '',
      [LINK2]: state.answers[LINK2] || '',
      [LINK3]: state.answers[LINK3] || ''
    }
  }

  verify () {
    return true
  }

  serialize () {
    return {
      [LINK1]: this.local[LINK1],
      [LINK2]: this.local[LINK2],
      [LINK3]: this.local[LINK3]
    }
  }

  title () {
    return html`<span>Har du några länkar du vill visa oss? Kanske till din Instagram, din portfolio, eller till något konto som inspirerar dig. <small>Du kan också maila filer till <a href="mailto:ls@proventus.se">ls@proventus.se</a> (glöm inte skriva ditt namn).</small></span>`
  }

  value () {
    return html`
      <p>
        <div class="u-textTruncate">${this.local[LINK1]}</div>
        <div class="u-textTruncate">${this.local[LINK2]}</div>
        <div class="u-textTruncate">${this.local[LINK3]}</div>
      </p>
    `
  }

  placeholder (...args) {
    return this.createElement(...args)
  }

  update () {
    return false
  }

  createElement (callback) {
    var self = this

    return html`
      <div class="Links" id="${this.local.id}">
        <label class="Links-option">
          <span class="Links-label">Länk till arbetsprov:</span>
          <input class="Links-text" type="text" name="${LINK1}" value="${this.local[LINK1]}" autocomplete="url" oninput=${oninput}>
        </label>
        <label class="Links-option">
          <span class="Links-label">Länk till tidigare arbete:</span>
          <input class="Links-text" type="text" name="${LINK2}" value="${this.local[LINK2]}" autocomplete="url" oninput=${oninput}>
        </label>
        <label class="Links-option">
          <span class="Links-label">Länk till inspiration:</span>
          <input class="Links-text" type="text" name="${LINK3}" value="${this.local[LINK3]}" autocomplete="url" oninput=${oninput}>
        </label>
      </div>
    `

    function oninput (event) {
      var target = event.target
      var name = target.name
      var value = target.value.trim()
      self.local[name] = value
      callback(name, value)
    }
  }
}
