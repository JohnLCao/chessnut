(function(){

'use strict';

angular.module('chessnut')
.controller('OrientationController', OrientationController);

OrientationController.$inject = ['$rootScope']
function OrientationController($rootScope){
	var $ctrl = this;
	$ctrl.color = 'white';

	$ctrl.changeColor = function(){
		$ctrl.color = $ctrl.color==='white' ? 'black' : 'white';
		$rootScope.$broadcast('orientation:change_color');
	}
};

})(); //IIFE