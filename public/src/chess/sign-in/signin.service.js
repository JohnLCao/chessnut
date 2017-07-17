(function(){

'use strict';

angular.module('chessnut')
.service('SigninService', SigninService)
.constant('ProductionBaseUrl', 'https://chessnutio.herokuapp.com')
.constant('DevBaseUrl', 'http://localhost:3000');

SigninService.$inject = ['$state', '$http', 'ProductionBaseUrl', 'DevBaseUrl']
function SigninService($state, $http, ProductionBaseUrl, DevBaseUrl){
	var service = this;
	service.loggedIn = false;

	service.login = function(username, password){
		$http({
			method: 'POST',
			url: (ProductionBaseUrl + '/sessions'),
			data:{
				user:{
					username: username,
					password: password
				}
			} 
		})
		.then(function(response){
			service.loggedIn = true;
			$state.transitionTo('classical');
		})
		.catch(function(error){
			console.log(error);
			$state.transitionTo('login');
		});
	};

	service.logout = function(){
		service.loggedIn = false;
		$state.transitionTo('login');
	};

	service.signup = function(user){
		$http({
			method: 'POST',
			url: (productionBaseUrl + '/users'),
			data:{
				user: user
			}
		})
		.then(function(response){
			// login right away if sign up success
			service.loggedIn = true;
			$state.transitionTo('classical');
		})
		.catch(function(error){
			console.log(error);
			$state.transitionTo('signup')
		});
	};
};

})();//IIFE