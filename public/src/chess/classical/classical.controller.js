(function(){

'use strict';

angular.module('chessnut')
.controller('ClassicalController', ClassicalController);

ClassicalController.$inject = ['ClassicalGameService', '$document'];
function ClassicalController(ClassicalGameService, $document){
	var $ctrl = this;
	$ctrl.name = 'classical';

	$ctrl.moveNavigate = function(isLeft){ 
		ClassicalGameService.moveNavigate(isLeft);
	};

	$ctrl.initialize = function(){
		$ctrl.game = ClassicalGameService.getGame();
		$ctrl.board = ClassicalGameService.makeBoard($ctrl.name);
		$(document).bind('keyup', function(e){
			var left = 37;
			var right  = 39;
			var isLeft;

			if (e.keyCode !== left && e.keyCode !== right) { 
				return; 
			}
			isLeft = (e.keyCode === left) ? true : false;
			$ctrl.moveNavigate(isLeft); 
		});
	};

	$document.ready($ctrl.initialize);

	
};

})()//IIFE