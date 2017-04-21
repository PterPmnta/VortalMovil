angular.module('salirApp', ['ionic'])
    .controller('appExit', appExit);


appExit.$inject = ['$scope'];

function appExit($scope) {

    $scope.mensajeSalida = "Cerrando sesion";

}