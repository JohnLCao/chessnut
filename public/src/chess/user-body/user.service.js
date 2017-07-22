(function(){

'use strict';

angular.module('chessnut')
.service('UserService', UserService);

UserService.$inject = ['$cookies'];
function UserService($cookies){
	var service = this;
	service.user = {};
	service.getUser = function(){
		service.user.username = $cookies.get('login_session');
		console.log(service.user.username);
		return service.user;
	};
};

})(); //IIFE