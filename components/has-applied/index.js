var html = require('choo/html')
var Component = require('choo/component')

var NAME = 'entry.20819660'

module.exports = class HasApplied extends Component {
  constructor (id, state, emit) {
    super(id)
    var value = state.answers[NAME]
    this.local = state.components[id] = { 
      id, 
      value: value === 'Ja' || value === 'Nej' ? value : null 
    }
  }

  verify () {
    return this.local.value === 'Ja'
  }

  serialize () {
    return { [NAME]: this.local.value || '' }
  }

  title () {
    return 'Har du skickat in din ansökan till Kvällsskolan på Beckmans?'
  }

  value () {
    return this.local.value ? html`<p>${this.local.value}</p>` : null
  }

  update (callback, opts = {}) {
    return false
  }

  placeholder (...args) {
    return this.createElement(...args)
  }

  createElement (callback) {
    var self = this

    return html`
      <div class="HasApplied" id="${this.local.id}">
        <label class="HasApplied-option">
          <input class="HasApplied-toggle" type="radio" name="${NAME}" value="Ja" checked=${this.local.value === 'Ja'} required onchange=${onchange}>
          <div class="HasApplied-indicator"></div>
          <span class="HasApplied-label">Ja, självklart</span>
        </label>
        <label class="HasApplied-option">
          <input class="HasApplied-toggle" type="radio" name="${NAME}" value="Nej" checked=${this.local.value === 'Nej'} onchange=${onchange}>
          <div class="HasApplied-indicator"></div>
          <span class="HasApplied-label">
            Nej, inte än
            <span class="HasApplied-tooltip">
              Börja med det! Läs mer på <a href="https://beckmans.se/studera/forberedande-utbildning-kvallsskolan/" rel="noopener noreferrer" target="_blank">beckmans.se</a>
            </span>
          </span>
        </label>
      </div>
    `

    function onchange (event) {
      var target = event.target
      if (!target || !target.value) return
      self.local.value = target.value
      callback(NAME, target.value)
    }
  }
}
