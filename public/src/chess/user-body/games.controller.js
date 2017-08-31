(function(){

'use strict';

angular.module('chessnut')
.controller('UserGamesController', UserGamesController);

UserGamesController.$inject = ['UserService'];
function UserGamesController(UserService){
	var $ctrl = this;
	$ctrl.games = null;

	$ctrl.getGames = function(){
		UserService.getGames().
		then(function(response){
			$ctrl.games = service.games;
		});
	};

	$ctrl.$onInit = $ctrl.getGames;
}

})(); //IIFE