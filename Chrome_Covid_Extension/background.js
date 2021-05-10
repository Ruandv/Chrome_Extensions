var host = "covid-193.p.rapidapi.com";
var key = "";
chrome.runtime.onInstalled.addListener(function () {
  var alarmCreateInfo = {
    periodInMinutes: 0.1,
  };

  chrome.alarms.create("CovidUpdate", alarmCreateInfo);

  chrome.alarms.onAlarm.addListener(function () {
    if (host === "" || key === "") {
      console.log("Host or Key is empty!!!");
      return;
    }

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

    fetch(myRequest)
      .then((response) => response.json())
      .then((myBlob) => {
        if (myBlob === undefined) return;
        var lastRefreshed = (new Date()).toISOString();
        var stats = myBlob.response;
        stats = stats.sort((a, b) => {
          return a.country.localeCompare(b.country);
        });

        chrome.storage.local.set(
          { covidData: stats,lastRefreshed  },
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
