(function(){

'use strict';

angular.module('chessnut')
.controller('DifficultyController', DifficultyController);

DifficultyController.$inject = ['GameService', '$rootScope'];
function DifficultyController(GameService, $rootScope){
	var $ctrl = this;
	$ctrl.selectLevel = function(level){
		GameService.setLevel(level);
		$rootScope.$broadcast('engine_difficulty:set');
	}
}

})(); //IIFE