(function(){

'use strict';

angular.module('chessnut')
.controller('UserGamesController', UserGamesController);

UserGamesController.$inject = ['UserService'];
function UserGamesController(UserService){
	var $ctrl = this;
	$ctrl.user = null;
}

})(); //IIFE