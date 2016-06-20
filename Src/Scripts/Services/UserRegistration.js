/**
 * Created by Kragh on 23-05-2016.
 */
angular.module('Application.UserRegistrationService', [])
.service('UserRegistrationService', ['$http', '$q',
    function ($http, $q) {
        var UserRegistrationService = {};

        UserRegistrationService.RegisterUser = function (username, password, fullName, age) {
          var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://194.239.172.19/api/user/register',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {username: username, password: password, fullname: fullName, age: age}
            }).success(function (response) {
                if(response['success']){
                    console.log("Api response: "+ response['success']);
                    console.log("Api msg: "+ response['msg']);
                    deferred.resolve('success'); // return success to controller.
                }else {
                    console.log("Api response: "+ response['msg']);
                    deferred.reject(response['msg']); // return error to controller.
                }
            }).catch(function errorCallback(response) {
                console.log("Api response: "+response['msg']);
                deferred.reject(response['msg']); // return error to controller.
            });
            return deferred.promise;
        };
        return UserRegistrationService;
}]);