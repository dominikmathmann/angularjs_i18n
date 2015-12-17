(function () {
    "use strict";
    angular.module("AngularJSi18n", [
        'ui.router',
        'AngularJSi18n.globalize',
        'AngularJSi18n.globalize.services',
        'AngularJSi18n.globalize.byDirective',
        'pascalprecht.translate',
        'AngularJSi18n.translate.inline'
//        'AngularJSi18n.translate.staticFile',
//        'AngularJSi18n.translate.url',
//        'AngularJSi18n.translate.partitional'
    ])

            .config(function ($stateProvider, $urlRouterProvider) {

                // In diesem Beispiel nutzen wir die Möglichkeit von ui-router mehrstufige Templates
                // zu erzeugen um die Initialisierung von Globalize durch zu führen
                $stateProvider
                        // Basis-State
                        .state('app', {
                            //kann nicht direkt aufgerufen werden:
                            abstract: true,
                            //hat keinen eigenen Inhalt, stellt für die untergeordneten
                            //Seiten nur den benötigten Bereich zur Verfügung um die
                            //"echten" Inhalte an zu zeigen
                            template: '<div ui-view></div>',
                            //resolve = bevor der Controller der View ausgeführt wird, werden diese
                            //Abhänigkeiten geladen. Da alle anderen states diesem untergeordnet sind
                            //wird die Methode bei jeder Navigation ausgeführt
                            resolve: {
                                _init_: function ($window, GlobalizeLanguageLoader) {
                                    var lang = $window.navigator.language || $window.navigator.userLanguage;
   
                                    return GlobalizeLanguageLoader.loadLanguage(lang);
                                }
                            }
                        })
                        //alle weiteren Seiten sind dem Basis-State untergeordnet: 'app.[statename]'
                        .state('app.home', {
                            url: '/home',
                            templateUrl: 'modules/home/home.html'
                        })

                        .state('app.translate', {
                            url: '/translate',
                            templateUrl: 'modules/translate/translate.html'
                        })

                        .state('app.globalize', {
                            url: '/globalize',
                            templateUrl: 'modules/globalize/globalize.html',
                            controller: 'globalizeCtrl',
                            controllerAs: 'vm'
                        })

                        .state('app.globalizedir', {
                            url: '/globalizedir',
                            templateUrl: 'modules/globalize/directive/globalizeByDirective.html',
                            controller: 'globalizeDirCtrl',
                            controllerAs: 'vm'
                        });

                $urlRouterProvider.otherwise("/home");

                // Die Konfiguration unserer Übersetzungen würde normalerweise
                // hier statt finden. Zu Demo zwecken wurde die Konfiguration
                // aber in die einzelnen Module verschoben die oben
                // ein- und auskommentiert werden können um die verschiedenen
                // Varianten zu zeigen.
            });
})();


