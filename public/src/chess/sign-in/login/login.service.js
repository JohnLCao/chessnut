(function(){

'use strict';

angular.module('chessnut')
.service('LoginService', LoginService);

function LoginService(){
	var service = this;
	service.loggedIn = false;
};

})();//IIFE