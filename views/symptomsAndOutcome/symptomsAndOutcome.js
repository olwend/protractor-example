'use strict';

angular.module('myApp.symptomsAndOutcome', ['ngRoute', 'idleTimer', 'ngIdle'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/symptomsAndOutcome', {
    templateUrl: 'views/symptomsAndOutcome/symptomsAndOutcomeList.html',
    controller: 'symptomsAndOutcomeCtrl'
  });
}])


/** GALLERY PAGE **/
.controller('symptomsAndOutcomeCtrl', ['$location', '$scope', 'Idle', function($location, $scope, Idle) {
  Idle.watch();
  $scope.$location = $location;

  $scope.color = {
   'color': '#ffce42'
 };
   $scope.chcolor = function() {
     $scope.color = {
     'color': '#ffce42'
     };
 };

 $scope.$on('$destroy', function() {
   //Idle.unwatch();
 });

}])

/** SINGLE IMAGE FULL **/
.controller('symptomsAndOutcomeFullCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomImage = function() {
    var imageLink = '/symptomsAndOutcome/'+$scope.image+'/zoom';
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
.controller('symptomsAndOutcomeZoomCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomOut = function() {
    var imageLink = '/symptomsAndOutcome/'+$scope.image;
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
