'use strict';

angular.module('myApp.animalKingdom', ['ngRoute', 'idleTimer', 'ngIdle'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/animalKingdom', {
    templateUrl: 'views/animalKingdom/animalKingdomList.html',
    controller: 'AnimalKingdomCtrl'
  })
  . when('/animalKingdom/:image', {
    templateUrl: 'views/animalKingdom/animalKingdomFull.html',
    controller: 'AnimalKingdomFullCtrl'
  })
  .when('/animalKingdom/:image/:zoom', {
    templateUrl: 'views/animalKingdom/animalKingdomZoom.html',
    controller: 'AnimalKingdomZoomCtrl'
  });
}])


/** GALLERY PAGE **/
.controller('AnimalKingdomCtrl', ['$location', '$scope', 'Idle', function($location, $scope, Idle) {
  Idle.watch();
  $scope.$location = $location;
}])

/** SINGLE IMAGE FULL **/
.controller('AnimalKingdomFullCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomImage = function() {
    var imageLink = '/animalKingdom/'+$scope.image+'/zoom';
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
.controller('AnimalKingdomZoomCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomOut = function() {
    var imageLink = '/animalKingdom/'+$scope.image;
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