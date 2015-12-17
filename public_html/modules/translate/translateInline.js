/**
 * @description
 * Dieses Modul verwendet Übersetzungen die direkt im Modul deklariert werden
 */
(function () {
    "use strict";

    angular.module('AngularJSi18n.translate.inline', [])
            .config(function ($translateProvider) {
                $translateProvider.useSanitizeValueStrategy('escape');
                $translateProvider.determinePreferredLanguage();
                $translateProvider.fallbackLanguage('de');
                $translateProvider.registerAvailableLanguageKeys(['de', 'en'], {
                    'en_*': 'en',
                    'de_*': 'de'
                });

                $translateProvider
                        .translations('de', {
                            TITEL: "i18n mit AngularJS",
                            TITELP: "i18n mit AngularJS {{postfix}}"
                        })
                        .translations('en', {
                            TITEL: "i18n with AngularJS",
                            TITELP: "i18n with AngularJS {{postfix}}"
                        });
            })

            .controller('translateCtrl', function ($translate) {
                var vm = this;
                $translate('TITEL').then(function (text) {
                    vm.titel = text;
                });
            });
})();

