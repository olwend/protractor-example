'use strict';

angular.module('myApp.bookPreview', ['ngRoute', 'idleTimer', 'ngIdle'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bookPreview', {
    templateUrl: 'views/bookPreview/bookPreviewList.html',
    controller: 'BookPreviewCtrl'
  })
  . when('/bookPreview/:image', {
    templateUrl: 'views/bookPreview/bookPreviewFull.html',
    controller: 'BookPreviewFullCtrl'
  })
  .when('/bookPreview/:image/:zoom', {
    templateUrl: 'views/bookPreview/bookPreviewZoom.html',
    controller: 'BookPreviewZoomCtrl'
  });
}])


/** GALLERY PAGE **/
.controller('BookPreviewCtrl', ['$location', '$scope', 'Idle', function($location, $scope, Idle) {
  Idle.watch();
  $scope.$location = $location;
}])

/** SINGLE IMAGE FULL **/
.controller('BookPreviewFullCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomImage = function() {
    var imageLink = '/bookPreview/'+$scope.image+'/zoom';
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
.controller('BookPreviewZoomCtrl', ['$location', '$scope', '$route', 'Idle', function($location, $scope, $route, Idle) {
  Idle.watch();
  $scope.$location = $location;

  if($route.current.params.image !== undefined ) {
    $scope.image = $route.current.params.image;
  }

  $scope.zoomOut = function() {
    var imageLink = '/bookPreview/'+$scope.image;
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