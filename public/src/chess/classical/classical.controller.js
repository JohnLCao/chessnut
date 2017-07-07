(function(){

'use strict';

angular.module('chessnut')
.controller('ClassicalController', ClassicalController);

ClassicalController.$inject = ['ClassicalGameService', '$document', 'MoveNavigationService', '$scope'];
function ClassicalController(ClassicalGameService, $document, MoveNavigationService, $scope){
	var $ctrl = this;
	$ctrl.name = 'classical';

	$ctrl.initialize = function(){
		$ctrl.game = ClassicalGameService.getGame();
		$ctrl.board = ClassicalGameService.makeBoard($ctrl.name);
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