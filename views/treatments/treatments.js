'use strict';

angular.module('myApp.plantsFungi', ['ngRoute', 'idleTimer', 'ngIdle'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plantsFungi', {
    templateUrl: 'views/plantsFungi/plantsFungiList.html',
    controller: 'PlantsFungiCtrl'
  })
  . when('/plantsFungi/:image', {
    templateUrl: 'views/plantsFungi/plantsFungiFull.html',
    controller: 'PlantsFungiFullCtrl'
  })
  .when('/plantsFungi/:image/:zoom', {
    templateUrl: 'views/plantsFungi/plantsFungiZoom.html',
    controller: 'PlantsFungiZoomCtrl'
  });
}])


/** GALLERY PAGE **/
.controller('PlantsFungiCtrl', ['$location', '$scope', 'Idle', function($location, $scope, Idle) {
  Idle.watch();
  $scope.$location = $location;
}])

/** SINGLE IMAGE FULL **/
.controller('PlantsFungiFullCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomImage = function() {
    var imageLink = '/plantsFungi/'+$scope.image+'/zoom';
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
.controller('PlantsFungiZoomCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomOut = function() {
    var imageLink = '/plantsFungi/'+$scope.image;
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