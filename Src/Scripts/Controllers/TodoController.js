/**
 * Created by Kragh on 23-05-2016.
 */
var todoData = angular.module('TodoCtrl', []);

todoData.controller('TodoController',
    ['$scope', 'TodoService',
        function ($scope, TodoService, $rootElement) {
        $scope.displayTodoForm = false;
        // $scope.displayChildForm = false;
        $scope.editMode = false;
        $scope.deleted = false;
        $scope.data = {};

        $scope.autoLoadData = function () {
            TodoService.getTodos()
                .then(function (data) {
                    $scope.data = data;
                    // console.log($scope.data);
                }).catch(function (errorMessage) {
                console.log(errorMessage);
            });
        };
        $scope.autoLoadData();

        $scope.getTodoClass = function () {
            return (($scope.todoData.archived) ? 'bs-callout-done' : 'bs-callout-info');
        };

        // Crud functions for todos.

        $scope.delete = function (todoId) {
            TodoService.delete(todoId).then(function (data) {
                if(data >= 1){
                   $scope.todoData = null;
                   $scope.deleted = true;
               }
            }).catch(function (error) {
                console.log(error);
            });
        };

        var oleTitle;
        $scope.enableEditTitle = function () {
            // reverse edit mode.
            $scope.editMode = ($scope.editMode) ? false:true;
            // reverse title change
            if($scope.editMode){
                oleTitle = $scope.todoData.title;
            }else {
                $scope.todoData.title = oleTitle;
            }
        };
            
        $scope.changeTitle = function (todoId) {
            TodoService.changeTitle(todoId, $scope.newTitle).then(function (data) {
                if(data == 1){
                    $scope.editMode = false;
                    $scope.todoData.title = $scope.newTitle;
                }
            }).catch(function (data) {
                console.log(data);
            });
        };

        $scope.displayCreateTodoForm = function () {
            $scope.displayTodoForm = ($scope.displayTodoForm) ? false:true;
        };

        $scope.createNewTodo = function (isValid, newTitle) {
            // If there is no todoData, we are in root controller.
            if(isValid){
                if(angular.isUndefined($scope.todoData)){
                    $scope.addRoot(newTitle)
                }else {
                    $scope.addChild(newTitle);
                }
            }
        };

        $scope.addChild = function (newTitle) {
            TodoService.addChild(newTitle, $scope.todoData.root, $scope.todoData._id).then(function (data) {
                $scope.todoData.child.push(data);
                $scope.displayTodoForm = false;
            }).catch(function (error) {
                console.log(error);
            });
        };

        // We pass the new title as parameter. because the form is in a childScope.
        $scope.addRoot = function (newTitle) {
            TodoService.addRoot(newTitle).then(function (newTodo) {
                // we want to show the new one on top..
                $scope.data.splice(0,0, newTodo);
                // console.log(data);
                $scope.displayTodoForm = false;
                console.log($scope);
            }).catch(function (error) {
                console.log(error);
            });
        };

        $scope.markCompleted = function (todoId) {
            var archived = (($scope.todoData.archived) ? false : true);

            TodoService.markCompleted(todoId, archived).then(function (data) {
                if(data == 1){
                    $scope.todoData.archived = archived;
                }
            }).catch(function (error) {
                console.log("Failed: " + error);
            });
        };
}]);


// $scope.todoData.child.push({
//     "__v": 0,
//     "title": "Buy new socks",
//     "owner": "57307aff57376d6e321da1f6",
//     "_id": "573216ee61c2cb6201cb2ad4",
//     "child": [],
//     "parent": "573216bc61c2cb6201cb2ad3",
//     "root": "5732165361c2cb6201cb2ad2",
//     "archived": false,
//     "date": "2015-05-10T13:42:33.659Z"
// });