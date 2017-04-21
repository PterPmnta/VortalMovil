angular.module('perfilProfesor', ['ionic', 'ngCordova'])
    .controller('mostrarPerfilProf', mostrarPerfilProf)
    .factory('obtenerPerfilProf', obtenerPerfilProf);


mostrarPerfilProf.$inject = ['$scope', 'obtenerPerfilProf'];

function mostrarPerfilProf($scope, obtenerPerfilProf, $element) {

    var Perfil, Mes, Periodo_Prof, input, button, evtHandler, dataImage;

    Mes = moment().format('MM');

    if (Mes < 07) {
        Periodo_Prof = "Periodo - I";
    } else {
        Periodo_Prof = "Periodo - II";
    }

    obtenerPerfilProf.datosPerfil().then(function(data) {

        Perfil = data;

        $scope.Cedula = Perfil.cedula;
        $scope.Nombre = Perfil.nombre;
        $scope.Apellido = Perfil.apellido;
        $scope.Rol = Perfil.rol;
        $scope.Facultad = Perfil.facultad;
        $scope.Programa = Perfil.programa;
        $scope.Periodo = Periodo_Prof;

    });

    $scope.data = {};

    dataImage = localStorage.getItem("imgData");

    if (dataImage === null) {
        $scope.data.ImageURI = "img/profile_icon.png";
    } else {
        $scope.data.ImageURI = dataImage;
    }  

    $scope.obtenerFoto = function (){

         navigator.camera.getPicture(onSuccess, onFail, { 
             
             quality: 100,
             destinationType: navigator.camera.DestinationType.FILE_URI,
             sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY

         });

    };

    function onSuccess(imageURI) {
        
        var image = document.getElementById('myImage');
        image.src = imageURI;
        localStorage.setItem("imgData", imageURI);
        
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

}



obtenerPerfilProf.$inject = ['$cordovaSQLite'];

function obtenerPerfilProf($cordovaSQLite) {


    return {

        datosPerfil: function() {

            var sqlConsulta, db, perfil, datos, l_perfil, i, fila;

            sqlConsulta = "SELECT * FROM Profesor"
            perfil = {};

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            perfil = $cordovaSQLite.execute(db, sqlConsulta, []).then(function(resultado) {

                l_perfil = resultado.rows.length;

                for (i = 0; i < l_perfil; i++) {

                    fila = resultado.rows.item(i);

                    datos = {

                        cedula: fila.Cedula,
                        nombre: fila.Nombre,
                        apellido: fila.Apellido,
                        rol: "Profesor",
                        facultad: fila.Facultad,
                        programa: fila.Programa

                    };

                }


                return datos;

            }, function(err) {
                console.error(err);
            });


            return perfil;

        },

        obtenerVista: function() {

            var vista;

            vista = $ionicHistory.backView();
            return vista;

        }

    };

}