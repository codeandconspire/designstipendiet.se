var html = require('choo/html')
var Component = require('choo/component')

var NAME = 'entry.1100207245'

module.exports = class WhyYou extends Component {
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
    return 'Berätta varför du tycker att just du ska få Designstipendiet.'
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
      <div class="WhyYou" id="${this.local.id}">
        <label class="WhyYou-option">
          <div class="WhyYou-limit">${1000 - this.local.value.length} tecken</div>
          <span class="u-hiddenVisually">Varför tycker du att du ska få Designstipendiet?</span>
          <textarea class="WhyYou-text" name="${NAME}" maxlength="1000" required oninput=${oninput}>${this.local.value}</textarea>
          <span class="WhyYou-placeholder">Skriv här</span>
        </label>
      </div>
    `

    function oninput (event) {
      var value = event.target.value
      self.local.value = value
      callback(NAME, value)
      self.rerender()
      if (value.length > 1000) event.preventDefault()
    }
  }
}
