angular.module('horarioEstudiante', ['ionic', 'ngCordova'])
    .controller('mostrarHorarioEstu', mostrarHorarioEstu)
    .factory('obtenerHorarioEstu', obtenerHorarioEstu);


mostrarHorarioEstu.$inject = ['$scope', 'obtenerHorarioEstu'];

function mostrarHorarioEstu($scope, obtenerHorarioEstu) {

    var Horario;

    obtenerHorarioEstu.datosHorario().then(function(informacion) {

        Horario = informacion;
        //console.log(Horario);

        $scope.horario = Horario;

    });

};


obtenerHorarioEstu.$inject = ['$cordovaSQLite'];

function obtenerHorarioEstu($cordovaSQLite) {

    return {

        datosHorario: function() {

            var sqlConsulta, db, asignatura, asignaturas, horario, l_horario, i, fila;

            sqlConsulta = "SELECT * FROM Horario";
            asignatura = {};
            asignaturas = [];

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            horario = $cordovaSQLite.execute(db, sqlConsulta, []).then(function(resultado) {

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
                        lugar: fila.Lugar,
                        docente: fila.Profesor

                    };

                    asignaturas.push(asignatura);

                }


                return asignaturas;

            }, function(err) {
                console.error(err);
            });

            return horario;

        }

    };

};