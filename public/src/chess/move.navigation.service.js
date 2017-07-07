(function(){

'use strict';

angular.module('chessnut')
.service('MoveNavigationService', MoveNavigationService);

MoveNavigationService.$inject = ['GameService'];
function MoveNavigationService(GameService){
	var service = this;

	service.moveListener = function(e){
		var left = 37;
		var right  = 39;
		var isLeft;

		if (e.keyCode !== left && e.keyCode !== right) { 
			return; 
		}
		isLeft = (e.keyCode === left) ? true : false;
		service.moveNavigate(isLeft); 
	};

	service.moveNavigate = function(isLeft){
		GameService.moveNavigate(isLeft);
	}
}

})(); //IIFE