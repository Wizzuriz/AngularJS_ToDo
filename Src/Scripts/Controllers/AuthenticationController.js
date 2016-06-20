/**
 * Created by Kragh on 22-05-2016.
 */
angular.module('AuthenticationCtrl', [])
    .controller('AuthenticationController',
        ['$scope',
        'AuthenticationService',
        '$location',
    function AuthenticationController(
        $scope,
        AuthenticationService,
        $location) {

        $scope.msg;

        $scope.logout = function () {
            if(AuthenticationService.isAuthorized()){
                AuthenticationService.logout();
                window.location.reload();
            }
        };

        $scope.submitForm = function (isValid) {
            $scope.msg = "Loading..";
            if(isValid){
                console.log("true");
                AuthenticationService.login($scope.username, $scope.password)
                    .then(function (Message) {
                        $scope.msg = Message;
                        $location.path('todo');
                    }).catch(function (Message) {
                        $scope.msg = Message;
                        $scope.username = "";
                        $scope.password = "";
                });
            }
        };
}]);