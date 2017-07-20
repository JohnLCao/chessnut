(function(){

'use strict';

angular.module('chessnut')
.controller('CrazyhouseController', CrazyhouseController);

CrazyhouseController.$inject = ['GameService']
function CrazyhouseController(){
	var $ctrl = this;
};

})(); //IIFE