(function(){

'use strict';

angular.module('chessnut')
.controller('ClassicalController', ClassicalController);

ClassicalController.$inject = ['GameService', '$document', 'MoveNavigationService', '$scope'];
function ClassicalController(GameService, $document, MoveNavigationService, $scope){
	var $ctrl = this;
	$ctrl.name = 'classical';

	$ctrl.initialize = function(){
		$ctrl.game = GameService.getGame();
		$ctrl.board = GameService.makeBoard($ctrl.name);
		$(document).on('keyup', MoveNavigationService.moveListener);
		GameService.game_on = false;
	};

	$document.ready($ctrl.initialize);

	$ctrl.$onDestroy = function(){
		$(document).off();
	}
	
	$scope.$on('orientation:change_color', function(event, data){
		if (!GameService.game_on){
			GameService.player_change_side();
		}
		$ctrl.board.flip();
	});

	$scope.$on('game:game_over', function(event, data){
		$('.board').css('opacity', 0.7);
		console.log(data.winner);
	})
};

})()//IIFE