/* tslint:disable */
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", 'angular2/angular2'], function (require, exports, angular2_1) {
    var Main = (function () {
        function Main() {
            this.loggedIn = IN.User.isAuthorized();
        }
        Main.prototype.loginLinkedIn = function () {
            var _this = this;
            console.log('LOGGED IN');
            IN.User.authorize(function () {
                _this.loggedIn = true;
                IN.API.Raw('/people/~:(id,formatted-name,location,headline,industry,picture-url,email-address)').result(function (data) {
                    console.log(data);
                    this.profile = data;
                }).error(function (error) { console.log(error); });
            }, null);
            return true;
        };
        Main.prototype.logoutLinkedIn = function () {
            var _this = this;
            console.log('LOGGED OUT');
            IN.User.logout(function () {
                _this.loggedIn = false;
            }, null);
            return true;
        };
        Main = __decorate([angular2_1.Component({
            selector: 'entdemo-app',
            injectables: []
        }), angular2_1.View({
            templateUrl: 'views/main.html',
            directives: [angular2_1.For, angular2_1.If]
        })], Main);
        return Main;
    })();
    angular2_1.bootstrap(Main);
});

//# sourceMappingURL=Main.js.map