var request = require('request');
var fs = require('fs');
var dates = [];

var getData = function(index) {
  var date = dates[index];
  console.log('load ' + date + '.json');
  request(`http://data.stats.gov.cn/tablequery.htm?m=QueryData&code=AA0101&wds=%5B%7B%22wdcode%22%3A%22sj%22%2C%22valuecode%22%3A%22${date}%22%7D%5D`, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      fs.writeFileSync(`./AA0101/${date}.json`, body);
      if (index < dates.length) {
        console.log(date + '.json is loaded.')
        getData(index + 1);
      }

    }
  })
}


for (var i = 1998; i < 2017; i++) {
  for (var j = 1; j <= 12; j++) {
    var date = i + ( j < 10 ? '0' : '') + j;
    dates.push(date);
  }
}

getData(0);