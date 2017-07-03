(function(){

'use strict';

angular.module('chessnut')
.controller('ClassicalController', ClassicalController);

ClassicalController.$inject = ['ClassicalGameService', '$document'];
function ClassicalController(ClassicalGameService, $document){
	var $ctrl = this;
	$ctrl.name = 'john-chess';

	$ctrl.initialize = function(){
		$ctrl.game = ClassicalGameService.getGame();
		$ctrl.board = ClassicalGameService.makeBoard($ctrl.name);
	};

	$document.ready($ctrl.initialize);
	
};

})()//IIFE