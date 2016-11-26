var fs = require('fs');

var getJSONFromFile = function(name) {
  var json = fs.readFileSync(name);
  return JSON.parse(json);
}

var saveJSONToFile = function(name, data) {
  fs.writeFileSync(name, data);
}

var loopFiles = function() {
  for (var i = 1998; i < 2017; i++) {
    for (var j = 1; j <= 12; j++) {
      var date = i + ( j < 10 ? '0' : '') + j;

      var data = filterData(getJSONFromFile(date + '.json'));
      saveJSONToFile('./data/' + date + '.json', JSON.stringify(data, null, 2));
      saveJSONToFile('./data/' + date + '.min.json', JSON.stringify(data));
    }
  }
}

var filterData = function(data) {
  data = data.exceltable;
  var begin = false;
  var result = [];
  var temp = {};
  for (var i = 0; i < data.length; i++) {

    var node = data[i];
    if (node.data === '北京市') {
      begin = true;
    }
    if (!begin) continue;

    if (node.col === 0) {
      temp['地区'] = node.data;
      temp['新建住宅价格指数'] = {
        "环比": '',
        "同比": '',
        "定基": '',
        "新建商品住宅价格指数": {
          "环比": '',
          "同比": '',
          "定基": '',
        }
      }
      temp['二手住宅价格指数'] = {
        "环比": '',
        "同比": '',
        "定基": '',
      }
    }

    if (node.col === 1) {
      temp['新建住宅价格指数']['环比'] = node.data;
      console.log('node.data:' + node.data)
    }
    if (node.col === 2) {
      temp['新建住宅价格指数']['同比'] = node.data;
    }
    if (node.col === 3) {
      temp['新建住宅价格指数']['定基'] = node.data;
    }

    if (node.col === 4) {
      temp['新建住宅价格指数']['新建商品住宅价格指数']['环比'] = node.data;
    }
    if (node.col === 5) {
      temp['新建住宅价格指数']['新建商品住宅价格指数']['同比'] = node.data;
    }
    if (node.col === 6) {
      temp['新建住宅价格指数']['新建商品住宅价格指数']['定基'] = node.data;
    }

    if (node.col === 7) {
      temp['二手住宅价格指数']['环比'] = node.data;
    }
    if (node.col === 8) {
      temp['二手住宅价格指数']['同比'] = node.data;
    }
    if (node.col === 9) {
      temp['二手住宅价格指数']['定基'] = node.data;
      result.push(temp);
      temp = {};
    }
  }
  return result;
  // console.log(JSON.stringify(result, null, 2));
}
loopFiles();
// filterData(getJSONFromFile('201403.json'));
