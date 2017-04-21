angular.module('horarioProfesor', ['ionic', 'ngCordova'])
    .controller('mostrarHorarioProf', mostrarHorarioProf)
    .factory('obtenerHorarioProf', obtenerHorarioProf);


mostrarHorarioProf.$inject = ['$scope', 'obtenerHorarioProf'];

function mostrarHorarioProf($scope, obtenerHorarioProf) {

    var Horariop;

    obtenerHorarioProf.datosHorario().then(function(informacion) {

        Horariop = informacion;
        //console.log(Horariop);

        $scope.horario = Horariop;

    });

};


obtenerHorarioProf.$inject = ['$cordovaSQLite'];

function obtenerHorarioProf($cordovaSQLite) {

    return {

        datosHorario: function() {

            var sqlConsulta, db, asignatura, asignaturas, horariop, l_horario, i, fila;

            sqlConsulta = "SELECT * FROM HorarioP";
            asignatura = {};
            asignaturas = [];

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            horariop = $cordovaSQLite.execute(db, sqlConsulta, []).then(function(resultado) {

                l_horario = resultado.rows.length;

                for (i = 0; i < l_horario; i++) {

                    fila = resultado.rows.item(i);

                    asignatura = {

                        codigo: fila.Codigo,
                        grupo: fila.Grupo,
                        nombre: fila.Nombre,
                        creditos: fila.Creditos,
                        dia: fila.Dia,
                        hora: fila.Hora,
                        lugar: fila.Lugar

                    };

                    asignaturas.push(asignatura);

                }

                return asignaturas;

            }, function(err) {
                console.error(err);
            });

            return horariop;

        }

    };

};