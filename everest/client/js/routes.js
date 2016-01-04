'use strict';


angular.module('ng-everest').config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){

//For unwatched routes
$urlRouterProvider.otherwise('/');

$stateProvider
.state('index', {
  url:'/',
  templateUrl:'templates/dashboard.html'
})
.state('mercury', {
  url:'/mercury',
  controller:'nodeCtrl',
  templateUrl:'templates/nodeProcess.html'
})

}]);
