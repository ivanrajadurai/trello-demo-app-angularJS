var ivan = angular.module('ivanApp');

ivan.controller('launchPageCtrl', function ($scope, ngDialog,authenticateService,$state, $window) {

    var isUserSignedIn = authenticateService.checkLoggedIn();

    if(!isUserSignedIn){
        $state.go('login')
    }

    var board = {
        lists : []
    };

    $scope.modal = {};

    $scope.userName = authenticateService.getLoggedInUserName();
    $scope.listCreated = function () {
      return board.lists.length;
    };

    $scope.addNewListSection = true;
    $scope.showEditListSection = false;

    $scope.showListAddingSection = function () {
        $scope.addNewListSection = false;
        $scope.showAddListSection = true;
    };

    $scope.addListToBoard = function (myList) {
        board.lists.push(myList);
        var checkValue = board.lists.length * 300;
        var dump = 200 +checkValue+"px";
        $scope.scopeWidth = dump;
    };

    $scope.setInitWidth = function () {
        $scope.scopeWidth = "600px";
    };

    $scope.setInitWidth();

    $scope.getLists = function () {
      return board.lists;
    };

    $scope.showCardDetails = function(listIndex, cardIndex, card) {
        $scope.currentCard = card;
        $scope.currentCardIndex = cardIndex;
        $scope.currentListIndex = listIndex;
        var showCardDetails = {
            templateUrl: 'views/cardDetails.html',
            className: 'ngdialog-theme-default cardDetailsPopup',
            scope: $scope,
            closeByDocument: false,
            showClose: false,
            closeByNavigation: true
        };
        ngDialog.open(showCardDetails);
    };

    $scope.updateListTitle = function (listTitle,index) {
        board.lists[index].listTitle = listTitle;
        $scope.showEditListSection = false;
    };

    $scope.deleteCard = function () {
        board.lists[$scope.currentListIndex].cards.splice($scope.currentCardIndex, 1);
        ngDialog.close();
    };

    $scope.createList = function (listTitle) {
        var myList = {
            listTitle : listTitle? listTitle :"List Title",
            cards: []
        };
        $scope.addListToBoard(myList);
        var newCard = {
            cardTitle: "",
            cardDescription: "",
            comments: []
        };
        board.lists[$scope.listCreated()-1].cards.push(newCard);
        $scope.addNewListSection = true;
        $scope.showAddListSection = false;
    };

    $scope.addComment = function (text) {
        if(text != "" && text != null && text != undefined){
            var toPass = {};
            var currentTime = new Date();
            toPass = {
                commentTitle : text,
                commentTime : currentTime.getTime()
            }
            $scope.currentCard.comments.push(toPass);
            $scope.modal.comment = null;
        }
    };

    $scope.updateCardTitle = function (title) {
        $scope.currentCard.cardTitle = title;
    };

    $scope.updateCardDescription = function (description) {
      $scope.currentCard.cardDescription = description;
    };

    $scope.closeCardDetails = function () {
      ngDialog.close();
    };

    $scope.addCard = function (listIndex) {
        var newCard = {
            cardTitle: "",
            cardDescription: "",
            comments: []
        };
        board.lists[listIndex].cards.push(newCard);
    };

    $scope.userSignOut = function () {
        authenticateService.setUserLoggedOut();
        $state.go('login')
    };

    $scope.deleteThisList = function (listIndex) {
      board.lists.splice(listIndex,1);
    };

    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('nav').addClass('shrink');
        } else {
            $('nav').removeClass('shrink');
        }
    });


    var trigger = $('#chumma');

    function showTip() {
        if (! $('#tip').is(':visible')) {
            trigger.click();
        }
    }

    function hideTip() {
        if ($('#tip').is(':visible')) {
            trigger.click();
        }
    }

    trigger.mouseenter(showTip);

    $(document).on('mouseleave', '#tip', hideTip);
})
.directive('inputFocus', function($timeout) {
    return {
        link: function(scope, element, attrs) {

            $timeout(function() {
                element[0].focus();
            });
        }
    };
});
