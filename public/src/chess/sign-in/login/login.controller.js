(function(){

'use strict';

angular.module('chessnut')
.controller('LoginController', LoginController)

LoginController.$inject = ['$state', '$http', 'LoginService']
function LoginController($state, $http, LoginService){
	var $ctrl = this;
	var ProductionServerUrl = 'https://chessnutio.herokuapp.com/sessions';
	var DevServerUrl = 'http://localhost:3000/sessions';
	$ctrl.login = function(){
		$http({
			method: 'POST',
			url: ProductionServerUrl,
			data:{
				user:{
					username: $ctrl.username,
					password: $ctrl.password
				}
			} 
		}).then(function(response){
			LoginService.loggedIn = true;
			$state.transitionTo('classical');
		}).catch(function(error){
			console.log(error);
			$state.transitionTo('login');
		});
	};
};

})(); //IIFE