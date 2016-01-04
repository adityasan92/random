'use strict';
// require modules
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

exports.getNodeProcess = function(req, res){
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
          res.send({processInfo:filteredProcess});
      }else if(stderr){
          console.log("Stderr: " + stderr);
          console.log('exec error: ' + error);
          res.send({stderr:stderr});
      }else{
          console.log('exec error: ' + error);
          res.send({error:error});
      }
  });
};
