$scope.login = function() {


    var datos, datosRespuesta, nombreVista;

    datos = {
        Usuario: $scope.usuariotxt,
        Password: $scope.passwordtxt
    };

    $state.go('Loading');

    obtenerDatos.Autenticacion(datos).then(function(response) {

        if (response.data) {

            datosRespuesta = response.data;

            if (datosRespuesta === "Usuario no registrado" ||
                datosRespuesta === "Contraseña incorrecta") {

                $scope.respuesta = datosRespuesta

                $timeout(function() {
                    $scope.respuesta = datosRespuesta;
                    $state.go('login');
                }, 1000);

            };

        };
    });

}