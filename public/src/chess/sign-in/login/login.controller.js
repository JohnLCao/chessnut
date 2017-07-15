(function(){

'use strict';

angular.module('chessnut')
.controller('LoginController', LoginController)

LoginController.$inject = ['$state', '$http']
function LoginController($state, $http){
	var $ctrl = this;
	var serverUrl = 'https://chessnutio.herokuapp.com/sessions'
	$ctrl.login = function(){
		$http({
			method: 'POST',
			url: serverUrl,
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