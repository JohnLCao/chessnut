(function(){

'use strict';

angular.module('chessnut')
.controller('DifficultyController', DifficultyController);

DifficultyController.$inject = ['GameService', '$rootScope'];
function DifficultyController(GameService, $rootScope){
	var $ctrl = this;
	$ctrl.selectLevel = function(level){
		GameService.setLevel(level);
		//currently no one listens to this event. in the future, possible prevent resetting engine level
		// when game is already in progress.
		$rootScope.$broadcast('engine_difficulty:set');
	}
}

})(); //IIFE