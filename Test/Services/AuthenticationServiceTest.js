/**
 * Created by Kragh on 24-05-2016.
 */

describe('AuthenticationService', function () {
    var $httpBackend, $q, $cookies, deferred, AuthenticationService;

    beforeEach(function () {
        module('Application.AuthenticationService');

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $q = $injector.get('$q');
            $cookies = $injector.get('$cookies');
            AuthenticationService = $injector.get('AuthenticationService');
            deferred = $q.defer();
        });

    });


    describe('isAuthorized', function () {
        jasmine.createSpy('AuthenticationService');

        it('Should call the login function', function () {

            spyOn(AuthenticationService, 'login').and.returnValue($q.when());

            AuthenticationService.login("jeggy","password");
            expect(AuthenticationService.login).toHaveBeenCalledWith("jeggy","password");

        });

        it('Should check if there is a token in the cookie', function () {
            expect(AuthenticationService.checkIfAuthorized()).toEqual(false);
        });
        
        it('Should return false on isAuthorized', function () {
           var result = AuthenticationService.isAuthorized();
            expect(result).toEqual(false);
        });

    });
});
