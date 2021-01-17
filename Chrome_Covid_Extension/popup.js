

chrome.storage.local.get('selectedCountry', function (country) {
  chrome.storage.local.get('covidData', function (covidData) {
    let countryName = document.getElementsByName('countryName')[0];
    debugger;
    let countryflag = document.getElementById('flagImage');
    countryflag.src = "https://cdn.countryflags.com/thumbs/" + country.selectedCountry.toLowerCase().replace(" ", "-") + "/flag-square-250.png"
    if (covidData === undefined) {
      countryName.textContent = "NO DATA";
    }
    else {

      let newCases = document.getElementsByName('newCases')[0];
      let newDeaths = document.getElementsByName('newDeaths')[0];
      myData = covidData.covidData.filter((c) => { return c.country === country.selectedCountry.replace(" ", "-") })[0];
      countryName.textContent = myData.country;
      newCases.textContent = myData.cases.new;
      newDeaths.textContent = myData.deaths.new;
    }
  });
});