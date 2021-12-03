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
    to: fields['1183121357'],
    subject: 'Din ansökan till Designstipendiet 2021',
    text: 'Tack för din ansökan! Du kommer höra från oss igen när urvalet till Designstipendiet är beslutat, någon gång runt 1 juli 2021.',
    html: dedent`
      <div style="background: white; position: relative; margin: 4em auto; max-width: 600px; font-size: 1.5em;">
        <h1 style="color: #f8007e; font-size: 1.8em; text-transform: uppercase;">Tack för din ansökan!</h1>
        <p style="color: #f8007e; margin: 1em 0 3em;">Vi har tagit emot din ansökan. Du kommer höra från oss igen när urvalet till Designstipendiet är beslutat, någon gång runt 1 juli 2021. Här nedanför är din ansökan.</p>

        <div style="color: #f8007e; font-style: italic;">Vilken av de tre kurserna har du sökt?</div>
        <div style="color: #f8007e; margin: 0.25em 0 2em;">
          ${fields['20819660']}
        </div>
        <div style="color: #f8007e; font-style: italic;">Hur ser dina möjligheter ut att gå kvällsskolan om du inte skulle få Designstipendiet?</div>
        <div style="color: #f8007e; margin: 0.25em 0 2em;">
          ${fields['650395077']}
        </div>
        <div style="color: #f8007e; font-style: italic;">Berätta varför du tycker att just du ska få Designstipendiet</div>
        <div style="color: #f8007e; margin: 0.25em 0 2em;">
          ${fields['1100207245'].split(/\n+/).map((part, index) => `<p style="margin: ${index === 0 ? 0 : 1}em 0 0;">${part}</p>`).join('')}
        </div>
        <div style="color: #f8007e; font-style: italic;">Har du någon länk du vill visa oss? Kanske till din Instagram, portfolio, en spellista, eller en artikel du gillar</div>
        <div style="color: #f8007e; margin: 0.25em 0 2em;">
          ${fields['538718527']}<br>
          ${fields['1737729401']}<br>
          ${fields['374175773']}<br>
        </div>
        <div style="color: #f8007e; font-style: italic;">Vad har du pluggat tidigare?</div>
        <div style="color: #f8007e; margin: 0.25em 0 2em;">
          ${Object.values(fields['1828762114']).filter((value) => value !== '__other_option__').reduce(function (str, part, index, list) {
            if (index === list.length - 1) return str + ' och ' + part
            else if (index === 0) return part
            return str + ', ' + part
          }, '')}
        </div>
        <div style="color: #f8007e; font-style: italic;">När är du född?</div>
        <div style="color: #f8007e; margin: 0.25em 0 2em;">
          ${fields['695845852_year']}-${('0' + fields['695845852_month']).substr(-2)}-${('0' + fields['695845852_day']).substr(-2)}
        </div>
        <div style="color: #f8007e; font-style: italic;">Namn och adress</div>
        <div style="color: #f8007e; margin: 0.25em 0 2em;">
          ${fields['2059089673']}<br>
          ${fields['107515453']}<br>
          ${fields['1725516971']}, ${fields['238109186']}
        </div>
      </div>
    `
  }

  return client.messages().send(data)
}
