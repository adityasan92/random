angular.module('ng-everest')
.controller('nodeCtrl', function($scope,$http,$log,$rootScope){
var tempRow = [];
$scope.headers = [];

$rootScope.serverSocketCon.emit("Start Node Update",{});
// getting information about the node processes present on the server
$rootScope.serverSocketCon.on("All Node Processes", function(data){

});

$http.get('/getNodeProcess').then(function(res){
  console.log(res);
  if(res.data.processInfo){
    processNodeData(res.data.processInfo);
  }

});

function processNodeData(matrix){

  //Header Processing
  $scope.headers = matrix[0].split(",");
  console.log($scope.headers);

  //Data of the node processes
  for(var i=1; i<matrix.length; i++){
    tempRow[i-1] = [];
    tempRow[i-1] = matrix[i].split(",");
  }
  console.log(tempRow);
  $scope.rows = tempRow;
}


});
