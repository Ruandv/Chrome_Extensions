var host = "covid-193.p.rapidapi.com";
var key = "";

chrome.runtime.onInstalled.addListener(function () {
  var alarmCreateInfo = {
    periodInMinutes:5,
  };

  chrome.alarms.create("CovidUpdate", alarmCreateInfo);

  chrome.alarms.onAlarm.addListener(function () {
    if (host === "" || key === "") {
      console.log("Host or Key is empty!!!");
      return;
    }
    var notAllowed = ['Africa','All',"Asia","Europe",'South-America','North-America'];

    const myHeaders = new Headers({
      "x-rapidapi-key": key.apiKey,
      "x-rapidapi-host": host.apiHost,
      useQueryString: true,
    });

    const myRequest = new Request("https://" + host.apiHost + "/statistics", {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    });
    const worstNewCases = async (data) => {
      var a = data.reduce(isWorse, { country: "", newCases: 0 });
      return a;
    };
    const worstNewDeaths = async (data) => {
      var a = data.reduce(isWorseDeaths, { country: "", newDeaths: 0 });
      return a;
    };

    function isWorseDeaths(country, countryData) {
      if (notAllowed.indexOf(countryData.country)<0) {
        if (parseInt(country.newDeaths)< parseInt(countryData.deaths.new)) {
          var a = {
            country: countryData.country,
            newCases: countryData.cases.new,
            newDeaths : countryData.deaths.new,
            time :new Date(countryData.time).toLocaleString()
          };
          return a;
        }
      }
      return country;
    }

    function isWorse(country, countryData) {
      if (notAllowed.indexOf(countryData.country)<0) {
        if (parseInt(country.newCases)< parseInt(countryData.cases.new)) {
          var a = {
            country: countryData.country,
            newCases: countryData.cases.new,
            newDeaths : countryData.deaths.new,
            time :new Date(countryData.time).toLocaleString()
          };
          return a;
        }
      }
      return country;
    }

    fetch(myRequest)
      .then((response) => response.json())
      .then((myBlob) => {
        if (myBlob === undefined) return;
        var lastRefreshed = new Date().toISOString();
        var stats = myBlob.response;
        stats = stats.sort((a, b) => {
          return a.country.localeCompare(b.country);
        });
        worstNewCases(stats).then((result) => {
          chrome.storage.local.set(
            { worstNewCases: result },
            function () {
              console.log("WORST New cases : " + JSON.stringify(result));
            }
          );
        });
        worstNewDeaths(stats).then((result) => {
          chrome.storage.local.set(
            { worstDeaths: result },
            function () {
              console.log("WORST Deaths : " + JSON.stringify(result));
            }
          );
        });

        chrome.storage.local.set(
          { covidData: stats, lastRefreshed },
          function () {
            console.log(stats);
          }
        );
      });
  });

  chrome.storage.local.get("apiHost", function (data) {
    host = data;
  });

  chrome.storage.local.get("apiKey", function (data) {
    key = data;
  });
});
