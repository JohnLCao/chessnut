(function(){

'use strict';

angular.module('chessnut')
.controller('DifficultyController', DifficultyController);

DifficultyController.$inject = ['GameService'];
function DifficultyController(GameService){
	var $ctrl = this;
}

})(); //IIFE