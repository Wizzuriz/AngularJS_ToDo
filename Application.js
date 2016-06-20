/**
 * Created by Kragh on 22-05-2016.
 */

angular.module('application',
    // Fetch all Modules.
        ['ui.router', 
        'ngCookies',
        'Application.AuthenticationService',
        'Application.UserRegistrationService',
        'Application.TodoService',
        'AuthenticationCtrl',
        'ApplicationCtrl', 
        'RegistrationCtrl',
        'TodoCtrl',
        'TodoDirective'])
    .config(['$stateProvider','$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider, TodoCtrl) {
            var sitePath = 'Src/Html/partials/';

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('register', {
                    url:        '/register',
                    templateUrl: sitePath+'partial-register.html',
                    controller: 'ApplicationController'
                })
                .state('login', {
                    url:        '/login',
                    templateUrl: sitePath+'partial-login.html',
                    controller: 'ApplicationController'
                })
                .state('todo', {
                    url:        '/todo',
                    templateUrl: sitePath+'partial-todo.html',
                    controller: 'ApplicationController'
            });
    }])
    .run(function ($rootScope, AuthenticationService, $location) {
        // Before anything check if the user is logged in.
        AuthenticationService.checkIfAuthorized();
        // Redirect to path.
        $rootScope.$on('$stateChangeStart', function(){
            $location.path((AuthenticationService.isAuthorized()) ? 'todo' :'register');
        });
    });