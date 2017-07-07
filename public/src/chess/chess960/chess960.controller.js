(function(){

'use strict';

angular.module('chessnut')
.controller('Chess960Controller', Chess960Controller);

Chess960Controller.$inject = ['GameService', '$document', 'MoveNavigationService', '$scope']; //as it turns out classical service can be reused
function Chess960Controller(GameService, $document, MoveNavigationService, $scope){
	var $ctrl = this;
	$ctrl.name = 'chess960';

	$ctrl.initBoard = function(event, data){
		var pos = generate960Position();
		var game_fen = pos + "/pppppppp/8/8/8/8/PPPPPPPP/" + pos.toUpperCase() + " w - - 0 1"
		$ctrl.board = GameService.makeBoard($ctrl.name, game_fen);
	}

	$ctrl.initialize = function(){
		$ctrl.initBoard();
		$(document).on('keyup', MoveNavigationService.moveListener);
	}

	$document.ready($ctrl.initialize);

	$ctrl.$onDestroy = function(){
		$(document).off();
	}

	$scope.$on('chess960:new_board', $ctrl.initBoard);

	$scope.$on('orientation:change_color', function(event, data){
		$ctrl.board.flip();
	});

	function generate960Position(){ 
		// console.log('generated random position!');
		var dark_bishop, light_bishop, queen, knight1, knight2;
		var isKing = false;
		var position = new Array(8);

		//bishop on any black square
		dark_bishop = roll_me(8);
		dark_bishop = (dark_bishop % 2 === 0) ? dark_bishop : dark_bishop + 1;
		position[dark_bishop] = 'b';

		//bishop on any white square
		light_bishop = roll_me(8);
		light_bishop = (light_bishop % 2 !== 0) ? light_bishop : light_bishop + 1;
		position[light_bishop] = 'b';

		//queen on any random square
		do{
			queen = roll_me(8);
		} while(position[queen] !== undefined);
		position[queen] = 'q';

		//knight on any random square
		do {
			knight1 = roll_me(8);
		} while(position[knight1] !== undefined);
		position[knight1] = 'n';

		//knight on any random square
		do{
			knight2 = roll_me(8);
		} while(position[knight2] !== undefined);
		position[knight2] = 'n';

		//king and two rooks on leftover squres. King in the middle of the rooks
		for (var i=0; i < position.length; i++){
			if (position[i] === undefined){
				position[i] = isKing ? 'k' : 'r';
				isKing = !isKing;
			}
		}

		return position.join("");
	}

	function roll_me(upper_limit) {
		return Math.floor(upper_limit * Math.random());
	}
}

})();//IIFE