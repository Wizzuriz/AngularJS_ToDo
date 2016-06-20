/**
 * Created by Kragh on 23-05-2016.
 */
angular.module('ApplicationCtrl', [])
    .controller('ApplicationController',
        ['$rootScope', 'AuthenticationService', '$location',
            function ($rootScope, AuthenticationService, $location) {
                // console.log('ApplicationController here');
                $rootScope.$on("$stateChangeStart", function (evt, toState, fromState) {
                    if (!AuthenticationService.isAuthorized()) {
                        if(toState['name'] == "register"){
                            $location.path('register');
                        }else if (toState['name'] == 'login'){
                            $location.path('login');
                        }else {
                            console.log('Access denied');
                            evt.preventDefault();
                        }
                    }else
                    if(AuthenticationService.isAuthorized()
                        &&
                        ((toState['name'] != 'login')
                        &&
                        (toState['name'] !='register'))){
                        $location.path(toState['name']);
                    }
                    else {
                        evt.preventDefault();
                    }
                });
            }
        ]
    );