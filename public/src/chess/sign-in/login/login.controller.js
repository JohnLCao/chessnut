(function(){

'use strict';

angular.module('chessnut')
.controller('LoginController', LoginController)

LoginController.$inject = ['$state', '$http']
function LoginController($state, $http){
	var $ctrl = this;

	$ctrl.login = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/sessions',
			data:{
				user:{
					username: $ctrl.username,
					password: $ctrl.password
				}
			} 
		}).then(function(response){
			$state.transitionTo('classical');
		}).catch(function(error){
			console.log(error);
			$state.transitionTo('login');
		});
	};
};

})(); //IIFE