var dedent = require('dedent')
var mailgun = require('mailgun-js')

var client = mailgun({
  apiKey: process.env.MAILGUN_KEY,
  domain: 'mail.designstipendiet.se'
})

module.exports = email

function email (fields) {
  var data = {
    from: 'Designstipendiet <ansokan@mail.designstipendiet.se>',
    to: fields['1286633865'],
    subject: 'Din ansökan till Designstipendiet 2019',
    text: 'Tack för din ansökan! Du kommer höra från oss igen när urvalet till Designstipendiet är beslutat, någon gång runt 25 juni 2019.',
    html: dedent`
      <div style="background: white; position: relative; margin: 4em auto; max-width: 600px; font-size: 1.5em;">
        <h1 style="color: red; font-size: 1.8em; text-transform: uppercase;">Tack för din ansökan!</h1>
        <p style="color: red; margin: 1em 0 3em;">Vi har tagit emot din ansökan. Du kommer höra från oss igen när urvalet till Designstipendiet är beslutat, någon gång runt 25 juni 2019. Här nedanför är din ansökan.</p>
        <div style="color: red; font-style: italic;">Berätta varför du tycker att just du ska få Designstipendiet</div>
        <div style="color: red; margin: 0.25em 0 2em;">
          ${fields['397921220'].split(/\n+/).map((part, index) => `<p style="margin: ${index === 0 ? 0 : 1}em 0 0;">${part}</p>`).join('')}
        </div>
        <div style="color: red; font-style: italic;">Hur ser dina möjligheter ut att gå kvällsskolan om du inte skulle få Designstipendiet?</div>
        <div style="color: red; margin: 0.25em 0 2em;">
          ${fields['1218836425']}
        </div>
        <div style="color: red; font-style: italic;">Vad har du pluggat tidigare?</div>
        <div style="color: red; margin: 0.25em 0 2em;">
          ${Object.values(fields['551104495']).filter((value) => value !== '__other_option__').reduce(function (str, part, index, list) {
    if (index === list.length - 1) return str + ' och ' + part
    else if (index === 0) return part
    return str + ', ' + part
  }, '')}
        </div>
        <div style="color: red; font-style: italic;">När är du född?</div>
        <div style="color: red; margin: 0.25em 0 2em;">
          ${fields['1051571347_year']}-${('0' + fields['1051571347_month']).substr(-2)}-${('0' + fields['1051571347_day']).substr(-2)}
        </div>
        <div style="color: red; font-style: italic;">Namn och adress</div>
        <div style="color: red; margin: 0.25em 0 2em;">
          ${fields['481660275']}<br>
          ${fields['160977161']}<br>
          ${fields['1139769175']}, ${fields['31493464']}
        </div>
      </div>
    `
  }

  return client.messages().send(data)
}
