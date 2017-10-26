/**
 * Created by dhis on 19/10/2017.
 */

angular.module('myApp')
//directives remove the '-' and camelcase the suffix compared to the directive name used in the html (cropbox-dir), nice and obvious...
//this sets up the cropbox jquery object on the zoom image
.directive('micrioDir', ['$timeout', function($timeout)
{
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM

        link:  function (scope, element, attrs) {

            var startZoom = 0;

            var cameraXList = {"1-1": 0.2000633613179154, "1-2": 0.8528945872662386, "2-1": 0.2990349839842413, "2-2": 0.2580214966513812, "2-3": 0.2790161414296695 };
            var cameraYList = {"1-1": 0.28501055594651653, "1-2": 0.7310648671158269, "2-1": 0.7850137021549736, "2-2": 0.8210767244969491, "2-3": 0.1404872853148715 };
            var cameraZoomList = {"1-1": 0.5, "1-2": 0.68, "2-1": 0.3969906462191357, "2-2": 0.51, "2-3": 0.7 };



            scope.micrio = new Micrio({
                // Image ID, required
                id: attrs.micrioid,
                //// Optional settings
                // HTML element to put the image in, defaults to <body>
                container: document.getElementById(attrs.id),
                // Listen to touch and mouse events, defaults to true
                hookEvents: true,
                fullScreen: false,
                toolBar: false,
                loaderBar: false,
                noLogo: true,
                // Initializes and draws image on instance creation, defaults to true
                autoInit: true,
                // Creates a fully interactive minimap, defaults to false
                miniMap: false,
                // How to render the initial view, like CSS background-size
                // 'cover' or 'contain'. Defaults to 'contain'.
                initType: 'contain',
                zoomLimit: 0.7

            });

            // The element fires a 'show' event when the initial image is
            // fully downloaded
            scope.element = document.getElementById(attrs.id);

            // The Micrio Javascript instance is [element].micrio

            scope.element.addEventListener('loaded', function(){
                console.info('loaded');

            });


            scope.element.addEventListener('metadata', function(e) {
                console.log('got all markers!', e.detail);


                // micrio.markers._container autoscales and moves based on the current viewport
                scope.micrio.el.appendChild(scope.micrio.markers._container);


                // Loop through the markers
                for(var i=0;i<scope.micrio.markers.items.length;i++) {
                    var marker = scope.micrio.markers.items[i];

                    marker._container.childNodes[0].innerHTML = marker.class.substring(2,3);

                   /*
                    console.log('Marker data...', marker.json);

                    var view = marker.json.view; // the viewport [x1,y1,x2,y2]
                    var width = view[2]-view[0];
                    var height = view[3]-view[1];

                    // Make a <div> of the area
                    var _area = document.createElement('div');
                    _area.className = 'area';
                    _area.setAttribute('id', 'area_' +  marker.json.id);

                    // Set style pixel values
                    _area.style.width = width * scope.micrio.width + 'px';
                    _area.style.height = height *  scope.micrio.height + 'px';
                    _area.style.left = view[0] *  scope.micrio.width + 'px';
                    _area.style.top = view[1] *  scope.micrio.height + 'px';

                    // Put the div inside the markers container which does the rest of the work
                    scope.micrio.markers._container.appendChild(_area);
                    */
                }

            });




            scope.element.addEventListener('show', function(){
                console.info('The image is fully loaded for display');
                //micrio.camera.flyTo(0.5, 0.5, startZoom, 0);  //load into this zoom level and view

            });


            scope.showHotspot = function(id) {
                if(!scope.disableHotspots)
                    {
                    console.log('showHotspot');
                    $(".class-" + id + " .marker").trigger("click");
                   }
            }


            scope.disableHotspots = false;

            // Catch clicks on markers, and do a custom camera transition
            scope.element.addEventListener('click', function(e) {

                console.log('current camera position:' + scope.micrio.camera.ba);

                // If the clicked element isn't a marker, do nothing
                if(e.target && e.target.marker ) {

                    /*  disable all markers */

                    e.stopPropagation();
                    e.preventDefault();
                    scope.micrio.camera.stop();

                    if(!scope.disableHotspots) {

                         scope.disableHotspots = true;
                         $('.marker-container .marker').css('pointer-events', 'none');
                         scope.micrio.camera.events.unhook();   //this disabled controls

                            //micrio.el.addEventListener('mousewheel','mousedrag', zoomHandler, true);
                            // The actual JS instance of the marker
                            var marker = e.target.marker;
                            console.info('Clicked a marker!', marker);
                            // The marker json data
                            var json = marker.json;
                            //console.info('This is the original marker JSON', json);

                            var selected = marker.json.class;

                            marker.open();
                            // Do anything custom here
                            console.info('Clicked a custom marker! The body text is: ', json.body);
                            // Example custom camera transition:

                            //var offset = (marker.popup._container.clientWidth / scope.micrio.container.clientWidth) / 2;

                            scope.micrio.camera.flyTo((cameraXList[selected]), (cameraYList[selected]), cameraZoomList[selected], 1500);

                            $('#span-' + selected).addClass('selected');

                            for (var i = 0; i < scope.micrio.markers.items.length; i++) {
                                if (scope.micrio.markers.items[i].class === selected) {
                                    /* show area box */
                                    //document.getElementById("area_" + scope.micrio.markers.items[i].id).classList.toggle('show');
                                    var filterClass = 'show' + selected;
                                    $('#filter').addClass(filterClass);
                                }
                                else {
                                    //document.getElementById("area_" + scope.micrio.markers.items[i].id).classList.remove('show');
                                }
                            }

                            $('.marker-popup').addClass('ready');
                           }

                }

                else if(event.target.className === 'close fa fa-close') {

                    $('.marker-popup').removeClass('ready');
                    scope.micrio.audio.stop();
                    //micrio.camera.flyToFullView(1000);

                    scope.micrio.camera.flyTo(0.5, 0.5, startZoom, 1000);


                    var areas=  document.getElementsByClassName("area");
                    //document.getElementById("filter").classList.toggle('show');

                    /*
                    for (var i = 0; i < areas.length; i++) {
                        areas[i].classList.remove('show');
                    }
                    */

                    $('flex-container-4 flex-item span').removeClass('selected');

                    for (var i = 0; i < scope.micrio.markers.items.length; i++) {
                        scope.micrio.markers.items[i].popup._container.classList.remove('ready');
                    }
                    $('#filter').removeClass('show1-1 show1-2 show2-1 show2-2 show2-3');

                   scope.timeout = $timeout(function() {
                        scope.micrio.camera.events.hook();
                       scope.disableHotspots = false;
                       /*  re-enable all markers */
                       $('.marker-container .marker').css('pointer-events', 'auto');
                    }, 1000);

                }

                else
                { return; }


            }, false); // Make the sure event bubbles to capture the click


            scope.$on('$destroy', function() {
                $timeout.cancel(scope.timeout);

            });

        }
    };
}]);