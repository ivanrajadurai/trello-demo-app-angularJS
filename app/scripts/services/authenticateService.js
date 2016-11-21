angular.module('ivanApp').factory('authenticateService', function($cookies) {

    function setUserLoggedIn(userName) {
        $cookies.put('userName', userName);
        $cookies.put('isAuthenticated', true);
    }

    function setUserLoggedOut() {
        $cookies.remove('userName');
        $cookies.remove('isAuthenticated')
    }

    function getLoggedInUserName() {
        var loggedInUserName = $cookies.get('userName');
        return loggedInUserName;
    }

    function checkLoggedIn() {
        var loggedInUserName = $cookies.get('userName');
        var isAuthenticated = $cookies.get('isAuthenticated');
        if(loggedInUserName && isAuthenticated){
            return true
        }else{
            return false
        }
    }

    return {
        setUserLoggedIn : setUserLoggedIn,
        setUserLoggedOut : setUserLoggedOut,
        getLoggedInUserName : getLoggedInUserName,
        checkLoggedIn : checkLoggedIn
    }



});
