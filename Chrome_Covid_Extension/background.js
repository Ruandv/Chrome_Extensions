var host = 'covid-193.p.rapidapi.com';
var key = '6ecc44f076msh30d58e7de8079bfp1f17b6jsn5af08e76748d';
chrome.runtime.onInstalled.addListener(function () {

  var alarmCreateInfo = {
    "periodInMinutes": 1
  };

  chrome.alarms.create("CovidUpdate", alarmCreateInfo)

  chrome.alarms.onAlarm.addListener(function () {
    if (host === '' || key === '') {

    }
    const myHeaders = new Headers({
      "x-rapidapi-key": key.apiKey,
      "x-rapidapi-host": host.apiHost,
      "useQueryString": true
    });

    const myRequest = new Request('https://' + host.apiHost + '/statistics', {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    });

    debugger;
    fetch(myRequest)
      .then(response => response.json())
      .then(myBlob => {
        if (myBlob === undefined)
          return;

        var stats = myBlob.response;
        stats = stats.sort((a, b) => {
          return a.country.localeCompare(b.country);
        })
        chrome.storage.local.set({ covidData: stats }, function () {
          console.log(stats);
        })
      });
  })


  chrome.storage.local.get('apiHost', function (data) {
    host = data;
  });

  chrome.storage.local.get('apiKey', function (data) {
    key = data;
  });
});

