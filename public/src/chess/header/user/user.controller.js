(function(){

'use strict';

angular.module('chessnut')
.controller('UserController', UserController);

UserController.$inject = ['LoginService', '$state']
function UserController(LoginService, $state){
	var $ctrl = this;
	$ctrl.toggleList = function(){
		var userDropDown = $('#user-dropdown');
		userDropDown.attr('class').includes('open') ? 
			userDropDown.removeClass('open') : 
			userDropDown.addClass('open');
	};

	$ctrl.logOut = function(){
		 LoginService.loggedIn = false;
		 $state.transitionTo('login');
	};

	$ctrl.isLoggedIn = function(){
		return LoginService.loggedIn;
	}
};	

})(); //IIFE