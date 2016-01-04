var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.createServer(app);
global.io = require('socket.io').listen(httpServer);

var edge = require('edge');

app.use(express.static(__dirname + '/client'));
require('./server/routes/mainRoute')(app);
require('./server/routes/socketRoutes');



console.log("Server on port 9999")
httpServer.listen(9999);
