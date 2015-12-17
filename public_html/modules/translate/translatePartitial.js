/**
 * @description
 * Dieses Modul lädt nur einen definierten Teil der Übersetzungen
 */
(function () {
    "use strict";

    angular.module('AngularJSi18n.translate.partitional', [])
            .config(function ($translateProvider) {
                $translateProvider.useSanitizeValueStrategy('escape');
                $translateProvider.fallbackLanguage('de');
                $translateProvider.determinePreferredLanguage();
                $translateProvider.registerAvailableLanguageKeys(['de', 'en'], {
                    'en_*': 'en',
                    'de_*': 'de'
                });

                $translateProvider.useLoader('$translatePartialLoader', {
                    urlTemplate: 'resources/i18n/partitial/{part}/{lang}.json'
                });
            })

            .controller('translateCtrl', function ($translate, $translatePartialLoader) {
                var vm = this;
                // Übersetzungs-Teil: 'demo" laden. Der Pfad zu diesem Teil für de:
                // resources/i18n/partitial/demo/de.json
                $translatePartialLoader.addPart('demo');
                $translate.refresh().then(function () {
                    $translate('TITEL').then(function (text) {
                        vm.titel = text;
                    });
                });
            });
})();

