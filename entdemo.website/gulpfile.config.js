'use strict';
var GulpConfig = (function () {
    function GulpConfig() {
        this.source = './app/';
        this.sourceApp ='./app/src';

        this.tsOutputPath = this.source + '/js';
        this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';

        this.typings = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
        this.appTypeScriptReferences = this.typings + 'typescriptApp.d.ts';
        this.angular2 = './angular2/*.ts';
    }
    return GulpConfig;
})();
module.exports = GulpConfig;
