'use strict';
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;


global.io.on('connection', function(socket){
  console.log("Socket connection Established with a new client");

  socket.on("Start Node Update", function(){
      console.log("In the start Node update socket method");
      intervalNodeUpdateInfo(socket);
  });

});


function intervalNodeUpdateInfo(socket){
  setInterval(nodeUpdateInfo(socket),5000).bind(this);
}

function nodeUpdateInfo(socket){
  var child = exec('wmic process where caption="node.exe" get processId, commandline, CSName, executablePath, workingsetsize /format:csv',
    function (error, stdout, stderr) {
      if(stdout){
          console.log("The output is: ");
          console.log(stdout);
          var arrOfProcess = stdout.split("\r\r\n");
          var filteredProcess = arrOfProcess.filter(function(value){
            //var temp = value.split(",");
            return value != '';
          });
          console.log(filteredProcess);
          socket.emit("All Node Processes", {processInfo:filteredProcess});
      }else if(stderr){
          console.log("Stderr: " + stderr);
          console.log('exec error: ' + error);
          socket.emit("All Node Processes", {stderr:stderr});
      }else{
          console.log('exec error: ' + error);
          socket.emit("All Node Processes", {error:error});
      }
  });
}
