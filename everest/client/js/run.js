'use strict';

angular.module('ng-everest').run(function($rootScope){

$rootScope.serverSocketCon = io("http://localhost:9999");

});
