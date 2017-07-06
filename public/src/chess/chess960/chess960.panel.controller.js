(function(){

'use strict';

angular.module('chessnut')
.controller('Chess960PanelController', Chess960PanelController);

Chess960PanelController.$inject = ['$rootScope']
function Chess960PanelController($rootScope){
	var $ctrl = this;
	$ctrl.onClickPlay = function(){
		//nothing yet
		console.log('John will implement me later :)');
	}

	$ctrl.newPosition = function(){
		$rootScope.$broadcast('chess960:new_board');
	};
};

})();//IIFE