(function(){

'use strict';

angular.module('chessnut')
.controller('UserGamesController', UserGamesController);

UserGamesController.$inject = ['UserService', 'GameService', '$timeout'];
function UserGamesController(UserService, GameService, $timeout){
	var $ctrl = this;
	$ctrl.games = null;

	$ctrl.getGames = function(){
		UserService.getGames().
		then(function(response){
			$ctrl.games = UserService.games;
			$timeout($ctrl.setGames, 50);
		});
	};
	$ctrl.$onInit = $ctrl.getGames;

	$ctrl.setGames = function(){
		console.log($ctrl.games);
		$ctrl.games.forEach(function(game){
			GameService.makeHistoryBoard(game.date, game.pgn, game.player_side);
		});
	}
}

})(); //IIFE