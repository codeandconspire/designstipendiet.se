var choo = require('choo')
var app = choo({ hash: false })

app.state.origin = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : `https://${process.env.HOST}`

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  app.use(require('choo-devtools')())
  
}

app.use(require('choo-service-worker/clear')())
app.use(require('./stores/reset'))
app.use(require('./stores/form'))
app.use(require('choo-meta')({ origin: app.state.origin }))

app.route('/', require('./views/home'))
app.route('/info', require('./views/info'))
app.route('/ansok', require('./views/form'))
app.route('/tack', require('./views/thanks'))
app.route('/resultat-secret-page-a7ol67n20q1h35bf9n', require('./views/results'))

try {
  module.exports = app.mount('body')
  // remove parse guard added in header
  window.onerror = null
} catch (err) {
  if (typeof window !== 'undefined') {
    document.documentElement.removeAttribute('scripting-enabled')
    document.documentElement.setAttribute('scripting-initial-only', '')

    // fix stuck hover states in ios
    document.addEventListener('touchstart', function () {}, false)
  }
}
