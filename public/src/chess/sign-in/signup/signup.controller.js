(function(){

'use strict';

angular.module('chessnut')
.controller('SignupController', SignupController)

function SignupController(){
	var $ctrl = this;
	$ctrl.signup = function(){
		//transform login service to sign up service and do something here.
	};
};

})(); //IIFE