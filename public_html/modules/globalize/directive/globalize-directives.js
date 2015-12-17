/**
 * @description
 * Beispiel Direktive zum Einsatz von Globalize um ein Datum zu formatieren/parsen
 */
(function () {
    "use strict";
    angular.module("AngularJSi18n.globalize.directives", [])
            .directive("glDate", function (GlobalizeLanguageLoader) {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function (scope, element, attr, ngModel)
                    {
                        ngModel.$formatters.push(function (value) {
                            if (value) {
                                return GlobalizeLanguageLoader.get().dateFormatter({date: "short"})(value);
                            }
                        });

                        ngModel.$parsers.push(function (value) {
                            var result=GlobalizeLanguageLoader.get().dateParser({date: "short"})(value);
                            if (!result)
                            {
                                return "(no date)";
                            }
                            
                            return result;
                        });

                    }
                };
            });
})();


