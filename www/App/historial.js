angular.module('historialApp', ['ionic', 'ngCordova'])
    .controller('borrarHistorial', borrarHistorial)
    .factory('salirApp', salirApp);


borrarHistorial.$inject = ['$scope', '$ionicHistory', 'salirApp', '$ionicPopup', '$state', '$timeout', '$window'];

function borrarHistorial($scope, $ionicHistory, salirApp, $ionicPopup, $state, $timeout, $window) {

    $scope.showConfirm = function() {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Cerrar sesion',
            template: 'Esta seguro que desea cerrar sesión?',
            cancelText: 'Cancelar',
            cancelType: 'button-assertive',
            okText: 'Salir',
            okType: 'button-balanced'
        });

        confirmPopup.then(function(res) {

            var nombreVista;
            nombreVista = salirApp.obtenerVista();

            if (res) {

                delete $window.localStorage.logged;

                $state.go('Loading');

                if (nombreVista == 'menuestu') {
                    delete $window.localStorage.estudiante;
                    salirApp.eliminarTablasEstu();
                } else {
                    delete $window.localStorage.profesor;
                    salirApp.eliminarTablasProf();
                }


                $timeout(function() {
                    $state.go('login');
                }, 2500);

            } else {
                console.log('Cancelado');
            }

        });
    };

    salirApp.salida();
    $ionicHistory.clearHistory();

};


salirApp.$inject = ['$ionicPlatform', '$ionicHistory', '$timeout', '$cordovaSQLite'];

function salirApp($ionicPlatform, $ionicHistory, $timeout, $cordovaSQLite) {

    function salida() {

        var BackButton = 0;

        $ionicPlatform.registerBackButtonAction(function() {

            if ($ionicHistory.currentStateName() == 'menuestu' || $ionicHistory.currentStateName() == 'menuprof') {

                if (BackButton == 0) {

                    BackButton++;
                    window.plugins.toast.showLongCenter('Presione nuevamente para salir');

                    $timeout(function() {
                        BackButton = 0;
                    }, 2500);

                } else {
                    navigator.app.exitApp();
                }

            } else {
                if ($ionicHistory.currentStateName() == 'login') {
                    navigator.app.exitApp();
                } else {
                    $ionicHistory.goBack();
                }
            }

        }, 100);

    };

    function eliminarTablasEstu() {

        var db, dropPerfil, dropHorario, dropTareasEstu;

        db = $cordovaSQLite.openDB({
            name: "unicesar.db",
            location: "default"
        });

        dropPerfil = "DROP TABLE Estudiante";
        dropHorario = "DROP TABLE Horario";
        dropTareasEstu = "DROP TABLE TareasEstu";

        localStorage.removeItem("imgData");
        $cordovaSQLite.execute(db, dropPerfil);
        $cordovaSQLite.execute(db, dropHorario);
        $cordovaSQLite.execute(db, dropTareasEstu);

    };

    function eliminarTablasProf() {

        var db, dropPerfil_P, dropHorario_P, dropGrupos, dropTareasProf;

        db = $cordovaSQLite.openDB({
            name: "unicesar.db",
            location: "default"
        });

        dropPerfil_P = "DROP TABLE Profesor";
        dropHorario_P = "DROP TABLE HorarioP";
        dropGrupos = "DROP TABLE GruposP";
        dropTareasProf = "DROP TABLE TareasProf";

        localStorage.removeItem("imgData");
        $cordovaSQLite.execute(db, dropPerfil_P);
        $cordovaSQLite.execute(db, dropHorario_P);
        $cordovaSQLite.execute(db, dropGrupos);
        $cordovaSQLite.execute(db, dropTareasProf);

    };

    function obtenerVista() {

        var estadoNombre;
        estadoNombre = $ionicHistory.currentStateName();
        return estadoNombre;

    }

    return {
        salida: salida,
        eliminarTablasEstu: eliminarTablasEstu,
        eliminarTablasProf: eliminarTablasProf,
        obtenerVista: obtenerVista
    };

};