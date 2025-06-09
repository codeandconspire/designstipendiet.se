if (!process.env.HEROKU) require('dotenv/config')

var jalla = require('jalla')
var body = require('koa-body')
var dedent = require('dedent')
var compose = require('koa-compose')
var { get, post } = require('koa-route')
var unparsed = require('koa-body/unparsed')
var purge = require('./lib/purge')
var email = require('./lib/email')

var ENDPOINT =
  'https://docs.google.com/forms/d/e/1FAIpQLSdM-T0zn8tIhIy4s4O9D61mGqaezMUvg2Io-dwkWLQe9dKvbg/formResponse'
var app = jalla('index.js', {
  sw: 'sw.js',
  serve: Boolean(process.env.HEROKU)
})

// proxy application form for Google Forms
app.use(
  post(
    '/ansok',
    compose([
      body({ includeUnparsed: true }),
      async function (ctx
      ) {
        try {
          if (!ctx.request.body || !ctx.request.body[unparsed]) {
            ctx.status = 400;
            ctx.body = { error: 'Invalid form data' };
            return;
          }

          const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: ctx.request.body[unparsed]
          });

          if (!response.ok) {
            throw new Error(`Google Forms API returned ${response.status}`);
          }

          // Ensure we have valid form data
          if (!ctx.request.body || !ctx.request.body.entry) {
            ctx.status = 400;
            ctx.body = { error: 'Invalid form data: missing entry field' };
            return;
          }

          var fields = ctx.request.body.entry;
          var contact = fields['1183121357'] || '';

          if (contact) {
            await email(contact).catch(console.error)
          }

          if (ctx.accepts('html')) {
            ctx.redirect('/tack?contact=' + encodeURIComponent(contact));
          } else {
            ctx.type = 'application/json';
            ctx.body = { success: true };
          }
        } catch (err) {
          console.error('Form submission error:', err);
          ctx.status = 500;
          if (ctx.accepts('html')) {
            ctx.redirect('/error');
          } else {
            ctx.body = { error: 'Form submission failed' };
          }
        }
      }
    ])
  )
)

// disallow robots anywhere but live
app.use(
  get('/robots.txt', function (ctx, next) {
    ctx.type = 'text/plain'
    ctx.body = dedent`
    User-agent: *
    Disallow: ${app.env === 'production' ? '' : '/'}
  `
  })
)

// set headers
app.use(function (ctx, next) {
  if (!ctx.accepts('html')) return next()
  ctx.state.ref = null
  if (app.env !== 'development') {
    ctx.set('Cache-Control', `s-maxage=${60 * 60 * 24 * 30}, max-age=0`)
  }

  return next()
})

app.listen(process.env.PORT || 8080, function () {
  if (process.env.HEROKU && app.env === 'production') {
    purge(['/sw.js'], function (err) {
      if (err) app.emit('error', err)
    })
  }
})
