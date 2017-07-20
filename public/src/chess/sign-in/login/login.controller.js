(function(){

'use strict';

angular.module('chessnut')
.controller('LoginController', LoginController)

LoginController.$inject = ['SigninService'];
function LoginController(SigninService){
	var $ctrl = this;
	$ctrl.loginError = null;
	$ctrl.login = function(){
		SigninService.login($ctrl.username, $ctrl.password)
		.catch(function(error){
			console.log('Login controller is catching the error');
			$ctrl.loginError = "Invalid username password combination";
		});
	};
};

})(); //IIFE