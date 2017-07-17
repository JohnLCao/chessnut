(function(){

'use strict';

angular.module('chessnut')
.controller('SignupController', SignupController)

SignupController.$inject = ['SigninService']
function SignupController(SigninService){
	var $ctrl = this;
	$ctrl.signup = function(){
		//transform login service to sign up service and do something here.
	};
};

})(); //IIFE