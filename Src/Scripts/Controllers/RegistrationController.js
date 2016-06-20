/**
 * Created by Kragh on 23-05-2016.
 */
angular.module('RegistrationCtrl', [])
    .controller('RegistrationController',
        ['$scope', 'UserRegistrationService','AuthenticationService','$location',
            function ($scope, UserRegistrationService, AuthenticationService, $location) {
            // console.log('RegistrationController here');
                $scope.submitForm = function (isValid) {
                    if(isValid){
                        $scope.msg = "Contacting server...";
                        UserRegistrationService.RegisterUser(
                            $scope.username,
                            $scope.password,
                            $scope.fullname,
                            $scope.age)
                            .then(function (Message) {
                                $scope.msg = "Registration "+ Message + " Logging in!..";
                                console.log($scope.msg);
                                // Registration Success now log the user in.
                                AuthenticationService.login($scope.username, $scope.password)
                                    .then(function (Message) {
                                        $scope.msg = Message;
                                        console.log($scope.msg);
                                        $location.path('todo');
                                    }).catch(function (Error) {
                                        $scope.msg = Error;
                                        $scope.registerForm = {};
                                });
                            })
                            .catch(function (Error) {
                                $scope.msg = Error;
                                console.log($scope.msg);
                        });
                    }
                };
    }]);