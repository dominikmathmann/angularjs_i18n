/**
 * @description
 * Einsatz von Globalize (innerhalb von Controllern)
 */
(function () {
    "use strict";

    angular.module("AngularJSi18n.globalize", ['AngularJSi18n.globalize.services'])

            .controller("globalizeCtrl", function (GlobalizeLanguageLoader) {
                var vm = this;

                vm.language = "de";
                

                vm.changeLanguage = function (language) {
                    GlobalizeLanguageLoader.loadLanguage(language).then(function () {
                        var g = new Globalize(language);
                        vm.number = g.numberFormatter()(10000.88);
                        vm.numberRounded = g.numberFormatter({round: "ceil", maximumFractionDigits: 0})(10000.88);
                        vm.date = g.dateFormatter()(new Date());
                        vm.dateLong = g.dateFormatter({datetime: "long"})(new Date());
                    }, function(){
                        alert('Sprache nicht gefunden');
                    });
                };
                vm.changeLanguage(vm.language);

                vm.z1='200,25';
                vm.d1='01.01.2016';
                vm.d2='160401';
                vm.format = function ()
                {
                    var g = new Globalize(vm.language);
                    if (vm.z1) {
                        vm.z1 = g.numberParser()(vm.z1 + "");
                    }
                    if (vm.d1) {
                        vm.d1 = g.dateParser({date: "short"})(vm.d1 + "");
                    }
                    if (vm.d2) {
                        vm.d2 = g.dateParser({ raw: "yyMMdd" })( vm.d2+"" );
                    }
                };
                
                vm.dateDirExample=new Date();
            });
})();


