/**
 * Created by Kragh on 23-05-2016.
 */
angular.module('Application.TodoService', [])
    .service('TodoService', ['$http', '$q', '$cookies',
        function ($http, $q, $cookies) {
        var TodoService = {};
        var accessToken = $cookies.get('token');

        TodoService.getTodos = function () {
            var deferred = $q.defer();
            // console.log($cookies.get('token'));
            if($cookies.get('token') != null){
                $http({
                    method: 'GET',
                    url: 'http://194.239.172.19/api/todo',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',authorization: accessToken}
                }).success(function (response) {
                    deferred.resolve(response['todos']); // return data to controller.
                }).catch(function errorCallback(response) {
                    console.log("Api response: "+response['msg']);
                    deferred.reject(response['msg']); // return error to controller.
                });
                return deferred.promise;
            }
        };

        TodoService.addChild = function (title, rootId, parentId) {
            if(rootId == null){
                rootId = parentId;
            }
            var data = {title: title, root: rootId, parent: parentId};
            return TodoService.createNew(data);
        };

        TodoService.addRoot = function (title) {
            var data = {title: title};
            return TodoService.createNew(data);
        };

        TodoService.createNew = function (data) {
            var deferred = $q.defer();
            if(accessToken != null){
                $http({
                    method: 'POST',
                    url: 'http://194.239.172.19/api/todo',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',authorization: accessToken},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(function (response) {
                    deferred.resolve(response); // return data to controller.
                }).catch(function errorCallback(response) {
                    console.log("Api response: "+response['msg']);
                    deferred.reject(response); // return error to controller.
                });
                return deferred.promise;
            }
        };

        TodoService.changeTitle = function (todoId, title) {
            var changes = {id: todoId, title: title};
            return TodoService.updateTodo(changes);
        };

        TodoService.markCompleted = function (todoId, archived) {
            var changes = {id: todoId, archived: archived};
            return TodoService.updateTodo(changes);
        };

        TodoService.updateTodo = function (changes) {
            var deferred = $q.defer();
            if(accessToken != null){
                $http({
                    method: 'PUT',
                    url: 'http://194.239.172.19/api/todo',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', authorization: accessToken},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: changes
                }).success(function (response) {
                    deferred.resolve(response['ok']); // return data to controller.
                }).catch(function errorCallback(response) {
                    console.log("Api response: "+response['msg']);
                    deferred.reject(response['msg']); // return error to controller.
                });
                return deferred.promise;
            }
        };

        TodoService.delete = function (todoId) {
            var deferred = $q.defer();
            console.log(accessToken);
            if(accessToken != null){
                $http({
                    method: 'DELETE',
                    url: 'http://194.239.172.19/api/todo/'+todoId,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',authorization: accessToken},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    }
                }).success(function (response) {
                    deferred.resolve(response['n']); // return data to controller.
                }).catch(function errorCallback(response) {
                    console.log("Api response: "+response);
                    deferred.reject(response['msg']); // return error to controller.
                });
                return deferred.promise;
            }
        };

        // End of service
        return TodoService;
}]);