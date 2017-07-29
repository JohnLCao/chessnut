(function(){

'use strict';

angular.module('chessnut')
.controller('Chess960PanelController', Chess960PanelController);

Chess960PanelController.$inject = ['$rootScope', 'GameService']
function Chess960PanelController($rootScope, GameService){
	var $ctrl = this;
	$ctrl.onClickPlay = function(){
		$('.board').css('opacity', 1);
		GameService.begin();
		console.log('game on!');
	};

	$ctrl.newPosition = function(){
		$rootScope.$broadcast('chess960:new_board');
	};
};

})();//IIFE