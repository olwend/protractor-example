'use strict';

angular.module('myApp.geologyPalaeontology', ['ngRoute', 'idleTimer', 'ngIdle'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/geologyPalaeontology', {
    templateUrl: 'views/geologyPalaeontology/geologyPalaeontologyList.html',
    controller: 'GeologyPalaeontologyCtrl'
  })
  . when('/geologyPalaeontology/:image', {
    templateUrl: 'views/geologyPalaeontology/geologyPalaeontologyFull.html',
    controller: 'GeologyPalaeontologyFullCtrl'
  })
  .when('/geologyPalaeontology/:image/:zoom', {
    templateUrl: 'views/geologyPalaeontology/geologyPalaeontologyZoom.html',
    controller: 'GeologyPalaeontologyZoomCtrl'
  });
}])


/** GALLERY PAGE **/
.controller('GeologyPalaeontologyCtrl', ['$location', '$scope', 'Idle', function($location, $scope, Idle) {
  Idle.watch();
  $scope.$location = $location;
}])

/** SINGLE IMAGE FULL **/
.controller('GeologyPalaeontologyFullCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomImage = function() {
    var imageLink = '/geologyPalaeontology/'+$scope.image+'/zoom';
    $location.path(imageLink);
  }

  if($route.current.params.zoom !== undefined ) {
    $scope.zoom = false;
  }

  // Not sure this is needed //
  $scope.$on('$destroy', function() {
    //Idle.unwatch();
  });
}])

/** SINGLE IMAGE ZOOM **/
.controller('GeologyPalaeontologyZoomCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomOut = function() {
    var imageLink = '/geologyPalaeontology/'+$scope.image;
    $location.path(imageLink);
  }

  if($route.current.params.zoom !== undefined ) {
    $scope.zoom = true;
  }

  // Not sure this is needed //
  $scope.$on('$destroy', function() {
    //Idle.unwatch();
  });
}])