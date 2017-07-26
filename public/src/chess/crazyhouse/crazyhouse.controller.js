(function(){

'use strict';

angular.module('chessnut')
.controller('CrazyhouseController', CrazyhouseController);

CrazyhouseController.$inject = ['GameService', '$document', 'MoveNavigationService', '$scope', '$rootScope']
function CrazyhouseController(GameService, $document, MoveNavigationService, $scope, $rootScope){
	var $ctrl = this;
	$ctrl.name = "crazyhouse";
	$ctrl.drag_piece = null;

	$ctrl.initialize = function(){
		$ctrl.game = GameService.getGame();
		$ctrl.board = GameService.makeBoard($ctrl.name);
		$(document).on('keyup', MoveNavigationService.moveListener);
	};

	$document.ready($ctrl.initialize);

	$ctrl.$onDestroy = function(){
		$(document).off();
	}

	$scope.$on('orientation:change_color', function(event, data){
		$ctrl.board.flip();
	});

	$scope.$on('crazyhouse:reserves:drag_start', function(event, data){
		$ctrl.drag_piece = data.piece;
	})

	$ctrl.onDragOver = function(e){
		e.preventDefault();
	}

	$ctrl.onDropReserve = function(e){
		var piece = $ctrl.drag_piece;
		var square = e.target.getAttribute('data-square');
		console.log('droped a', piece, 'on', square);
		$rootScope.$broadcast('crazyhouse:reserves:drag_stop', {
			piece: $ctrl.drag_piece,
			square: e.target.getAttribute('data-square')
		});
		updateGame(piece, square);
		$ctrl.drag_piece = null;
	};

	function updateGame(piece, square){
		if (square) {
			// update board
			var pos_aftr_drop = $ctrl.board.position();
			pos_aftr_drop[square] = piece;
			$ctrl.board.position(pos_aftr_drop);
			// update game
			var turn = ($ctrl.game.turn() === 'w') ? 'b' : 'w'; //dropping takes the turn
			GameService.pieceDropUpdate(piece, square, turn);
			console.log(GameService.game.turn());
			// console.log($ctrl.game.put({type: piece[1], color: piece[0]}, square));
		}
	};
};

})(); //IIFE