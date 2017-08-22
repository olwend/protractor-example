'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.landing',
  'myApp.screensaver',
  'myApp.imgLoader',
  'myApp.animalKingdom',
  'myApp.geologyPalaeontology',
  'myApp.plantsFungi',
  'myApp.bookPreview',
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

  ( "images/landing/animalKingdom_landing.jpg" ),
  ( "images/landing/geologyPalaeontology_landing.jpg" ),
  ( "images/landing/plantsFungi_landing.jpg" ),


  ( "images/animalKingdom/full/1.1.jpg" ),
  ( "images/animalKingdom/full/1.2.jpg" ),
  ( "images/animalKingdom/full/1.3.jpg" ),
  ( "images/animalKingdom/full/1.4.jpg" ),
  ( "images/animalKingdom/full/1.5.jpg" ),
  ( "images/animalKingdom/full/1.6.jpg" ),
  ( "images/animalKingdom/full/1.7.jpg" ),
  ( "images/animalKingdom/full/1.8.jpg" ),
  ( "images/animalKingdom/full/1.9.jpg" ),
  ( "images/animalKingdom/full/1.10.jpg" ),
  ( "images/animalKingdom/full/1.11.jpg" ),
  ( "images/animalKingdom/full/1.12.jpg" ),
  ( "images/animalKingdom/full/1.13.jpg" ),
  ( "images/animalKingdom/full/1.14.jpg" ),
  ( "images/animalKingdom/full/1.15.jpg" ),
  ( "images/animalKingdom/full/1.16.jpg" ),

  ( "images/animalKingdom/thumbs/1.1.jpg" ),
  ( "images/animalKingdom/thumbs/1.2.jpg" ),
  ( "images/animalKingdom/thumbs/1.3.jpg" ),
  ( "images/animalKingdom/thumbs/1.4.jpg" ),
  ( "images/animalKingdom/thumbs/1.5.jpg" ),
  ( "images/animalKingdom/thumbs/1.6.jpg" ),
  ( "images/animalKingdom/thumbs/1.7.jpg" ),
  ( "images/animalKingdom/thumbs/1.8.jpg" ),
  ( "images/animalKingdom/thumbs/1.9.jpg" ),
  ( "images/animalKingdom/thumbs/1.10.jpg" ),
  ( "images/animalKingdom/thumbs/1.11.jpg" ),
  ( "images/animalKingdom/thumbs/1.12.jpg" ),
  ( "images/animalKingdom/thumbs/1.13.jpg" ),
  ( "images/animalKingdom/thumbs/1.14.jpg" ),
  ( "images/animalKingdom/thumbs/1.15.jpg" ),
  ( "images/animalKingdom/thumbs/1.16.jpg" ),


  ( "images/plantsFungi/full/2.1.jpg" ),
  ( "images/plantsFungi/full/2.2.jpg" ),
  ( "images/plantsFungi/full/2.3.jpg" ),
  ( "images/plantsFungi/full/2.4.jpg" ),
  ( "images/plantsFungi/full/2.5.jpg" ),
  ( "images/plantsFungi/full/2.6.jpg" ),
  ( "images/plantsFungi/full/2.7.jpg" ),
  ( "images/plantsFungi/full/2.8.jpg" ),
  ( "images/plantsFungi/full/2.9.jpg" ),
  ( "images/plantsFungi/full/2.10.jpg" ),
  ( "images/plantsFungi/full/2.11.jpg" ),
  ( "images/plantsFungi/full/2.12.jpg" ),
  ( "images/plantsFungi/full/2.13.jpg" ),
  ( "images/plantsFungi/full/2.14.jpg" ),
  ( "images/plantsFungi/full/2.15.jpg" ),
  ( "images/plantsFungi/full/2.16.jpg" ),

  ( "images/plantsFungi/thumbs/2.1.jpg" ),
  ( "images/plantsFungi/thumbs/2.2.jpg" ),
  ( "images/plantsFungi/thumbs/2.3.jpg" ),
  ( "images/plantsFungi/thumbs/2.4.jpg" ),
  ( "images/plantsFungi/thumbs/2.5.jpg" ),
  ( "images/plantsFungi/thumbs/2.6.jpg" ),
  ( "images/plantsFungi/thumbs/2.7.jpg" ),
  ( "images/plantsFungi/thumbs/2.8.jpg" ),
  ( "images/plantsFungi/thumbs/2.9.jpg" ),
  ( "images/plantsFungi/thumbs/2.10.jpg" ),
  ( "images/plantsFungi/thumbs/2.11.jpg" ),
  ( "images/plantsFungi/thumbs/2.12.jpg" ),
  ( "images/plantsFungi/thumbs/2.13.jpg" ),
  ( "images/plantsFungi/thumbs/2.14.jpg" ),
  ( "images/plantsFungi/thumbs/2.15.jpg" ),
  ( "images/plantsFungi/thumbs/2.16.jpg" ),

  ( "images/geologyPalaeontology/full/3.1.jpg" ),
  ( "images/geologyPalaeontology/full/3.2.jpg" ),
  ( "images/geologyPalaeontology/full/3.3.jpg" ),
  ( "images/geologyPalaeontology/full/3.4.jpg" ),
  ( "images/geologyPalaeontology/full/3.5.jpg" ),
  ( "images/geologyPalaeontology/full/3.6.jpg" ),
  ( "images/geologyPalaeontology/full/3.7.jpg" ),
  ( "images/geologyPalaeontology/full/3.8.jpg" ),
  ( "images/geologyPalaeontology/full/3.9.jpg" ),
  ( "images/geologyPalaeontology/full/3.10.jpg" ),
  ( "images/geologyPalaeontology/full/3.11.jpg" ),
  ( "images/geologyPalaeontology/full/3.12.jpg" ),
  ( "images/geologyPalaeontology/full/3.13.jpg" ),
  ( "images/geologyPalaeontology/full/3.14.jpg" ),
  ( "images/geologyPalaeontology/full/3.15.jpg" ),
  ( "images/geologyPalaeontology/full/3.16.jpg" ),

  ( "images/geologyPalaeontology/thumbs/3.1.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.2.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.3.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.4.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.5.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.6.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.7.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.8.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.9.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.10.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.11.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.12.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.13.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.14.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.15.jpg" ),
  ( "images/geologyPalaeontology/thumbs/3.16.jpg" )

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


//directives remove the '-' and camelcase the suffix compared to the directive name used in the html (cropbox-dir), nice and obvious...
//this sets up the cropbox jquery object on the zoom image
.directive('cropboxDir', function()
{
  return {
    // Restrict it to be an attribute in this case
    restrict: 'A',
    // responsible for registering DOM listeners as well as updating the DOM

    link:  function (scope, element, attrs) {
      //this fixes it by forcing angular compile for the scope variable, but throws a 'digest already in progress error'
      //scope.$apply();

      $(element).attr('src', attrs.src);
      //console.log( $(element).attr('src'));

      $(element).cropbox(
          {
              width: 1920,
              height: 1055,
              showControls: 'never',
              zoom: 1
          }, function () {
              //onload
              //console.log('cropbox loaded');
              this.zoom(1);
              this.update();
          }
      );

      //line below was causing a memory leak
      //var crop = $(element).data('cropbox');

      // this is being called at the start of the transition animation so means the big image is repositioned to it's static position
      /*
       scope.$on('$destroy', function() {
       console.log('removing cropbox instance');
       crop.remove();
       });
       */

    }
  };
});
