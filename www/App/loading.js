angular.module('loadingPage', ['ionic', 'loginApp'])
    .controller('mostrarMensaje', mostrarMensaje);

mostrarMensaje.$inject = ['$scope', '$window'];

function mostrarMensaje($scope, $window) {

    $scope.$on('$ionicView.beforeEnter', function() {
        if ($window.localStorage.logged) {
            $scope.mensaje = "Cargando información";
        } else {
            $scope.mensaje = "Cerrando sesión";
        }
    });

}