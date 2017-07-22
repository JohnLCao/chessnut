(function(){

'use strict';

angular.module('chessnut')
.controller('UserProfileController', UserProfileController);

UserProfileController.$inject = ['UserService'];
function UserProfileController(UserService){
	var $ctrl = this;
	$ctrl.user = null;

	$ctrl.getUser = function(){
		$ctrl.user = UserService.getUser();
	}

	$ctrl.$onInit = $ctrl.getUser;
};

})(); //IIFE