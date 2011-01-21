var http = require('http');
var fs  = require('fs');

function saveData() {
  var map = {};
  fs.readFile('todo.txt', function(err, data) {
    if (err)  {
        throw err;
    }
    if (data) {
      map = JSON.parse(data);
    }
  });
  console.log(map.house);
  return map;
}

function saveFileAsJSON(map) {
    fs.writeFile('todo.txt', JSON.stringify(map), function(err) {
      if (err) {
        throw err;
      }
    });
}

function addTask(params) {
  var dataMap = readFileAsMap();
  
  var groupName = params.group;

  var group = dataMap[groupName];

  if (! group) {
    group = [];
    dataMap[groupName] = group;
  }
  dataMap[groupName][group.length] = params.task;

  saveFileAsJSON(dataMap);
}

function removeTask(message) {
}

var actionFunctions = {
  add: addTask
};

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Message Received');

    var params = require('url').parse(req.url, true);
    var action = params.pathname.slice(1);
    console.log(actionFunctions);
    actionFunctions[action](params.query);

}).listen(8124, "127.0.0.1");

console.log('Server running at http://127.0.0.1:8124/');
