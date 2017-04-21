// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


angular.module('unicesarApp', ['ionic', 'ngCordova', 'loginApp', 'historialApp', 'loadingPage', 'coreEstudiantes', 'coreProfesores', 
                               'modulo_Noticias', 'modulo_Oficina'])
    .run(Inicio);


Inicio.$inject = ['$ionicPlatform'];

function Inicio($ionicPlatform) {

    $ionicPlatform.ready(function() {

        if (window.cordova && window.cordova.plugins.Keyboard) {

            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }

    });

};