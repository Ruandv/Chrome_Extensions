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
    const data = "q=" + encodeURI(q) + "&target=de&source=en";

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

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
      "POST",
      "https://google-translate1.p.rapidapi.com/language/translate/v2"
    );
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("accept-encoding", "application/gzip");
    xhr.setRequestHeader(
      "x-rapidapi-key",
      ""
    );
    xhr.setRequestHeader("x-rapidapi-host", "google-translate1.p.rapidapi.com");

    xhr.send(data);
  },
};
