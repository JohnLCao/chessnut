(function(){

'use strict';

angular.module('chessnut')
.controller('BlitzPanelController', BlitzPanelController);

BlitzPanelController.$inject = ['GameService'];
function BlitzPanelController(GameService){
	var $ctrl = this;
	$ctrl.onClickPlay = function(){
		$('.board').css('opacity', 1);
		GameService.begin();
		console.log('game on!');
	}
}

})();//IIFE