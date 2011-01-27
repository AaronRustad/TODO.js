var http = require('http');
var fs  = require('fs');

function addTask(params, callback) {
     fs.readFile('todo.txt', function(err, data) {
       if (err) {
         throw err;
       }
       var dataMap = {};
       if(data.length !== 0) {
         dataMap = JSON.parse(data);
       }
       var groupName = params.group;

       var group = dataMap[groupName];
       if (! group) {
            group = [];
            dataMap[groupName] = group;
       }
       dataMap[groupName][group.length] = params.task;

       result = JSON.stringify(dataMap);
       fs.writeFileSync('todo.txt', result);
       callback(data);
     });
}

var actionFunctions = {
  add: addTask
};

http.createServer(function (req, res) {
    var params = require('url').parse(req.url, true);
    var action = params.pathname.slice(1);

    var data = null;
    if (params.query) {
      actionFunctions[action](params.query, function(data) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(data);
      });
    }


}).listen(8124, "127.0.0.1");

console.log('Server running at http://127.0.0.1:8124/');
