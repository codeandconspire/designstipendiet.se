module.exports = form

var STORAGE_ID = 'designstipendiet-form'

function form (state, emitter, app) {
  var initialized = false

  var _prerender = app._prerender
  app._prerender = function () {
    if (!initialized) {
      initialized = true
      init()
    }
    return _prerender.apply(app, arguments)
  }

  function init () {
    try {
      var persisted = window.localStorage.getItem(STORAGE_ID)
      if (persisted) persisted = JSON.parse(persisted)
    } catch (e) {}

    var queried = Object.keys(state.query)
      .filter((key) => key !== 'q')
      .reduce(function (obj, key) {
        var val = state.query[key]
        if (Array.isArray(val)) obj[key] = val.map(decodeURIComponent)
        else obj[key] = decodeURIComponent(val)
        return obj
      }, {})

    var step = +state.query.q
    state.step = isNaN(step) ? 0 : step
    state.next = null
    state.error = null
    state.loading = false
    state.answers = Object.assign({
      'entry.695845852_month': 1,
      'entry.695845852_day': 1,
      'entry.695845852_year': 1990
    }, persisted, queried)
    state.contact = state.query.contact
  }

  emitter.on('form:abort', function () {
    state.step = 0
    emitter.emit('pushState', '/')
  })

  emitter.on('form:save', function (name, value) {
    if (value) state.answers[name] = value
    else delete state.answers[name]
    window.localStorage.setItem(STORAGE_ID, JSON.stringify(state.answers))
    emitter.emit('render')
  })

  emitter.on('form:submit', function () {
    state.error = null
    state.loading = true
    emitter.emit('render')

    var body = Object.keys(state.answers).reduce(function (query, key) {
      var value = state.answers[key]
      if (Array.isArray(value)) {
        for (let i = 0, len = value.length; i < len; i++) {
          query += `&${key}=${encodeURIComponent(value[i])}`
        }
      } else {
        query += `&${key}=${encodeURIComponent(value)}`
        if (key === 'entry.1828762114.other_option_response') {
          query += '&entry.1828762114=__other_option__'
        }
      }
      return query
    }, '')

    window.fetch('/ansok', {
      method: 'POST',
      body: body.substr(1),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }).then(function (res) {
      console.log(res)
      if (!res.ok) return res.text().then((err) => Promise.reject(Error(err)))
      window.localStorage.removeItem(STORAGE_ID)
      state.step = 0
      state.loading = false
      state.contact = state.answers['entry.1183121357']
      state.answers = {
        'entry.695845852_month': 1,
        'entry.695845852_day': 1,
        'entry.695845852_year': 1990
      }
      emitter.emit('pushState', '/tack')
    }).catch(function (err) {
      state.loading = false
      state.error = err
      window.scrollTo(0, 0)
      emitter.emit('render')
    })
  })

  emitter.on('form:next', function () {
    state.next = state.step + 1
    emitter.emit('render')
  })

  emitter.on('form:prev', function () {
    state.next = state.step - 1
    emitter.emit('render')
  })

  emitter.on('form:goto', function (step) {
    state.next = null
    state.step = step
    if (Object.keys(state.query).length) emitter.emit('pushState', state.href)
    else emitter.emit('render')
  })
}
