angular.module('calendarioProf', ['ionic', 'ngCordova'])
    .controller('tareasProf', tareasProf)
    .factory('fabricaTareasProf', fabricaTareasProf);

tareasProf.$inject = ['$scope', '$ionicModal', '$timeout', 'fabricaTareasProf'];

function tareasProf($scope, $ionicModal, $timeout, fabricaTareasProf) {

    var fecha_Actual;

    fecha_Actual = moment(new Date()).format('YYYY-MM-DD');

    $scope.nueva = {};

    $scope.nueva.mensaje = false;
    $scope.nueva.listaTarea = false;


    $ionicModal.fromTemplateUrl('Templates/Docente/modalprof.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    fabricaTareasProf.consultaTareas().then(function(informacion) {

        if (informacion === 0) {
            $scope.nueva.listaTarea = true;
        } else {
            $scope.nueva.tareasProf = informacion;
        }

    });


    $scope.agregarTareas = function() {

        var datosTarea, fechaDigitada;

        datosTarea = {
            Tarea: $scope.nueva.tareatxt,
            Fecha: $scope.nueva.fechatxt
        };


        if (typeof datosTarea.Tarea === 'undefined' || typeof datosTarea.Fecha === 'undefined') {

            $scope.nueva.mensaje = true;

            $timeout(function() {
                $scope.nueva.mensaje = false;
            }, 2000);

        } else {

            fechaDigitada = moment(new Date(datosTarea.Fecha)).format('YYYY-MM-DD');

            if (fecha_Actual === fechaDigitada) {

                fabricaTareasProf.cantidadTareas().then(function(informacion) {

                    numeroTareas = informacion;
                    fabricaTareasProf.insertarTareaHoy(datosTarea, numeroTareas).then(function(datos) {

                        $scope.nueva.tareasProf = datos;
                        $scope.nueva.listaTarea = false;
                        window.plugins.toast.showShortBottom('Tarea creada');

                    });

                });

                $scope.nueva.tareatxt = undefined;
                $scope.nueva.fechatxt = undefined;

            } else {

                fabricaTareasProf.cantidadTareas().then(function(informacion) {

                    fabricaTareasProf.insertarTarea(datosTarea, numeroTareas);
                    window.plugins.toast.showShortBottom('Tarea creada');

                });

                $scope.nueva.tareatxt = undefined;
                $scope.nueva.fechatxt = undefined;

            }

        }
    }

    $scope.eliminarTareas = function(fila_Tarea) {

        fabricaTareasProf.eliminarTareasHoy(fila_Tarea).then(function(mensajeTareas) {

            if (mensajeTareas === 0) {

                $scope.nueva.listaTarea = true;
                $scope.nueva.tareasProf = null;

            } else {

                fabricaTareasProf.consultaTareas().then(function(informacion_Consulta) {

                    fabricaTareasProf.insertarActual(informacion_Consulta).then(function(nueva_informacion) {

                        $scope.nueva.tareasProf = nueva_informacion;

                    });

                    window.plugins.toast.showShortBottom('Tarea eliminada');

                });

            }

        });

    }

};


fabricaTareasProf.$inject = ['$cordovaSQLite'];

