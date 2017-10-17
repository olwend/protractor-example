/**
 * Created by dhis on 06/05/2015.
 */

angular.module('idleTimer', ['ngIdle', 'modal', 'ngRoute'])

    .controller('idleCtrl',  function($location, $scope, Idle, Keepalive){

        $scope.started = true;

        function closeModals() {
            if ($scope.warning) {
                $scope.warning.close();
                $scope.warning = null;
            }

            if ($scope.timedout) {
                $scope.timedout.close();
                $scope.timedout = null;
            }
        }

        $scope.$on('IdleStart', function() {

            //console.log('idleStart');
            Idle.unwatch();
            $('#timeoutModal').modal('hide');
            $location.path('/screensaver');
            //toggleModal();
        });


        $scope.$on('IdleEnd', function() {
            //console.log('idleEnd');
            /*closeModals(); */
            Idle.unwatch();
            $('#timeoutModal').modal('hide');
            $location.path('/screensaver');
        });


        /*
        $scope.$on('IdleTimeout', function() {
            console.log('idleTimeout');
            //$scope.started = false;
            Idle.unwatch();
            $('#timeoutModal').modal('hide');
            $location.path('/screensaver');
        });
        */

        $scope.start = function() {
            //console.log('started');
            //closeModals();
            Idle.watch();
            $scope.started = true;
        };

        $scope.stop = function() {
            //console.log('stop');
            Idle.unwatch();
            $scope.started = false;
        };
    })


 .config(function(IdleProvider, KeepaliveProvider) {
 IdleProvider.idle(1000);
 IdleProvider.timeout(1);
 //KeepaliveProvider.interval(10);
 });
