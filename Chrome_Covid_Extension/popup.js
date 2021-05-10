document
  .getElementById("worstNewCases")
  .addEventListener("click", showWorstNewCases);
document
  .getElementById("worstNewDeaths")
  .addEventListener("click", showWorstNewDeaths);
document.getElementById("Selected").addEventListener("click", showSelected);

function showWorstNewCases() {
  chrome.storage.local.get("worstNewCases", function (country) {
    let newCases = document.getElementsByName("newCases")[0];
    let newDeaths = document.getElementsByName("newDeaths")[0];
    let lastUpdated = document.getElementsByName("lastUpdated")[0];
    let countryflag = document.getElementById("flagImage");

    myData = country.worstNewCases;
    countryName.textContent = myData.country;
    newCases.textContent = myData.newCases;
    newDeaths.textContent = myData.newDeaths;
    lastUpdated.textContent = new Date(myData.time).toLocaleString();
    countryflag.src =
      "https://cdn.countryflags.com/thumbs/" +
      myData.country.toLowerCase().replace(" ", "-") +
      "/flag-square-250.png";
  });
}

function showWorstNewDeaths() {
  chrome.storage.local.get("worstDeaths", function (country) {
    let newCases = document.getElementsByName("newCases")[0];
    let newDeaths = document.getElementsByName("newDeaths")[0];
    let lastUpdated = document.getElementsByName("lastUpdated")[0];
    let countryflag = document.getElementById("flagImage");

    myData = country.worstDeaths;
    countryName.textContent = myData.country;
    newCases.textContent = myData.newCases;
    newDeaths.textContent = myData.newDeaths;
    lastUpdated.textContent = new Date(myData.time).toLocaleString();
    countryflag.src =
      "https://cdn.countryflags.com/thumbs/" +
      myData.country.toLowerCase().replace(" ", "-") +
      "/flag-square-250.png";
  });
}

function showSelected() {
  chrome.storage.local.get("selectedCountry", function (country) {
    chrome.storage.local.get("covidData", function (covidData) {
      chrome.storage.local.get("lastRefreshed", function (lr) {
        let countryName = document.getElementsByName("countryName")[0];
        let countryflag = document.getElementById("flagImage");
        countryflag.src =
          "https://cdn.countryflags.com/thumbs/" +
          country.selectedCountry.toLowerCase().replace(" ", "-") +
          "/flag-square-250.png";
        if (covidData === undefined || covidData.covidData === undefined) {
          countryName.textContent = "NO DATA";
        } else {
          let newCases = document.getElementsByName("newCases")[0];
          let newDeaths = document.getElementsByName("newDeaths")[0];
          let lastUpdated = document.getElementsByName("lastUpdated")[0];
          let lastRefreshed = document.getElementsByName("lastRefreshed")[0];
          myData = covidData.covidData.filter((c) => {
            return (
              c.country.toLowerCase() ===
              country.selectedCountry.toLowerCase().replace(" ", "-")
            );
          })[0];
          countryName.textContent = myData.country;
          newCases.textContent = myData.cases.new;
          newDeaths.textContent = myData.deaths.new;
          lastUpdated.textContent = new Date(myData.time).toLocaleString();
          var las = new Date(lr.lastRefreshed).toISOString();
          lastRefreshed.textContent = new Date(las)
            .toLocaleString()
            .replace("T", " ")
            .replace(/\.\d+Z/, "");
        }
      });
    });
  });
}
showSelected();
