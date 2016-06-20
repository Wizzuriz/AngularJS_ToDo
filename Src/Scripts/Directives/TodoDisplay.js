/**
 * Created by Kragh on 25-05-2016.
 */
angular.module('TodoDirective', [])
    .directive('todo', function () {
       return {
           restrict: 'E',
           scope: {
               todoData: '=data'
           },
           templateUrl: 'Src/Html/Templates/TodoTemplate.html',
           controller: 'TodoController'
       };
});