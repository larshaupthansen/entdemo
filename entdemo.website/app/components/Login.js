/// <reference path="../../../tools/typings/tsd.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'angular2/angular2', 'app/service/authenticationservice'], function (require, exports, angular2_1, authenticationservice_1) {
    var Login = (function () {
        function Login() {
            var _this = this;
            this.profile = new model.Profile();
            this.authenticationService = new authenticationservice_1.AuthenticationService();
            this.loginProviders = new Array();
            this.loginProviders.push({
                Name: 'test',
                Url: ''
            });
            var callback = function (data) { return _this.loginProviders = data; };
            this.authenticationService.getLoginProviders(callback);
            this.loggedIn = sessionStorage.getItem('Bearer') != null;
            if (this.loggedIn) {
                this.getProfile();
            }
        }
        Login.prototype.loginLinkedIn = function () {
            this.authenticationService.redirectToLinkedLogin();
            return true;
        };
        Login.prototype.getProfile = function () {
            this.authenticationService.getLinkedInProfile(function (data) { this.profile = data; });
        };
        Login.prototype.logoutLinkedIn = function () {
            return true;
        };
        Login = __decorate([
            angular2_1.Component({
                selector: 'login',
                // `bindings` can be a list of `Type`, {@link Binding}, {@link ResolvedBinding}, or a recursive
                // list of more bindings.
                injectables: []
            }),
            angular2_1.View({
                templateUrl: 'app/views/components/login.html',
                directives: [angular2_1.For, angular2_1.If]
            }), 
            __metadata('design:paramtypes', [])
        ], Login);
        return Login;
    })();
});

//# sourceMappingURL=../components/Login.js.map