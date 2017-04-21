angular.module('gruposProfesor', ['ionic', 'ngCordova'])
    .controller('mostrarGruposProf', mostrarGruposProf)
    .factory('obtenerGruposProf', obtenerGruposProf);


mostrarGruposProf.$inject = ['$scope', 'obtenerGruposProf'];

function mostrarGruposProf($scope, obtenerGruposProf) {

    var informacionGrupos;

    informacionGrupos = obtenerGruposProf.infoGrupos();
    //console.log(informacionGrupos);

    $scope.datos = {

        menuGrupos: informacionGrupos,
        opcionGrupo: function() {

            var codigoGrupo;

            //console.log($scope.seleccionado);

            codigoGrupo = $scope.seleccionado;

            obtenerGruposProf.datosGrupos(codigoGrupo).then(function(groupList) {

                //console.log(datos);
                $scope.listaGrupo = groupList;

            });

        }
    };

}


obtenerGruposProf.$inject = ['$cordovaSQLite'];

function obtenerGruposProf($cordovaSQLite) {

    function infoGrupos() {

        var getGrupos, gruposParser;

        getGrupos = localStorage.getItem('GruposProf');
        gruposParser = JSON.parse(getGrupos);

        return gruposParser;

    };

    function datosGrupos(codigo) {

        var sqlConsulta, db, grupo, grupos, totalGrupos, l_grupo, i, fila;

        sqlConsulta = "SELECT Cedula, Nombre, Apellido FROM GruposP WHERE Grupoasig = ?";
        grupo = {};
        grupos = [];

        db = $cordovaSQLite.openDB({
            name: "unicesar.db",
            location: "default"
        });

        totalGrupos = $cordovaSQLite.execute(db, sqlConsulta, [codigo]).then(function(resultado) {

            l_grupo = resultado.rows.length;

            for (i = 0; i < l_grupo; i++) {

                fila = resultado.rows.item(i);

                grupo = {

                    cedula: fila.Cedula,
                    nombre: fila.Nombre,
                    apellido: fila.Apellido

                };

                grupos.push(grupo);

            }

            return grupos;

        }, function(err) {
            console.error(err);
        });

        //console.log(totalGrupos);
        return totalGrupos;

    };



    return {
        infoGrupos: infoGrupos,
        datosGrupos: datosGrupos
    };

}