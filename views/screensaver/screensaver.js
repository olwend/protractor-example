'use strict';

angular.module('myApp.screensaver', ['ngRoute', 'ngIdle'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/screensaver', {
    templateUrl: 'views/screensaver/screensaver.html',
    controller: 'screensaverCtrl'
  });
}])

.controller('screensaverCtrl', ['$rootScope', '$location', '$scope', '$route', '$http', 'Idle', function($rootScope, $location, $scope, $route, $http, Idle) {

        //ga('set', { userId: ($rootScope.userID + 1) });
        //ga('send', 'event', {'sessionControl': 'start'});
$scope.check = function() {

console.log('entered')
  
    $http({
  method: 'GET',
  url: 'https://b.micr.io/LExiG/3/0-0.jpg'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log('works');
    $location.path('/landing');
  }, function errorCallback(response) {
  	console.log('check server');
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    $('#micrioError').css('display', 'block');
  });

};



      $scope.$location = $location;  //so html can see the '$location' object


}]);
