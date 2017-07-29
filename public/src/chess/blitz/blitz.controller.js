(function(){

'use strict';

angular.module('chessnut')
.controller('BlitzController', BlitzController);

BlitzController.$inject = ['GameService', '$document', 'MoveNavigationService', '$scope']
function BlitzController(GameService, $document, MoveNavigationService, $scope){
	var $ctrl = this;
	$ctrl.name = 'blitz';
	$ctrl.timeOut = false;

	$ctrl.initialize = function(){
		$ctrl.game = GameService.getGame();
		$ctrl.board = GameService.makeBoard($ctrl.name);
		$(document).on('keyup', MoveNavigationService.moveListener);
		GameService.game_on = false;
	};

	$document.ready($ctrl.initialize);

	$ctrl.$onDestroy = function(){
		$(document).off();
	};

	$scope.$on('orientation:change_color', function(event, data){
		if (!GameService.game_on){
			GameService.player_change_side();
		}
		$ctrl.board.flip();
	});

	$scope.$on('chessclock:timeout', function(event, data){
		GameService.timeOut = true;
	});
};

})();//IIFE