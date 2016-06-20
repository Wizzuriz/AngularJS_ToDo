/**
 * Created by Kragh on 22-05-2016.
 */
angular.module('Application.AuthenticationService', ['ngCookies'])
    .service('AuthenticationService',
        ['$http','$q','$cookies', function ($http, $q, $cookies){
        var AuthService = {};

        var Authorized = false;

        AuthService.isAuthorized = function(){
            return Authorized;
        };

        AuthService.logout = function (Authorized) {
            $cookies.remove('token');
            return 'Logged Out';
        };

        AuthService.checkIfAuthorized = function () {
            return Authorized = ($cookies.get('token') != null);
        };

        AuthService.login = function(username, password) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://194.239.172.19/api/user/login',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {username: username, password: password}
            }).success(function (response) {
                if(response['success']){
                    Authorized = true;
                    $cookies.put('token', response['token']);
                    deferred.resolve('success'); // return success to controller.
                }else {
                    Authorized = false;
                    deferred.reject(response['msg']); // return error to controller.
                }
            }).catch(function errorCallback(response) {
                Authorized = false;
                $cookies.remove('token');
                deferred.reject(response['msg']); // return error to controller.
            });
            return deferred.promise;
        };
        return AuthService;
    }]);

