angular.module('ivanApp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login',{
            url: '/login',
            controller: 'loginPageCtrl',
            templateUrl: 'views/loginPage.html'
        })
        .state('launchPage', {
            url: '/launchPage',
            controller: 'launchPageCtrl',
            templateUrl: 'views/launchPage.html'
        })
}]);
