(function(){

'use strict';

angular.module('chessnut')
.controller('LosingChessController', LosingChessController);

function LosingChessController(){
	var $ctrl = this;
	$ctrl.name = 'losing';
};

})();//IIFE