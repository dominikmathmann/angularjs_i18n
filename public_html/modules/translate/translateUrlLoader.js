/**
 * @description
 * Dieses Modul lädt seine Übersetzungen über eine URL
 * In der "run" Methode ist zu sehen das wir den Request der eigentlich an ein Backend
 * gehen würde zu Demo zwecken mocken.
 */
(function () {
    "use strict";

    angular.module('AngularJSi18n.translate.url', ['ngMockE2E'])
            .config(function ($translateProvider) {
                $translateProvider.useSanitizeValueStrategy('escape');
                $translateProvider.determinePreferredLanguage();
                $translateProvider.fallbackLanguage('de');
                $translateProvider.registerAvailableLanguageKeys(['de', 'en'], {
                    'en_*': 'en',
                    'de_*': 'de'
                });

                $translateProvider.useUrlLoader("/webresources/i18nRestService");

            })

            .run(function ($httpBackend) {
                // für die Demo Mocken wir den Request sprachunabhängig.
                // normalerweise würde hier das Backend aktiv werden
                var mockedTranslationResponse = [200, {TITEL: 'i18n mit AngularJS + URL', TITELP: 'i18n mit AngularJS + URL {{postfix}}'}, {}];
                $httpBackend.whenGET(/.*i18nRestService.*/).respond(mockedTranslationResponse);
                $httpBackend.whenGET(/.*/).passThrough();
            })

            .controller('translateCtrl', function ($translate) {
                var vm = this;
                $translate('TITEL').then(function (text) {
                    vm.titel = text;
                });
            });
})();

