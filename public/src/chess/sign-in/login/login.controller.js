(function(){

'use strict';

angular.module('chessnut')
.controller('LoginController', LoginController)

LoginController.$inject = ['SigninService'];
function LoginController(SigninService){
	var $ctrl = this;
	$ctrl.login = function(){
		SigninService.login($ctrl.username, $ctrl.password);
	};
};

})(); //IIFE