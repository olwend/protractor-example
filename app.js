'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.landing',
  'myApp.screensaver',
  'myApp.imgLoader',
  'myApp.symptomsAndOutcome',
  'myApp.treatments',
  'ngIdle',
  'idleTimer',
  'modal',
  'ngSanitize',
  'ngTouch'
  ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/screensaver'});
}])



.run( function ($rootScope, preloader, $document, $location) {

  console.log('app run');
  $rootScope.mouseHide = true;
  //$rootScope.userID = 1;


  /** on page change stuff - GA call and cursor display check */
  $rootScope.$on('$viewContentLoaded', function() {
    //console.log('view content loaded');
    if($location.path().indexOf("screensaver") == -1) {
      //console.log('sending GA');
      // ga('send', 'pageview', $location.path());
      // visitor.pageview( $location.path(), function(err) {
      //   console.log('analytics error:' + err);
      // });
    }

    if ($rootScope.mouseHide === false) {
      console.log('show cursor');
      $('*').css('cursor', 'default');
    }
  });


  /** listener for mouse cursor toggle - 'M'   **/
  $document.bind("keypress", function(event) {
    //console.log(event);
    if(event.keyCode === 109) {
      if($rootScope.mouseHide) {
        $('*').css('cursor', 'default');
        $rootScope.mouseHide = false;
      } else {
        //console.log('hide mouse');
        $('*').css('cursor', 'url(images/1percent.png), none');
        $rootScope.mouseHide = true;
      }
    }
  });



  // I keep track of the state of the loading images.
  $rootScope.isLoading = true;
  $rootScope.isSuccessful = false;
  $rootScope.percentLoaded = 0;
  // I am the image SRC values to preload and display./

  // --
  // NOTE: "cache" attribute is to prevent images from caching in the
  // browser (for the sake of the demo).

  $rootScope.imageLocations = [

  ( "images/landing/symptoms-and-outcome.jpg" ),
  ( "images/landing/treatments.jpg" )
];

  // Preload the images; then, update display when returned.
  preloader.preloadImages($rootScope.imageLocations).then(
    function handleResolve(imageLocations) {
      // Loading was successful.
      $rootScope.isLoading = false;
      $rootScope.isSuccessful = true;
      console.info("Preload Successful");
    },

    function handleReject(imageLocation) {
      // Loading failed on at least one image.
      $rootScope.isLoading = false;
      $rootScope.isSuccessful = false;
      console.error("Image Failed", imageLocation);
      console.info("Preload Failure");
    },

    function handleNotify(event) {
      $rootScope.percentLoaded = event.percent;
      console.info("Percent loaded:", event.percent);
    }
  );

}) // END .run FUNCTION



  /* this prevents a view change while a view transition is still running */
.directive("animationBlock",  ['$animate', function($animate) {

  function link(scope, element) { //?
  }
  return {
    restrict: "AE",
    link: link,
    controller:function($scope, $rootScope, $element){
      var unbindHandler = null;
      $scope.phase = 'enter';

      var locationChangeHandler =  function (event) {
        if($scope.phase === 'start') {
          //console.log('enter: prevent link');
          event.preventDefault();
        }
      };

      $scope.$on('$locationChangeStart',locationChangeHandler);

      $animate.on('leave', $element, function(container, phase) {
      //console.log('leave transition event');
      //console.log('phase:' + phase);
      if (phase === 'close' && container.find('video')[0] ) {
        console.log('src='+  container.find('video')[0].src )
        container.find('video')[0].pause();
        container.find('video')[0].src = "";
        console.log('src=' + container.find('video')[0].src )
      }
      });

      $animate.on('enter',  $element, function(container, phase) {
        //console.log('enter transition event');
        //console.log('phase:' + phase);
        $scope.phase = phase;
      });
    }
  };
}])

