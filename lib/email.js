var dedent = require("dedent");
var Mailgun = require("mailgun.js");
var formData = require('form-data');
var mailgun = new Mailgun(formData);

var client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_KEY,
  url: 'https://api.eu.mailgun.net',
});

module.exports = email;

function email(address) {
  if (!address) {
    console.log("No email address provided");
    return;
  }

  var data = {
    from: "Designstipendiet <noreply@email.designstipendiet.se>",
    to: address,
    subject: "Din ansökan till Designstipendiet 2025",
    text: "Tack för din ansökan! Du kommer höra från oss igen när urvalet till Designstipendiet är beslutat, någon gång i början av juli 2025.",
    html: dedent`
      <div style="background: white; position: relative; margin: 4em auto; max-width: 600px; font-size: 1.5em;">
        <h1 style="color: #ff9000; font-size: 1.8em; text-transform: uppercase;">Tack för din ansökan!</h1>
        <p style="color: #ff9000; margin: 1em 0 3em;">Vi har tagit emot din ansökan. Du kommer höra från oss igen när urvalet till Designstipendiet är beslutat, någon gång i början av juli 2025. Här nedanför är din ansökan.</p>
      </div>
    `,
  };

  console.log(data);

  return client.messages.create('email.designstipendiet.se', data);
}