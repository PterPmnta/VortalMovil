angular.module('perfilEstudiante', ['ionic', 'ngCordova'])
       .controller('mostrarPerfilEstu', mostrarPerfilEstu)
       .factory('obtenerPerfilEstu', obtenerPerfilEstu);


mostrarPerfilEstu.$inject = ['$scope', 'obtenerPerfilEstu', '$cordovaCamera', '$cordovaFile'];

function mostrarPerfilEstu($scope, obtenerPerfilEstu, $cordovaCamera, $cordovaFile, $element) {

    var Perfil, Mes, Periodo_Estu, input, button, evtHandler, dataImage;

    Mes = moment().format('MM');

    if (Mes < 07) {
        Periodo_Estu = "Periodo - I";
    } else {
        Periodo_Estu = "Periodo - II";
    }

    obtenerPerfilEstu.datosPerfil().then(function (data) {

        Perfil = data;

        //console.log(data);

        $scope.Cedula = Perfil.cedula;
        $scope.Nombre = Perfil.nombre;
        $scope.Apellido = Perfil.apellido;
        $scope.Rol = Perfil.rol;
        $scope.Facultad = Perfil.facultad;
        $scope.Programa = Perfil.programa;
        $scope.Semestre = Perfil.semestre;
        $scope.Periodo = Periodo_Estu;

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


obtenerPerfilEstu.$inject = ['$cordovaSQLite', '$ionicHistory'];

function obtenerPerfilEstu($cordovaSQLite, $ionicHistory) {

    return {

        datosPerfil: function () {

            var sqlConsulta, db, perfil, datos, l_perfil, i, fila;

            sqlConsulta = "SELECT * FROM Estudiante";
            perfil = {};

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            perfil = $cordovaSQLite.execute(db, sqlConsulta, []).then(function (resultado) {

                l_perfil = resultado.rows.length;

                for (i = 0; i < l_perfil; i++) {

                    fila = resultado.rows.item(i);

                    datos = {

                        cedula: fila.Cedula,
                        nombre: fila.Nombre,
                        apellido: fila.Apellido,
                        rol: fila.Rol,
                        facultad: fila.Facultad,
                        programa: fila.Programa,
                        semestre: fila.Semestre

                    };

                }

                return datos;

            }, function (err) {
                console.error(err);
            });


            return perfil;

        }

    };

}