function translate(code) {
  if (code !== undefined) {
    document.getElementById("translations").innerHTML = "loading ...";
    translator.setup(code[0]);
    word = "Translate : <b>" + code[0] + "</b>";
    document.querySelector("#word").innerHTML = word;
  }
}

function goTranslate() {
  translate([document.getElementById("search").value]);
}

chrome.tabs.executeScript(
  {
    code: "window.getSelection().toString();",
  },
  translate
);

document.getElementById("translate").addEventListener("click", goTranslate);
document.addEventListener("DOMContentLoaded", function () {});

var translator = {
  setup: function (q) {
    getApiKey().then((x) => {
      debugger;
      const apiKey = "key=" + x;
      const data = "?q=" + encodeURI(q) + "&target=af&source=en&" + apiKey;

      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            document.querySelector("#translations").innerHTML = "";
            JSON.parse(this.responseText).data.translations.forEach(
              (x) =>
                (document.querySelector("#translations").innerHTML =
                  document.querySelector("#translations").innerHTML +
                  "<br>" +
                  x.translatedText)
            );
            console.log(this.responseText);
          } else {
            document.querySelector("#translations").innerHTML =
              this.status + " " + this.statusText;
          }
        } else {
        }
      });

      xhr.open(
        "GET",
        "https://translation.googleapis.com/language/translate/v2" + data
      );
      xhr.setRequestHeader("accept-encoding", "application/gzip");

      xhr.send();
    });
  },
};

async function getApiKey() {
  var key = "apiKey";
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      debugger;
      if (Object.values(result)[0] != undefined) {
        resolve(Object.values(result)[0]);
      } else {
        reject();
      }
    });
  });
}
