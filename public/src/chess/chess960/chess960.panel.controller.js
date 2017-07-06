(function(){

'use strict';

angular.module('chessnut')
.controller('Chess960PanelController', Chess960PanelController);

function Chess960PanelController(){
	var $ctrl = this;
	$ctrl.onClickPlay = function(){
		//nothing yet
		console.log('John will implement me later :)');
	}
};

})();//IIFE