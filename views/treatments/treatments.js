'use strict';

angular.module('myApp.treatments', ['ngRoute', 'idleTimer', 'ngIdle'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/treatments', {
    templateUrl: 'views/treatments/treatmentsList.html',
    controller: 'treatmentsCtrl'
  })
  . when('/treatments/:image', {
    templateUrl: 'views/treatments/treatmentsFull.html',
    controller: 'treatmentsFullCtrl'
  })
  .when('/treatments/:image/:zoom', {
    templateUrl: 'views/treatments/treatmentsZoom.html',
    controller: 'treatmentsZoomCtrl'
  });
}])


/** GALLERY PAGE **/
.controller('treatmentsCtrl', ['$location', '$scope', 'Idle', function($location, $scope, Idle) {
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
.controller('treatmentsFullCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomImage = function() {
    var imageLink = '/treatments/'+$scope.image+'/zoom';
    $location.path(imageLink);
  }

  if($route.current.params.zoom !== undefined ) {
    $scope.zoom = false;
  }

  // Not sure this is needed //
  $scope.$on('$destroy', function() {
    Idle.unwatch();
  });
}])

/** SINGLE IMAGE ZOOM **/
.controller('treatmentsZoomCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomOut = function() {
    var imageLink = '/treatments/'+$scope.image;
    $location.path(imageLink);
  }

  if($route.current.params.zoom !== undefined ) {
    $scope.zoom = true;
  }

  // Not sure this is needed //
  $scope.$on('$destroy', function() {
    Idle.unwatch();
  });
}])
