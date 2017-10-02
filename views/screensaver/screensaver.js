'use strict';

angular.module('myApp.screensaver', ['ngRoute', 'ngIdle'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/screensaver', {
    templateUrl: 'views/screensaver/screensaver.html',
    controller: 'screensaverCtrl'
  });
}])

.controller('screensaverCtrl', ['$rootScope', '$location', '$scope', '$route', 'Idle', function($rootScope, $location, $scope, $route, Idle) {

        //ga('set', { userId: ($rootScope.userID + 1) });
        //ga('send', 'event', {'sessionControl': 'start'});

    // Idle.unwatch();



      $scope.$location = $location;  //so html can see the '$location' object


}]);
