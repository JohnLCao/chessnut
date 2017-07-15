(function(){

'use strict';

angular.module('chessnut')
.controller('LoginController', LoginController)

LoginController.$inject = ['$state']
function LoginController($state){
	var $ctrl = this;

	$ctrl.login = function(){
		var loginSuccess = true;
		if (loginSuccess){
			$state.transitionTo('classical');
		}
	};
};

})(); //IIFE