angular.module('modulo_Noticias', ['ionic'])
    .controller('noticiasCtrl', noticiasCtrl)
    .directive('backMenu', backMenu);


noticiasCtrl.$inject = ['$scope', '$ionicHistory'];

function noticiasCtrl($scope, $ionicHistory) {

    $scope.Retroceder = function() {
        $ionicHistory.goBack();
    };
  
}

function backMenu() {

    return {

        restrict: 'AE',

        scope: {
            click: "&"
        },

        template: '<button class="button button-icon icon ion-ios-arrow-back button-clear"></button>',

        link: function($scope, $element) {

            var button = $element.find('button');

            var evtHandler = function() {
                button[0].click();
            };

            button.on('click', function() {
                $scope.click({});
            });

        }

    };

}