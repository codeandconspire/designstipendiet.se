var html = require("choo/html");
var csvtojson = require("csvtojson");
var regeneratorRuntime = require("regenerator-runtime");

module.exports = results;

function results(state, emit) {
  emit('meta', {
    title: 'Designstipendiet – Resultat'
  })

  var hasWindow = typeof window !== 'undefined'

  if (hasWindow) {
    if (!state.submissions) {
      fetchSubmissions();
    }
  }

  async function fetchSubmissions() {
    try {
      const target = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRyXoAB4oI1yGL0ntXvCBmf863vHE7nvViGpi5nq-TCcO_2Hr2xAPqIBL3Ssnr214GJGuE-rUtgH84j/pub?gid=995009924&single=true&output=csv`;
      const res = await fetch(target, {
        method: "get",
        headers: {
          "content-type": "text/csv;charset=UTF-8",
        },
      });

      if (res.status === 200) {
        const text = await res.text();
        const rows = await csvtojson().fromString(text);
        state.submissions = rows;
        emit("render");
      } else {
        console.error(`Error code ${res.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function getAge(dateString) {
    const [day, month, year] = dateString.split("/");
    const birthDate = new Date(year, month - 1, day);
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
  
    // If birthday hasn't happened yet this year, subtract 1
    if (
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate())
    ) {
      age--;
    }
  
    return age + " år";
  }

  function format(items) {
    items.shift();

    const grouped = items.reduce((acc, current) => {
      const [day, month, year] = current.field1.split(" ")[0].split("/");
      if (!acc[year]) acc[year] = [];
      acc[year].push(current);
      return acc;
    }, {});

    return html`
      <div>
        <h1>2025</h1>
        <ul>
          ${grouped["2025"].slice().reverse().map(function (item) {
            return html`
              <li>
                <span class="title"><strong>${item["Namn"]}</strong>, ${getAge(item["Födelsedag"])}, ${item["field19"]}</span>
                <div><strong>Ekonomisk förutsättning</strong>: ${item["Ekonomsik förutsättning"]}</div>
                <div><strong>Kurs</strong>: ${item["Kurs"]}</div>
                <div><strong>Bidrar med perspektiv</strong>:<br> ${item["Motivering"]}</div>
                <div><strong>Temat ’Främling överallt’</strong>:<br> ${item["field22"]}</div>
                <details>
                  <summary>Detaljer</summary>
                  <div><strong>Födelsedag</strong>: ${item["Födelsedag"]}</div>
                  <div><strong>Email</strong>: ${item["field20"]}</div>
                  <div><strong>Telefon</strong>: ${item["Tel"]}</div>
                  <div><strong>Adress</strong>: ${item["field17"]}, ${item["field18"]}, ${item["field19"]}</div>
                  <div><strong>Hittade Beckmans via</strong>: ${item["Hittade till Beckmans via"]}</div>
                  <div><strong>Hittade Stipendiet via</strong>: ${item["Hittade till oss via"]}</div>
                  <div><strong>Tidigare studier</strong>: ${item["Tidigare studier"]}</div>
                  <div><strong>Ansökte den</strong>: ${item["field1"]}</div>
                </details>
              </li>
            `;
          })}
        </ul>
      </div>
    `;
  }

  return html`
    <body>
      <main class="Results">
        <div class="Results-text">
          <div>
            ${state.submissions ? format(state.submissions) : "Laddar…"}
          </div>
        </div>
      </main>
    </body>
  `;
}
