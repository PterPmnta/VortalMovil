angular.module('modulo_Oficina', ['ionic'])
    .controller('iniciarTabs', iniciarTabs)
    .factory('informacionTabs', informacionTabs)
    .directive('goBack', goBack);

iniciarTabs.$inject = ['$scope', 'informacionTabs', '$stateParams', '$ionicHistory'];

function iniciarTabs($scope, informacionTabs, $stateParams, $ionicHistory) {

    var Departamentos, Facultades, Administracion;

    Departamentos = informacionTabs.programas;
    Facultades = informacionTabs.decanaturas;
    Administracion = informacionTabs.admon;


    $scope.currentTab = 'programas';
    $scope.programas = Departamentos;
    $scope.decanaturas = Facultades;
    $scope.admon = Administracion;

    $scope.Retroceder = function() {
        $ionicHistory.goBack();
    };

}


informacionTabs.$inject = ['$ionicHistory', '$ionicPlatform', '$state'];

function informacionTabs($ionicHistory, $ionicPlatform, $state) {

    return {

        programas: [{
            director: 'Alvaro Oñate',
            oficina: 'Dep. de Ing. de Sistemas',
            telefono: 5849233,
            correo: 'alvaroonate@unicesar.edu.co'
        }, {
            director: 'Ada Almenares',
            oficina: 'Dep. de Derecho',
            telefono: 5546706,
            correo: 'derecho@unicesar.edu.co'
        }, {
            director: 'Josefina Cuello',
            oficina: 'Dep. de Sociologia',
            telefono: 5846706,
            correo: 'sociología@unicesar.edu.co'
        }, {
            director: 'Iranis Urbina',
            oficina: 'Dep. de Idiomas',
            telefono: 5850296,
            correo: 'idiomas@unicesar.edu.co'
        }, {
            director: 'Ineris Cuello',
            oficina: 'Dep. de Arte y folclor',
            telefono: 585045,
            correo: 'bellasartes@unicesar.edu.co'
        }, {
            director: 'Doris Celchar',
            oficina: 'Dep. de Enfermeria',
            telefono: 5848935,
            correo: 'enfermería@unicesar.edu.co'
        }],

        decanaturas: [{
            director: 'Efrain Quintero',
            oficina: 'Dec. de Bellas Artes',
            telefono: 5850411,
            correo: 'efrainquintero@unicesar.edu.co'
        }, {
            director: 'Jaime Maestre',
            oficina: 'Dec. de Ciencias de la educación',
            telefono: 5849456,
            correo: 'faceeducacion@unicesar.edu.co'
        }, {
            director: 'Nancy Hernandez',
            oficina: 'Dec. de Salud',
            telefono: 5850464,
            correo: '*'
        }],

        admon: [{
            director: 'Norberto Diaz',
            oficina: 'Cefontev',
            telefono: 3145357278,
            correo: '*'
        }, {
            director: 'Averiguar',
            oficina: 'Sala de profesores',
            telefono: 5847128,
            correo: '*'
        }]


    };

}

function goBack() {

    return {

        restrict: 'AE',

        scope: {
            click: "&"
        },

        template: '<button class="button button-icon icon ion-ios-arrow-back button-clear"></button>',

        link: function($scope, $element) {

            var button = $element.find('button');

            var evtHandler = function() {
                button[0].click();
            };

            button.on('click', function() {
                $scope.click({});
            });

        }

    };

}