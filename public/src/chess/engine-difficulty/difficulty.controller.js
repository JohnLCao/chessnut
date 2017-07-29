(function(){

'use strict';

angular.module('chessnut')
.controller('DiffucultyController', DifficultyController);

DifficultyController.$inject = ['GameService'];
function DifficultyController(GameService){
	var $ctrl = this;
}

})(); //IIFE