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
      if (typeof window !== 'undefined') {  
        var persisted = window.localStorage.getItem(STORAGE_ID)
        if (persisted) {
          try {
            persisted = JSON.parse(persisted)
            // Validate that persisted is an object
            if (!persisted || typeof persisted !== 'object') {
              persisted = {}
            }
          } catch (e) {
            console.error('Failed to parse localStorage data:', e)
            persisted = {}
          }
        } else {
          persisted = {}
        }
      } else {
        persisted = {}
      }
    } catch (e) {
      console.error('Failed to access localStorage:', e)
      persisted = {}
    }

    var queried = Object.keys(state.query || {})
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
    state.contact = state.query.contact || null
  }

  emitter.on('form:abort', function () {
    state.step = 0
    emitter.emit('pushState', '/')
  })

  emitter.on('form:save', function (name, value) {
    if (!name) return
    if (value) {
      state.answers = state.answers || {}
      state.answers[name] = value
    } else if (state.answers) {
      delete state.answers[name]
    }
    try {
      window.localStorage.setItem(STORAGE_ID, JSON.stringify(state.answers || {}))
    } catch (e) {
      console.error('Failed to save to localStorage:', e)
    }
    emitter.emit('render')
  })

  emitter.on('form:submit', function () {
    state.error = null
    state.loading = true
    emitter.emit('render')

    if (!state.answers || typeof state.answers !== 'object') {
      state.error = new Error('Invalid form data')
      state.loading = false
      emitter.emit('render')
      return
    }

    var body = Object.keys(state.answers).reduce(function (query, key) {
      if (!key) return query
      var value = state.answers[key]
      if (Array.isArray(value)) {
        for (let i = 0, len = value.length; i < len; i++) {
          if (value[i] != null) {
            query += `&${key}=${encodeURIComponent(value[i])}`
          }
        }
      } else if (value != null) {
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
      if (!res.ok) {
        return res.text().then(function (err) {
          return Promise.reject(new Error(err || 'Submission failed'))
        })
      }
      try {
        window.localStorage.removeItem(STORAGE_ID)
      } catch (e) {
        console.error('Failed to clear localStorage:', e)
      }
      state.step = 0
      state.loading = false
      state.contact = state.answers['entry.1183121357'] || null
      state.answers = {
        'entry.695845852_month': 1,
        'entry.695845852_day': 1,
        'entry.695845852_year': 1990
      }
      emitter.emit('pushState', '/tack')
    }).catch(function (err) {
      state.loading = false
      state.error = err || new Error('Submission failed')
      window.scrollTo(0, 0)
      emitter.emit('render')
    })
  })

  emitter.on('form:next', function () {
    if (typeof state.step !== 'number') state.step = 0
    state.next = state.step + 1
    emitter.emit('render')
  })

  emitter.on('form:prev', function () {
    if (typeof state.step !== 'number') state.step = 0
    state.next = Math.max(0, state.step - 1)
    emitter.emit('render')
  })

  emitter.on('form:goto', function (step) {
    if (typeof step !== 'number') return
    state.next = null
    state.step = step
    if (state.query && Object.keys(state.query).length) {
      emitter.emit('pushState', state.href)
    } else {
      emitter.emit('render')
    }
  })
}
