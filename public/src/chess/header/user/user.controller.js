(function(){

'use strict';

angular.module('chessnut')
.controller('UserController', UserController);

UserController.$inject = ['SigninService']
function UserController(SigninService){
	var $ctrl = this;
	$ctrl.toggleList = function(){
		var userDropDown = $('#user-dropdown');
		userDropDown.attr('class').includes('open') ? 
			userDropDown.removeClass('open') : 
			userDropDown.addClass('open');
	};

	$ctrl.logOut = function(){
		 SigninService.logout();
	};

	$ctrl.isLoggedIn = function(){
		return SigninService.loggedIn;
	}
};	

})(); //IIFE