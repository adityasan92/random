angular.module('ng-everest')
.controller('MasterCtrl', function($scope,$cookieStore){
  console.log("Hello World");
  $scope.toggleSidebar = function() {
       $scope.toggle = !$scope.toggle;
       //$cookieStore.put('toggle', $scope.toggle);
   };

   window.onresize = function() {
       $scope.$apply();
   };
});
