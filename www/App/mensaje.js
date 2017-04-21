angular.module('mensajeCarga', ['ionic'])
    .service('mostrarMensaje', mostrarMensaje);

function mostrarMensaje() {

    var mensaje;

    return {

        setMensaje: function(mensajeRecibido) {
            mensaje = mensajeRecibido
        },

        getMensaje: function() {
            return mensaje;
        }

    }

}