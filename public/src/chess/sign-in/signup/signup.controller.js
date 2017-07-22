(function(){

'use strict';

angular.module('chessnut')
.controller('SignupController', SignupController)

SignupController.$inject = ['SigninService', '$cookies']
function SignupController(SigninService, $cookies){
	var $ctrl = this;
	$ctrl.user = {};
	$ctrl.signupError = null;
	$ctrl.signup = function(){
		SigninService.signup($ctrl.user)
		.then(function(response){ //convenience cookie, real cookie not scriptable
			$cookies.put('login_session', true);
		})
		.catch(function(error){
			$ctrl.signupError = SigninService.signupError;
		});
	};
};

})(); //IIFE