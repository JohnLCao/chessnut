(function(){

'use strict';

angular.module('chessnut')
.controller('BlitzController', BlitzController);

BlitzController.$inject = ['GameService', '$document', 'MoveNavigationService', '$scope', '$rootScope']
function BlitzController(GameService, $document, MoveNavigationService, $scope, $rootScope){
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
		$rootScope.$broadcast('game:game_over', {
			winner: data.winner
		})
	});

	$scope.$on('game:game_over', function(event, data){
		$('.board').css('opacity', 0.7);
		console.log(data.winner);
	});
};

})();//IIFE