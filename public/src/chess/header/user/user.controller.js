(function(){

'use strict';

angular.module('chessnut')
.controller('UserController', UserController);

function UserController(){
	var $ctrl = this;
	$ctrl.toggleList = function(){
		$('#user-list').slideToggle(300);
	};
};	

})(); //IIFE