(function(){

'use strict';

angular.module('chessnut')
.controller('UserController', UserController);

function UserController(){
	var $ctrl = this;
	$ctrl.toggleList = function(){
		var userDropDown = $('#user-dropdown');
		userDropDown.attr('class').includes('open') ? 
			userDropDown.removeClass('open') : 
			userDropDown.addClass('open');
	};
};	

})(); //IIFE