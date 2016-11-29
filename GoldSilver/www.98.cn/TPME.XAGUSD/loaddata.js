var request = require('request');
var fs = require('fs');
var dates = [];

var getData = function(index) {
  var date = dates[index];
  console.log(`load ${date.start}-${date.end}.json`);
  request(`http://api.baidao.com/api/hq/dkdata.do?sid=TPME.XAGUSD&quotationType=1&tradedate=${date.end + 1}+06%3A00%3A00&_=1480389016568`, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      fs.writeFileSync(`./data/${date.start}-${date.end}.json`, body);
      console.log(`./data/${date.start}-${date.end}.json loaded`)
      if (index + 1 < dates.length) {
        getData(index + 1);
      }

    }
  })
}

var format = function(date) {
  var d = new Date(date);
  var year = d.getFullYear()
  var month = d.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var date = d.getDate();
  date = date < 10 ? '0' + date : date;
  return year + '' + month + '' + date;
}

var interval = 427 * 24 * 60 * 60 * 1000;
var onday = 1 * 24 * 60 * 60 * 1000;
var today = new Date('2016-11-29').getTime();
var firstDay = new Date('2006-04-28').getTime();

for (var i = today; i > firstDay; i -= interval) {

  dates.push({
    start: format(i - interval - onday),
    end: format(i - onday)
  });
}

/*
最长时间跨度
2015-09-28
2016-11-28
var a = new Date('2016-11-28').getTime() - new Date('2015-09-28').getTime();
a / (24 * 60 * 60 * 1000)
427
 */
getData(0);
