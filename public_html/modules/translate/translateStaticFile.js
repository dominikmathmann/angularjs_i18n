(function () {
    "use strict";

    angular.module('AngularJSi18n.translate.staticFile', [])
            .config(function ($translateProvider) {
                $translateProvider.useSanitizeValueStrategy('escape');
                $translateProvider.determinePreferredLanguage();
                $translateProvider.fallbackLanguage('de');
                $translateProvider.registerAvailableLanguageKeys(['de', 'en'], {
                    'en_*': 'en',
                    'de_*': 'de'
                });

                $translateProvider.useStaticFilesLoader({
                    prefix: 'resources/i18n/',
                    suffix: '.json'
                });
            })

            .controller('translateCtrl', function ($translate) {
                var vm=this;
                $translate('TITEL').then(function(text) {
                   vm.titel=text; 
                });
            });
})();

