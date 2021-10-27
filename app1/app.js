const http = require('http');
const os = require('os');

const yaml = require('js-yaml');

const fs   = require('fs');

const doc1 = yaml.load(fs.readFileSync('./data/db.yml', 'utf8'));


function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}

console.log("AppRed server starting...");

var handler = function(request, response) {
  console.log("Received request from " + request.connection.remoteAddress);
  response.writeHead(200);
  response.end("<html><head><style>"+
  ".red{color:red} .green{color:green}"+
  "</style></head><body>"+
  "<div class='red'>PodName " + os.hostname() + " running on ip:" +  getIPAddress()  + " DATA:" +   JSON.stringify(doc1)  + "</div>\n"+
  "<div class='green'>PodName " + os.hostname() + " running on ip:" +  getIPAddress()  + " DATA:" +   JSON.stringify(doc1)  + "</div>\n"+
  "</body></head>");
  
};
var www = http.createServer(handler);
www.listen(8080);



