(function(){

'use strict';

angular.module('chessnut')
.controller('LoginController', LoginController)

LoginController.$inject = ['SigninService', '$cookies'];
function LoginController(SigninService, $cookies){
	var $ctrl = this;
	$ctrl.loginError = null;
	$ctrl.login = function(){
		SigninService.login($ctrl.username, $ctrl.password)
		.then(function(response){
			// convenience cookie, real cookie not scriptable
			$cookies.put('login_session', $ctrl.username);
		})
		.catch(function(error){
			$ctrl.loginError = SigninService.loginError;
		});
	};
};

})(); //IIFE