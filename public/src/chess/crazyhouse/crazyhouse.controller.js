(function(){

'use strict';

angular.module('chessnut')
.controller('CrazyhouseController', CrazyhouseController);

CrazyhouseController.$inject = ['GameService', '$document', 'MoveNavigationService', '$scope']
function CrazyhouseController(GameService, $document, MoveNavigationService, $scope){
	var $ctrl = this;
	$ctrl.name = "crazyhouse";

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
};

})(); //IIFE