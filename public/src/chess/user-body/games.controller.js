(function(){

'use strict';

angular.module('chessnut')
.controller('UserGamesController', UserGamesController);

UserGamesController.$inject = ['UserService', 'GameService', '$timeout', 'MoveNavigationService'];
function UserGamesController(UserService, GameService, $timeout, MoveNavigationService){
	var $ctrl = this;
	$ctrl.games = null;
	$ctrl.last_game = null;

	$ctrl.getGames = function(){
		UserService.getGames().
		then(function(response){
			$ctrl.games = UserService.games.reverse(); //newest first
			$ctrl.games.forEach(function(game){
				game.no_space_date = game.date.replace(/\s+/g, '');
			});
			$timeout($ctrl.setGames, 50);
		});
	};
	$ctrl.$onInit = $ctrl.getGames;

	$ctrl.setGames = function(){
		$ctrl.games.forEach(function(game){
			GameService.makeHistoryBoard(game.no_space_date, game.pgn, game.player_side);
		});
		$(document).on('keyup', MoveNavigationService.moveListener);
	}

	$ctrl.switchFocus = function(game){
		GameService.makeHistoryBoard(
			game.no_space_date, 
			game.pgn, 
			game.player_side
		);

		document.getElementById(game.no_space_date).style.opacity = 1;
		if ($ctrl.last_game){
			document.getElementById($ctrl.last_game.no_space_date).style.opacity = 0.7;
		}
		$ctrl.last_game = game;
	}
}

})(); //IIFE