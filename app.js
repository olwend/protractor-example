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


//directives remove the '-' and camelcase the suffix compared to the directive name used in the html (cropbox-dir), nice and obvious...
//this sets up the cropbox jquery object on the zoom image
.directive('micrioDir', function()
{
  return {
    // Restrict it to be an attribute in this case
    restrict: 'A',
    // responsible for registering DOM listeners as well as updating the DOM

    link:  function (scope, element, attrs) {

    //addEventListener('DOMContentLoaded',function(){
    console.log("what's happening?");


        var micrio = new Micrio({
            // Image ID, required
            id: attrs.micrioid,
            //// Optional settings
            // HTML element to put the image in, defaults to <body>
            container: document.getElementById('container'),
            // Listen to touch and mouse events, defaults to true
            hookEvents: true,
            fullScreen: false,

            toolBar: false,

            noLogo: true,
            // Initializes and draws image on instance creation, defaults to true
            autoInit: true,
            // Creates a fully interactive minimap, defaults to false
            miniMap: false,
            // How to render the initial view, like CSS background-size
            // 'cover' or 'contain'. Defaults to 'contain'.
            initType: 'contain',
            // Opens the image at a specified view rectangle [x0, y0, x1, y1]
            startView: [.25,.25,.75,.75],


        });

        // The element fires a 'show' event when the initial image is
        // fully downloaded
        var element = document.getElementById('container');

        // The Micrio Javascript instance is [element].micrio


        element.addEventListener('loaded', function(){
            console.info('loaded');

        });


         element.addEventListener('metadata', function(e) {
              console.log('got all markers!', e.detail);

            // micrio.markers._container autoscales and moves based on the current viewport
            micrio.el.appendChild(micrio.markers._container);

            // Loop through the markers
            for(var i=0;i<micrio.markers.items.length;i++) {
                var marker = micrio.markers.items[i];

                console.log('Marker data...', marker.json);

                var view = marker.json.view; // the viewport [x1,y1,x2,y2]
                var width = view[2]-view[0];
                var height = view[3]-view[1];

                // Make a <div> of the area
                var _area = document.createElement('div');
                _area.className = 'area';
                _area.setAttribute('id', 'area_' +  marker.json.id);

                // Set style pixel values
                _area.style.width = width * micrio.width + 'px';
                _area.style.height = height * micrio.height + 'px';
                _area.style.left = view[0] * micrio.width + 'px';
                _area.style.top = view[1] * micrio.height + 'px';

                // Put the div inside the markers container which does the rest of the work
                micrio.markers._container.appendChild(_area);
            }

        });



            element.addEventListener('show', function(){
            console.info('The image is fully loaded for display');
            //toggle audio off as default is true;

            setTimeout(function(){ micrio.audio.stop(); }, 900000000);


            // Remove the 'loading' class from the body
            document.body.classList.remove('loading');

        });




        // Catch clicks on markers, and do a custom camera transition
        element.addEventListener('click', function(e) {

            // If the clicked element isn't a marker, do nothing
            if(e.target && e.target.marker) {
                e.stopPropagation();
                micrio.camera.stop();
                // The actual JS instance of the marker
                var marker = e.target.marker;
                console.info('Clicked a marker!', marker);
                // The marker json data
                var json = marker.json;
                console.info('This is the original marker JSON', json);

                console.info('This is the original marker JSON.view', json.view);



                marker.open();
                // Do anything custom here
                console.info('Clicked a custom marker! The body text is: ', json.body);
                // Example custom camera transition:

                var offset = (marker.popup.h.clientWidth/micrio.container.clientWidth)/2;


                micrio.camera.flyTo((json.x + offset), json.y, 0.2, 1000);

                document.getElementById("area_" +json.id).classList.toggle('show');


                console.log('class:' + event.target.className);
                //if(event.target.className === 'close fa fa-close');
                //happy easter
                if(marker.class === "chicken")
                {
                    var chickenTimer = setTimeout(function(){ micrio.audio.start(); }, 5000);
                }




              }

            else if(event.target.className === 'close fa fa-close') {
                clearTimeout(chickenTimer);
                micrio.audio.stop();
                micrio.camera.flyToFullView(1000);

               var areas=  document.getElementsByClassName("area");


                for (var i = 0; i < areas.length; i++) {
                   areas[i].classList.remove('show');
                }


            }

            else
            { return; }



        }, false); // Make the sure event bubbles to capture the click




 //   });

    }
  };
});
