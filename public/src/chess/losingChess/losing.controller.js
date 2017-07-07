(function(){

'use strict';

angular.module('chessnut')
.controller('LosingChessController', LosingChessController);

LosingChessController.$inject = ['LosingChessGameService', '$document']
function LosingChessController(){
	var $ctrl = this;
	$ctrl.name = 'losing';
};

})();//IIFE