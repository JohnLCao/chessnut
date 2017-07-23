(function(){

'use strict';

angular.module('chessnut')
.service('SigninService', SigninService)
.constant('ProductionBaseUrl', 'https://chessnutio.herokuapp.com')
.constant('DevBaseUrl', 'http://localhost:3000');

SigninService.$inject = ['$state', '$http', 'ProductionBaseUrl', 'DevBaseUrl', '$q']
function SigninService($state, $http, ProductionBaseUrl, DevBaseUrl, $q){
	var service = this;
	service.loggedIn = false;
	service.signupError = null;
	service.loginError = null;

	service.login = function(username, password){
		return $http({
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
			service.loginError = null;
			$state.transitionTo('classical');
		})
		.catch(function(error){
			console.log(error);
			if (error.status === 401){
				service.loginError = 'Invalid username and password combination';
			}
			else{
				service.loginError = 'Sorry, something went wrong. Please retry.'
			}
			$state.transitionTo('login');
			return $q.reject(error);
		});
	};

	service.logout = function(){
		service.loggedIn = false;
		$state.transitionTo('login');
	};

	service.signup = function(user){
		return $http({
			method: 'POST',
			url: (ProductionBaseUrl + '/users.json'),
			data:{
				user: user
			}
		})
		.then(function(response){
			// login right away if sign up success
			service.loggedIn = true;
			service.signupError = null;
			$state.transitionTo('classical');
		})
		.catch(function(error){
			console.log(error);
			if (error.data.username && error.data.username[0].includes('taken')){
				//display some error to user
				service.signupError = 'This username is already taken!';
			}
			else if (error.data.email && error.data.email[0].includes('taken')){
				service.signupError = 'This email is associated with an existing account!';
			}
			else {
				//some other error occured
				service.signupError = 'Sorry, something went wrong. Please retry.'
			}
			$state.transitionTo('signup');
			return $q.reject(error);
		});
	};
};

})();//IIFE