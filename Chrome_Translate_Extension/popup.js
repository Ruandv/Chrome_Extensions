document.getElementById('tab1').addEventListener('click', () => {
  changeLanguage('tab1', 'af')
})

document.getElementById('tab2').addEventListener('click', () => {
  changeLanguage('tab2', 'de')
})

document.getElementById('tab3').addEventListener('click', () => {
  changeLanguage('tab3', 'zu')
})

document.getElementById('tab4').addEventListener('click', () => {
  changeLanguage('tab4', 'en')
})

document.getElementById('tab5').addEventListener('click', () => {
  changeLanguage('tab5', 'es')
})

document.getElementById('tab6').addEventListener('click', () => {
  changeLanguage('tab6', 'fr')
})

document.getElementById('tab7').addEventListener('click', () => {
  changeLanguage('tab7', 'mi')
})

document.addEventListener('DOMContentLoaded', function () {})

var translator = {
  setup: function (q, target) {
    getApiKey().then((x) => {
      const apiKey = 'key=' + x
      const data =
        '?q=' + encodeURI(q) + '&target=' + encodeURI(target) + '&' + apiKey

      const xhr = new XMLHttpRequest()

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            document.querySelector('#translations').innerHTML = ''
            JSON.parse(this.responseText).data.translations.forEach(
              (x) =>
                (document.querySelector('#translations').innerHTML =
                  document.querySelector('#translations').innerHTML +
                  '<br>' +
                  x.translatedText)
            )
            console.log(this.responseText)
          } else {
            document.querySelector('#translations').innerHTML =
              this.status + ' ' + this.statusText
          }
        } else {
        }
      })

      xhr.open(
        'GET',
        'https://translation.googleapis.com/language/translate/v2' + data
      )
      xhr.setRequestHeader('accept-encoding', 'application/gzip')

      xhr.send()
    })
  },
}

async function getApiKey() {
  var key = 'apiKey'
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      debugger
      if (Object.values(result)[0] != undefined) {
        resolve(Object.values(result)[0])
      } else {
        reject()
      }
    })
  })
}

function translate(code, lang) {
  if (
    code !== undefined &&
    code[0] !== '' &&
    lang !== undefined &&
    lang.length > 0
  ) {
    document.getElementById('translations').innerHTML = 'loading ...'
    translator.setup(code[0], lang)
    word = 'Translate : <b>' + code[0] + '</b>'
    document.querySelector('#word').innerHTML = word
  }
}

function changeLanguage(tabId, lang) {
  setActiveTab(tabId)
  translate([document.getElementById('search').value], lang)
}
function setActiveTab(tabId) {
  document.getElementById('tab1').classList.remove('active')
  document.getElementById('tab2').classList.remove('active')
  document.getElementById('tab3').classList.remove('active')
  document.getElementById('tab4').classList.remove('active')
  document.getElementById('tab5').classList.remove('active')
  document.getElementById('tab6').classList.remove('active')
  document.getElementById('tab7').classList.remove('active')
  document.getElementById(tabId).classList.add('active')
}
function goTranslate() {
  translate([document.getElementById('search').value], 'af')
}

chrome.tabs.executeScript(
  {
    code: 'window.getSelection().toString();'
  },
  (c)=>{document.getElementById('search').value = c;changeLanguage('tab1','af') }
)
