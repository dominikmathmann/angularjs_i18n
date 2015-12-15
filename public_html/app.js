(function () {
    "use strict";
    angular.module("AngularJSi18n", [
        'ui.router', 
        'pascalprecht.translate', 
        'AngularJSi18n.translate.inline',
//        'AngularJSi18n.translate.staticFile',
//        'AngularJSi18n.translate.url',
//        'AngularJSi18n.translate.partitional'
    ])

            .config(function ($stateProvider, $urlRouterProvider) {

// Konfiguration der Navigationspfade (UI-Route)
                $stateProvider
                        .state('home', {
                            url: '/home',
                            templateUrl: 'modules/home/home.html'
                        })

                        .state('translate', {
                            url: '/translate',
                            templateUrl: 'modules/translate/translate.html',
                        });

                $urlRouterProvider.otherwise("/home");

                // Die Konfiguration unserer Übersetzungen würde normalerweise
                // hier statt finden. Zu Demo zwecken wurde die Konfiguration
                // aber in die einzelnen Module verschoben die oben
                // ein- und auskommentiert werden können um die verschiedenen
                // Varianten zu zeigen.
            });
})();


