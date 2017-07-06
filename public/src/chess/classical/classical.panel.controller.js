(function(){
	
'use strict';

angular.module('chessnut')
.controller('ClassicalPanelController', ClassicalPanelController);

function ClassicalPanelController() {
	var $ctrl = this;
	$ctrl.onClickPlay = function(){
		//currently, do nothing
		console.log('ugh, I will do something later');
	}
};	

})(); //IIFE