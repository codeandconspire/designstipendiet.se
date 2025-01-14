var html = require('choo/html')
var Component = require('choo/component')

var NAME = 'entry.554380979'

module.exports = class Reflect extends Component {
  constructor (id, state, emit) {
    super(id)
    var value = state.answers[NAME] || ''
    this.local = state.components[id] = { id, value }
  }

  verify () {
    return Boolean(this.local.value)
  }

  serialize () {
    return { [NAME]: this.local.value }
  }

  title () {
    return 'Skriv en kort text på temat ’Främling överallt’.'
  }

  value () {
    return html`
      <div>
        ${this.local.value.split(/\n+/).map((part) => html`<p>${part}</p>`)}
      </div>
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
      <div class="Reflect" id="${this.local.id}">
        <label class="Reflect-option">
          <div class="Reflect-limit">${500 - this.local.value.length} tecken</div>
          <span class="u-hiddenVisually">Vilka perspektiv kan du bidra med som du tror Beckmans saknar?</span>
          <textarea class="Reflect-text" name="${NAME}" maxlength="700" required oninput=${oninput}>${this.local.value}</textarea>
          <span class="Reflect-placeholder">Skriv här</span>
        </label>
      </div>
    `

    function oninput (event) {
      var value = event.target.value
      self.local.value = value
      callback(NAME, value)
      self.rerender()
      if (value.length > 700) event.preventDefault()
    }
  }
}
