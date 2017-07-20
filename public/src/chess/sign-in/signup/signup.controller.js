(function(){

'use strict';

angular.module('chessnut')
.controller('SignupController', SignupController)

SignupController.$inject = ['SigninService']
function SignupController(SigninService){
	var $ctrl = this;
	$ctrl.user = {};
	$ctrl.signupError = null;
	$ctrl.signup = function(){
		SigninService.signup($ctrl.user)
		.catch(function(error){
			$ctrl.signupError = SigninService.signupError;
		});
	};
};

})(); //IIFE