(function(){

'use strict';

angular.module('chessnut')
.controller('CrazyhousePanelController', CrazyhousePanelController)

CrazyhousePanelController.$inject = ['GameService'];
function CrazyhousePanelController(GameService){
	var $ctrl = this;
	$ctrl.onClickPlay = function(){
		$('.board').css('opacity', 1);
		GameService.begin();
		console.log('game on!');
	};
};

})(); //IIFE