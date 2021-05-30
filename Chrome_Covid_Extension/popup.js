document
  .getElementById("worstNewCases")
  .addEventListener("click", showWorstNewCases);
document
  .getElementById("worstNewDeaths")
  .addEventListener("click", showWorstNewDeaths);

  document
  .getElementById("topFive")
  .addEventListener("click", topFiveCountries);

  
document.getElementById("Selected").addEventListener("click", showSelected);

function showWorstNewCases() {
  showMainScreen(true);
  chrome.storage.local.get("worstNewCases", function (country) {
    chrome.storage.local.get("lastRefreshed", function (lr) {
      let las = new Date(lr.lastRefreshed).toISOString();
      let newCases = document.getElementsByName("newCases")[0];
      let newDeaths = document.getElementsByName("newDeaths")[0];
      let lastUpdated = document.getElementsByName("lastUpdated")[0];
      let countryflag = document.getElementById("flagImage");
      debugger;
      myData = country.worstNewCases;
      countryName.textContent = myData.country;
      newCases.textContent = myData.newCases;
      newDeaths.textContent = myData.newDeaths;
      lastUpdated.textContent = FriendlyDiff(
        new Date(myData.time),
        new Date(las)
      );
      countryflag.src =
        "https://cdn.countryflags.com/thumbs/" +
        myData.country.toLowerCase().replace(" ", "-") +
        "/flag-square-250.png";
    });
  });
}

function topFiveCountries(){
  showMainScreen(false);
  var rows = ` <div class="row">
  <div>1</div>
  <div>1</div>
  <div>1</div>
  <div>1</div>
</div>`;
  document.getElementById('rows').innerHTML = rows;
}

function showMainScreen(showMain){
  if(showMain){
//hide the container2
document.getElementById('topFiveCountries').classList.add(['hidden']);
//show container 3
document.getElementById('covidData').classList.remove(['hidden']);
  }
  else{
    //hide the container2
  document.getElementById('covidData').classList.add(['hidden']);
  //show container 3
  document.getElementById('topFiveCountries').classList.remove(['hidden']);
  }
}
function FriendlyDiff(date1, date2) {
  var diffMinutes = parseInt(((date2 - date1) / 60000).toString());
  switch (true) {
    case (diffMinutes <2):
      return "Just now";
    case diffMinutes < 59:
      return diffMinutes + " minutes ago";
    case diffMinutes < 1440:
      return diffMinutes / 60 + " hour(s) ago";
    default:
      return date1.toLocaleString();
  }
}
function showWorstNewDeaths() {
  showMainScreen(true);
  chrome.storage.local.get("worstDeaths", function (country) {
    chrome.storage.local.get("lastRefreshed", function (lr) {
      let las = new Date(lr.lastRefreshed).toISOString();
      let newCases = document.getElementsByName("newCases")[0];
      let newDeaths = document.getElementsByName("newDeaths")[0];
      let lastUpdated = document.getElementsByName("lastUpdated")[0];
      let countryflag = document.getElementById("flagImage");

      myData = country.worstDeaths;
      countryName.textContent = myData.country;
      newCases.textContent = myData.newCases;
      newDeaths.textContent = myData.newDeaths;
      lastUpdated.textContent = FriendlyDiff(
        new Date(myData.time),
        new Date(las)
      );
      countryflag.src =
        "https://cdn.countryflags.com/thumbs/" +
        myData.country.toLowerCase().replace(" ", "-") +
        "/flag-square-250.png";
    });
  });
}

function showSelected() {
  showMainScreen(true);
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
          myData = covidData.covidData.filter((c) => {
            return (
              c.country.toLowerCase() ===
              country.selectedCountry.toLowerCase().replace(" ", "-")
            );
          })[0];
          var las = new Date(lr.lastRefreshed).toISOString();
          countryName.textContent = myData.country;
          newCases.textContent = myData.cases.new;
          newDeaths.textContent = myData.deaths.new;
          lastUpdated.textContent = FriendlyDiff(
            new Date(myData.time),
            new Date(las)
          );
        }
      });
    });
  });
}
showSelected();
