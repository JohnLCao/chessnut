(function(){

'use strict';

angular.module('chessnut')
.controller('UserProfileController', UserProfileController);

UserProfileController.$inject = ['UserService'];
function UserProfileController(UserService){
	var $ctrl = this;
	$ctrl.user = null;

	$ctrl.getUser = function(){
		UserService.getUser().
		then(function(response){
			$ctrl.user = UserService.user;
		});
	}

	$ctrl.$onInit = $ctrl.getUser;
};

})(); //IIFE