'use strict';

angular.module('myApp.landing', ['ngRoute', 'ngAnimate',  'idleTimer', 'ngIdle'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landing', {
    templateUrl: 'views/landing/landing.html',
    controller: 'landingCtrl'
  });
}])


.controller('landingCtrl', ['$location', '$scope', '$rootScope', '$route', '$routeParams', '$animate', 'Idle',
  function($location, $scope, $rootScope, $route, $routeParams, $animate, Idle)
  {

    /** SWIPE TO BE REMOVED **/

    /*
    $scope.swipeLeft = function () {
      //$('#content').addClass('swipeLeft');
      $rootScope.animationClass = 'swipeLeft';
      $location.path('/britain');
    };
    $scope.swipeRight = function () {
      //$('#content').addClass('swipeRight');
      $rootScope.animationClass = 'swipeRight';
      $location.path('/counties');
    };
    */

    //console.log('controller entered');
    Idle.watch();
    $scope.$location = $location;
    //console.log($animate.enabled());
 }])
