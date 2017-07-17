(function(){

'use strict';

angular.module('chessnut')
.controller('SignupController', SignupController)

SignupController.$inject = ['SigninService']
function SignupController(SigninService){
	var $ctrl = this;
	$ctrl.user = {};
	$ctrl.signup = function(){
		SigninService.signup($ctrl.user);
	};
};

})(); //IIFE