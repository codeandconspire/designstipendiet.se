var html = require('choo/html')
var Component = require('choo/component')

var NAME = 'entry.1021338072'

module.exports = class PickCourse extends Component {
  constructor (id, state, emit) {
    super(id)
    var value = state.answers[NAME] || null
    this.local = state.components[id] = { id, value }
  }

  verify () {
    return this.local.value
  }

  serialize () {
    return { [NAME]: this.local.value }
  }

  title () {
    return 'Vilken av de tre kurserna har du sökt?'
  }

  value () {
    return html`<p>${this.local.value}</p>`
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
      <div class="PickCourse" id="${this.local.id}">
        <label class="PickCourse-option">
          <input class="PickCourse-toggle" type="radio" name="${NAME}" value="Form" checked=${this.local.value === 'Form'} required onchange=${onchange}>
          <div class="PickCourse-indicator"></div>
          <span class="PickCourse-label">Form</span>
        </label>
        <label class="PickCourse-option">
          <input class="PickCourse-toggle" type="radio" name="${NAME}" value="Mode" checked=${this.local.value === 'Mode'} required onchange=${onchange}>
          <div class="PickCourse-indicator"></div>
          <span class="PickCourse-label">Mode</span>
        </label>
        <label class="PickCourse-option">
          <input class="PickCourse-toggle" type="radio" name="${NAME}" value="Visuell kommunikation" checked=${this.local.value === 'Visuell kommunikation'} onchange=${onchange}>
          <div class="PickCourse-indicator"></div>
          <span class="PickCourse-label">Visuell kommunikation</span>
        </label>
      </div>
    `

    function onchange (event) {
      var target = event.target
      self.local.value = target.value
      callback(NAME, target.value)
    }
  }
}
