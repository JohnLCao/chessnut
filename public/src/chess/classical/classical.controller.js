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
	};

	$document.ready($ctrl.initialize);

	$ctrl.$onDestroy = function(){
		$(document).off();
	}
	
	$scope.$on('orientation:change_color', function(event, data){
		$ctrl.board.flip();
	});
};

})()//IIFE