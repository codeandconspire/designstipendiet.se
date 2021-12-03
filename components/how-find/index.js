var html = require('choo/html')
var Component = require('choo/component')

var BECKMANS = 'entry.1242306000'
var DESIGNSTIPENDIET = 'entry.729532574'

module.exports = class HowFind extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {
      id,
      [BECKMANS]: state.answers[BECKMANS] || '',
      [DESIGNSTIPENDIET]: state.answers[DESIGNSTIPENDIET] || ''
    }
  }

  verify () {
    var fields = [BECKMANS, DESIGNSTIPENDIET]
    return fields.reduce((valid, key) => valid && this.local[key], true)
  }

  serialize () {
    return {
      [BECKMANS]: this.local[BECKMANS],
      [DESIGNSTIPENDIET]: this.local[DESIGNSTIPENDIET]
    }
  }

  value () {
    return html`
      <p>
        ${this.local[BECKMANS]}<br>
        ${this.local[DESIGNSTIPENDIET]}<br>
      </p>
    `
  }

  title () {
    return 'Hur fick du först höra om Beckmans & Designstipendiet?'
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
      <div class="HowFind" id="${this.local.id}">
      <label class="HowFind-option">
          <span class="HowFind-label">Hörde om Beckmans via…</span>
          <input class="HowFind-text" type="text" name="${BECKMANS}" value="${this.local[BECKMANS]}" autocomplete="off" required oninput=${oninput}>
        </label>
        <label class="HowFind-option">
          <span class="HowFind-label">Hörde om Designstipendiet via…</span>
          <input class="HowFind-text" type="text" name="${DESIGNSTIPENDIET}" value="${this.local[DESIGNSTIPENDIET]}" autocomplete="off" required oninput=${oninput}>
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
