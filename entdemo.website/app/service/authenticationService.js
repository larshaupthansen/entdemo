/// <reference path="../../../tools/typings/tsd.d.ts" />
/// <reference path="../model/Profile.ts" />
define(["require", "exports"], function (require, exports) {
    /* tslint:disable */
    //import {Injectable} from 'angular2/di';
    //@Injectable()
    /* tslint:enable */
    // From AccountController
    var UserInfoViewModel = (function () {
        function UserInfoViewModel() {
        }
        return UserInfoViewModel;
    })();
    exports.UserInfoViewModel = UserInfoViewModel;
    var ExternalLoginViewModel = (function () {
        function ExternalLoginViewModel() {
        }
        return ExternalLoginViewModel;
    })();
    exports.ExternalLoginViewModel = ExternalLoginViewModel;
    var AuthenticationService = (function () {
        function AuthenticationService() {
        }
        AuthenticationService.prototype.redirectToLinkedLogin = function () {
            var currentUrl = new URL(window.location.href);
            var callbackUrl = currentUrl.origin + '/LinkedIn/Auth';
            var url = ' https://www.linkedin.com/uas/oauth2/authorization?response_type=code'
                + '&client_id=' + '77ne8opwwucq5l'
                + '&redirect_uri=' + encodeURI(callbackUrl)
                + '&state=' + '987654321'
                + '&scope=r_basicprofile%20r_emailaddress';
            window.location.href = url;
        };
        AuthenticationService.prototype.getLoginProviders = function (callback) {
            $.ajax({
                url: '/api/Account/ExternalLogins',
                method: 'GET',
                data: {
                    returnUrl: '/signin-linkedin.html',
                    generateState: true
                },
                success: function (providerList) {
                    console.log(providerList);
                    callback(providerList);
                },
                error: function (data) {
                    console.log('ERROR');
                    console.log(data);
                }
            });
        };
        AuthenticationService.prototype.getLinkedInProfile = function (callback) {
            $.ajax({
                url: '/LinkedIn/Proxy',
                method: 'POST',
                data: {
                    accessToken: sessionStorage.getItem('Bearer'),
                    url: 'https://api.linkedin.com/v1/people/~:(id,formatted-name,email-address,headline,industry,picture-url)?format=json'
                },
                success: function (data) {
                    console.log(data);
                    $.ajax({
                        url: '/api/Account/UserInfo',
                        method: 'GET',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('Bearer'));
                        },
                        success: function (userInfo) {
                            console.log(userInfo);
                        },
                        error: function (data) {
                            console.log('  ERROR');
                            console.log(data);
                        }
                    });
                    callback(data);
                }
            });
        };
        return AuthenticationService;
    })();
    exports.AuthenticationService = AuthenticationService;
});

//# sourceMappingURL=../service/authenticationService.js.map