function fabricaTareasProf($cordovaSQLite) {

    return {

        cantidadTareas: function() {

            var cantidad, sqlConsulta_Cantidad, l_tareas, db, mensajeCantidad;

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            sqlConsulta_Cantidad = "SELECT * FROM TareasProf";

            mensajeCantidad = $cordovaSQLite.execute(db, sqlConsulta_Cantidad, []).then(function(resultado) {

                l_tareas = resultado.rows.length;
                return l_tareas;

            });

            return mensajeCantidad;

        },


        insertarTareaHoy: function(datosTarea, numeroTareas) {

            var listaTareas, fila, texto, fecha, db, sqlInsertar, sqlConsulta_Cantidad, fechaDigitada, tareas, tarea, row;

            tareas = [];
            tarea = {};

            fechaDigitada = moment(new Date(datosTarea.Fecha)).format('YYYY-MM-DD');

            fila = numeroTareas + 1;
            texto = datosTarea.Tarea;
            fecha = fechaDigitada;

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });


            sqlInsertar = "INSERT INTO TareasProf(Fila, Texto, Fecha) VALUES(?,?,?)";
            sqlConsulta_Cantidad = "SELECT * FROM TareasProf WHERE Fecha = ?";

            $cordovaSQLite.execute(db, sqlInsertar, [fila, texto, fecha]);

            listaTareas = $cordovaSQLite.execute(db, sqlConsulta_Cantidad, [fecha]).then(function(resultado) {

                l_tareas = resultado.rows.length;
                console.log(l_tareas);

                for (i = 0; i < l_tareas; i++) {

                    row = resultado.rows.item(i);

                    tarea = {

                        fila: row.Fila,
                        texto: row.Texto,
                        fecha: row.Fecha
                    };

                    tareas.push(tarea);

                }

                return tareas;

            });

            return listaTareas;

        },

        insertarTarea: function(datosTarea, numeroTareas) {

            var listaTareas, fila, texto, fecha, db, sqlInsertar, fechaDigitada, row;

            tareas = [];
            tarea = {};

            fechaDigitada = moment(new Date(datosTarea.Fecha)).format('YYYY-MM-DD');

            fila = numeroTareas + 1;
            texto = datosTarea.Tarea;
            fecha = fechaDigitada;

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            sqlInsertar = "INSERT INTO TareasProf(Fila, Texto, Fecha) VALUES(?,?,?)";

            $cordovaSQLite.execute(db, sqlInsertar, [fila, texto, fecha]);

        },

        insertarActual: function(datosConsulta) {

            var listaTareas, db, sqlInsertar, sqlConsulta_Cantidad, sqlEliminarDatos, tareas, tarea, row, l_tareas, largo, inicio, fila, fechaDigitada;

            tareas = [];
            tarea = {};

            console.log(datosConsulta);

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            fechaDigitada = moment(new Date()).format('YYYY-MM-DD');

            sqlInsertar = "INSERT INTO TareasProf(Fila, Texto, Fecha) VALUES(?,?,?)";
            sqlConsulta_Cantidad = "SELECT * FROM TareasProf WHERE Fecha = ?";
            sqlEliminarDatos = "DELETE * FROM TareasProf";

            largo = datosConsulta.length;

            $cordovaSQLite.execute(db, sqlEliminarDatos, []);

            for (inicio = 0; inicio < largo; inicio++) {

                fila = inicio + 1;
                $cordovaSQLite.execute(db, sqlInsertar, [fila, datosConsulta.texto, datosConsulta.fecha]);

            }

            listaTareas = $cordovaSQLite.execute(db, sqlConsulta_Cantidad, [fechaDigitada]).then(function(resultado) {

                l_tareas = resultado.rows.length;
                console.log(l_tareas);

                for (i = 0; i < l_tareas; i++) {

                    row = resultado.rows.item(i);

                    tarea = {

                        fila: row.Fila,
                        texto: row.Texto,
                        fecha: row.Fecha
                    };

                    tareas.push(tarea);

                }

                return tareas;

            });

            return listaTareas;


        },

        consultaTareas: function() {

            var listaTareas, tareas, tarea, sqlConsulta, fechaHoy, l_tareas, fila, mensaje, db;

            tareas = [];
            tarea = {};

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            fechaHoy = moment(new Date()).format('YYYY-MM-DD');
            sqlConsulta = "SELECT * FROM TareasProf WHERE Fecha = ?";

            listaTareas = $cordovaSQLite.execute(db, sqlConsulta, [fechaHoy]).then(function(resultado) {

                l_tareas = resultado.rows.length;

                if (l_tareas > 0) {

                    for (i = 0; i < l_tareas; i++) {

                        fila = resultado.rows.item(i);

                        tarea = {

                            numero: fila.Fila,
                            texto: fila.Texto,
                            fecha: fila.Fecha

                        };

                        tareas.push(tarea);

                    }

                    return tareas;

                } else {

                    mensaje = 0;
                    return mensaje;

                }


            }, function(err) {
                console.error(err);
            });

            return listaTareas;

        },

        eliminarTareasHoy: function(fila_tarea) {

            var sqlEliminar, sqlConsulta_Cantidad, db, fila, l_tareas, cantidadTareas, fechaHoy;

            db = $cordovaSQLite.openDB({
                name: "unicesar.db",
                location: "default"
            });

            fila = fila_tarea;
            fechaHoy = moment(new Date()).format('YYYY-MM-DD');

            sqlEliminar = 'DELETE FROM TareasProf WHERE Fila = ?';
            sqlConsulta_Cantidad = "SELECT * FROM TareasProf WHERE Fecha = ?";

            $cordovaSQLite.execute(db, sqlEliminar, [fila]);

            cantidadTareas = $cordovaSQLite.execute(db, sqlConsulta_Cantidad, [fechaHoy]).then(function(resultado) {

                l_tareas = resultado.rows.length;
                return l_tareas;

            });

            return cantidadTareas;

        }


    };

};