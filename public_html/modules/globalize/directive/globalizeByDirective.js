(function () {
    "use strict";

    angular.module("AngularJSi18n.globalize.byDirective", ['AngularJSi18n.globalize.services', 'AngularJSi18n.globalize.directives'])
            .controller("globalizeDirCtrl", function () {
                var vm = this;

                vm.dateDirExample=new Date();
            });
})();


