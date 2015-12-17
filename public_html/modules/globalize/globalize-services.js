/**
 * @description
 * Service Methode für den Zugriff und die Initialisierung von Globalize
 * Die Initialisierung wird durch ui-route (app.js) gestartet.
 */
(function () {
    "use strict";

    // für dieses Beispiel nutzen wir weder AMD noch Node.js
    // aus dem Grund müssen wir die benötigten JSON-Daten selber laden
    angular.module("AngularJSi18n.globalize.services", [])

            .factory("GlobalizeLanguageLoader", function ($http, $q) {
                
                //Pfade und Deklaration welche CLDR Daten benötigt werden
                var cldrPath='bower_components/cldr-data';
                
                var commonData = [
                    // für numerische Formate
                    '/supplemental/likelySubtags.json',
                    '/supplemental/numberingSystems.json',
                    // für Datum
                    '/supplemental/timeData.json',
                    '/supplemental/weekData.json'

                ];

                var languageData = [
                    // für numerische Formate
                    '/numbers.json',
                    // für Datum
                    '/ca-gregorian.json',
                    '/timeZoneNames.json'
                ];

                // Helfer Methode um die entgültigen URLs zu generrieren
                var buildReferences = function (language) {
                    return commonData
                            .map(function (element) {
                                return cldrPath + element;
                            })
                            .concat(
                                    languageData.map(function (element) {
                                        return cldrPath + "/main/" + language + element;
                                    }));
                };
                
                
                // wir halten eine Instanz von Globalize vor
                var globalizeInstance;

                return {
                    // Initialisierung von Globalize
                    // es werden die oben festgelegten Daten geladen. 
                    loadLanguage: function (language)
                    {
                        var def = $q.defer();

                        if (!globalizeInstance || globalizeInstance.cldr.locale !== language)
                        {

                            var cldrData = buildReferences(language);
                            var cldrDataPromises = cldrData.map(function (url) {
                                return $http.get(url);
                            });

                            $q.all(cldrDataPromises).then(function (response) {
                                response.forEach(function (element) {
                                    Globalize.load(element.data);
                                });
                                globalizeInstance = new Globalize(language);
                                def.resolve();
                            }, function () {
                                def.reject();
                            });
                        }
                        else
                        {
                            def.resolve();
                        }

                        return def.promise;
                    },
                    // Globalize Instanz zur Verfügung stellen
                    get: function () {
                        return globalizeInstance;
                    }
                };
            });
})();


