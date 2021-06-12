var saveButton = document.getElementById("save")
var apiKey = document.getElementById("api-key")

function constructOptions() {
  saveButton.disabled = true;
  apiKey.addEventListener("keypress", () => { saveButton.disabled = false; })
  saveButton.addEventListener('click', onSave);
}

function onSave() {
  debugger;
   
  var item = apiKey.value;
  chrome.storage.local.set({ apiKey: item }, function () {
    console.log("Api Key data updated");
    saveButton.disabled = true;
    window.close();
  })
}

chrome.storage.local.get('apiKey', function (data) {
  if (data.apiKey === undefined) {
    apiKey.value = ''
  }
  else {
    apiKey.value = data.apiKey;
  }
});

constructOptions();