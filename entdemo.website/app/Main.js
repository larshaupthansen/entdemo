/// <reference path="../../tools/typings/tsd.d.ts" />
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
define(["require", "exports", 'angular2/angular2', 'angular2/di', 'app/service/authenticationservice'], function (require, exports, angular2_1, di_1, authenticationservice_1) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this.profile = new model.Profile();
            this.authenticationService = new authenticationservice_1.AuthenticationService();
            this.loginProviders = new Array();
            this.loginProviders.push({
                Name: "test",
                Url: ""
            });
            var callback = function (data) { return _this.loginProviders = data; };
            this.authenticationService.getLoginProviders(callback);
            this.time = '';
            this.loggedIn = sessionStorage.getItem('Bearer') != null;
            if (this.loggedIn) {
                this.getProfile();
            }
            setInterval(function () {
                this.time = (new Date()).toString();
            }.bind(this), 1);
        }
        Main.prototype.loginLinkedIn = function () {
            this.authenticationService.redirectToLinkedLogin();
            return true;
        };
        Main.prototype.getProfile = function () {
            this.authenticationService.getLinkedInProfile(function (data) { this.profile = data; });
        };
        Main.prototype.logoutLinkedIn = function () {
            return true;
        };
        Main = __decorate([
            angular2_1.Component({
                selector: 'entdemo-app',
                // `bindings` can be a list of `Type`, {@link Binding}, {@link ResolvedBinding}, or a recursive
                // list of more bindings.
                injectables: []
            }),
            angular2_1.View({
                templateUrl: 'app/views/main.html',
                directives: [angular2_1.For, angular2_1.If]
            }), 
            __metadata('design:paramtypes', [])
        ], Main);
        return Main;
    })();
    angular2_1.bootstrap(Main, [di_1.bind(authenticationservice_1.IAuthenticationService).toValue(new authenticationservice_1.AuthenticationService())]);
});

//# sourceMappingURL=Main.js.map