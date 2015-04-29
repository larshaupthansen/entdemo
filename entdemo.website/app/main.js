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
define(["require", "exports", 'angular2/angular2'], function (require, exports, angular2_1) {
    var Main = (function () {
        function Main() {
            this.loggedIn = IN.User.isAuthorized();
        }
        Main.prototype.loginLinkedIn = function () {
            var _this = this;
            console.log("LOGGED IN");
            IN.User.authorize(function () {
                _this.loggedIn = true;
                IN.API.Raw("/people/~:(id,formatted-name,location,headline,industry,picture-url,email-address)").result(function (data) {
                    console.log(data);
                    this.profile = data;
                }).error(function (error) { console.log(error); });
            }, null);
            return true;
        };
        Main.prototype.logoutLinkedIn = function () {
            var _this = this;
            console.log("LOGGED OUT");
            IN.User.logout(function () {
                _this.loggedIn = false;
            }, null);
            return true;
        };
        Main = __decorate([
            angular2_1.Component({
                selector: 'entdemo-app',
                injectables: []
            }),
            angular2_1.View({
                templateUrl: 'app-views/main.html',
                directives: [angular2_1.For, angular2_1.If],
            }), 
            __metadata('design:paramtypes', [])
        ], Main);
        return Main;
    })();
    angular2_1.bootstrap(Main);
});
