/**
 * Created by Kragh on 24-05-2016.
 */
angular.module('app2', [])
    .filter('reverse', [function () {
    return function (string) {
        return string.split('').reverse().join('');
    }
}]);