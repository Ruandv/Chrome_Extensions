var select = document.getElementById("country")
var saveButton = document.getElementById("save")
var apiKey = document.getElementById("api-key")
var apiHost = document.getElementById("api-host")
var countries = [{ "country": "South-Africa" }];
function constructOptions(countries, selectedCountry) {
  saveButton.disabled = true;
  select.addEventListener("change", () => { saveButton.disabled = false; })
  apiKey.addEventListener("keypress", () => { saveButton.disabled = false; })
  apiHost.addEventListener("keypress", () => { saveButton.disabled = false; })

  saveButton.addEventListener('click', onSave);
  for (let item of countries) {

    var option = document.createElement("option");
    option.value = item.country;
    option.text = item.country.charAt(0).toUpperCase() + item.country.slice(1);
    select.appendChild(option);

    if (selectedCountry == item.country) {
      select.value = selectedCountry;
    }
  }
}

function onSave() {
  var item = select.value;
  chrome.storage.local.set({ selectedCountry: item }, function () {
    console.log("Country data updated");
    saveButton.disabled = true;
  })

  var item = apiHost.value;
  chrome.storage.local.set({ apiHost: item }, function () {
    console.log("Api Host data updated");
    saveButton.disabled = true;
  })

  var item = apiKey.value;
  chrome.storage.local.set({ apiKey: item }, function () {
    console.log("Api Key data updated");
    saveButton.disabled = true;
    window.close();
  })
}

chrome.storage.local.get('selectedCountry', function (country) {
  chrome.storage.local.get('covidData', function (covidData) {
    if (covidData.covidData !== undefined) {
      countries = covidData.covidData.map(
        calendarList => {
          return {
            country: calendarList.country
          }
        }
      );
    }
    constructOptions(countries, country.selectedCountry);
  });
});


chrome.storage.local.get('apiHost', function (data) {
  if (data.apiHost === undefined) {
    apiHost.value = 'covid-193.p.rapidapi.com';
  }
  else {
    apiHost.value = data.apiHost;
  }
});

chrome.storage.local.get('apiKey', function (data) {
  if (data.apiKey === undefined) {
    apiKey.value = ''
  }
  else {
    apiKey.value = data.apiKey;
  }
});