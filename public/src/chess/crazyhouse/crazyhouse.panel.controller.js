(function(){

'use strict';

angular.module('chessnut')
.controller('CrazyhousePanelController', CrazyhousePanelController)

function CrazyhousePanelController(){
	var $ctrl = this;
	$ctrl.onClickPlay = function(){
		//do nothing at the moment
		console.log('John will implement me eventually, I just know it!');
	};
};

})(); //IIFE