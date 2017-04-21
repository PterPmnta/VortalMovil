angular.module('calificacionesEstudiante', ['ionic', 'ngCordova'])
    .controller('mostrarNotasEstu', mostrarNotasEstu)
    .factory('obtenerNotasEstu', obtenerNotasEstu);


mostrarNotasEstu.$inject = ['$scope', 'obtenerNotasEstu']

function mostrarNotasEstu($scope, obtenerNotasEstu) {

    var Calificaciones;

    obtenerNotasEstu.datosCalificaciones().then(function(informacion) {

        Calificaciones = informacion;
        //console.log(Calificaciones);

        $scope.notas = Calificaciones;

    });

}


obtenerNotasEstu.$inject = ['$cordovaSQLite'];

function obtenerNotasEstu($cordovaSQLite) {

    return {

        datosCalificaciones: function() {

            var sqlConsulta, db, nota, notas, calificaciones, l_notas, i, fila, notaFinal, calcularNota;

            sqlConsulta = "SELECT * FROM Calificaciones";
            nota = {};
            notas = [];

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            calificaciones = $cordovaSQLite.execute(db, sqlConsulta, []).then(function(resultado) {

                l_notas = resultado.rows.length;

                for (i = 0; i < l_notas; i++) {

                    fila = resultado.rows.item(i);

                    calcularNota = (fila.Nota1 + fila.Nota2 + fila.Nota3) / 3;
                    notaFinal = (calcularNota.toFixed(2));

                    nota = {

                        nombre: fila.NombreAsig,
                        nota1: fila.Nota1,
                        nota2: fila.Nota2,
                        nota3: fila.Nota3,
                        definitiva: notaFinal,
                        habilitacion: 0.0

                    };

                    notas.push(nota);

                }

                return notas;

            }, function(err) {
                console.error(err);
            });

            return calificaciones;

        }

    };

}