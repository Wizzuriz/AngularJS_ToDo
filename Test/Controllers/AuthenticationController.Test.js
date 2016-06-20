/**
 * Created by Kragh on 24-05-2016.
 */
describe('AuthenticationController', function () {

    var $rootScope,
        $scope,
        AuthenticationServiceSpy,
        controller,
        AuthenticationService;
    
    beforeEach(function () {
        module('AuthenticationCtrl');
        module('Application.AuthenticationService');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new;
            AuthenticationService = $injector.get('AuthenticationService');
            controller = $injector.get('$controller')('AuthenticationController', {$scope: $scope});
        })
    });

    describe('Action Handlers', function () {
        var modeSpy;

        beforeEach(function () {
            modeSpy = spyOn(AuthenticationService, 'isAuthorized').and.returnValue("success");
        });

        it('Should ', function () {
            AuthenticationService.isAuthorized();
            expect(modeSpy).toHaveBeenCalled();
        });

        it('should return Logged out', function () {
            expect(AuthenticationService.logout()).toEqual('Logged Out');
        });

        it('should be loading..', function () {
            expect($scope.msg).toBeUndefined();
        });

        it('should change the msg to success', function () {
            $scope.submitForm();
            expect($scope.msg).toEqual('Loading..');
        });

    });
});