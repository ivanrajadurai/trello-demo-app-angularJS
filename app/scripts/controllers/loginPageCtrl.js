var ivan = angular.module('ivanApp');

ivan.controller('loginPageCtrl', function ($scope,authenticateService,$state) {
    $scope.loginUser = function (userName, userPassword) {
        if(userName != null && userName != undefined && userName != "" && userPassword != null && userPassword != undefined && userPassword != ""){
            authenticateService.setUserLoggedIn(userName);
            $state.go('launchPage');
        }
    };
});
