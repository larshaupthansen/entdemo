/* tslint:disable */
define(["require", "exports"], function (require, exports) {
    /* tslint:enable */
    var LinkedinController = (function () {
        function LinkedinController($http) {
            this.httpService = $http;
        }
        LinkedinController.prototype.getBearerToken = function () {
            return '';
        };
        return LinkedinController;
    })();
    exports.LinkedinController = LinkedinController;
});

//# sourceMappingURL=../service/linkedincontroller.js.map