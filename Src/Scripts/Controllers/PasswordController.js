/**
 * Created by Kragh on 24-05-2016.
 */
"use strict";

angular.module('app', [])
    .controller('PasswordController', function PasswordController($scope) {
        $scope.password = '';
        $scope.grade = function() {
            var size = $scope.password.length;
            if (size > 8) {
                $scope.strength = 'strong';
            } else if (size > 3) {
                $scope.strength = 'medium';
            } else {
                $scope.strength = 'weak';
            }
        };
    });