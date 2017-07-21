(function(){

'use strict';

angular.module('chessnut')
.config(RouteConfig);

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RouteConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('classical', {
			url: '/classical',
			templateUrl: 'src/chess/routes/templates/classical.html'
			})
		.state('chess960', {
			url: '/960', 
			templateUrl: 'src/chess/routes/templates/chess960.html'
			})
		.state('blitz', {
			url: '/blitz',
			templateUrl: 'src/chess/routes/templates/blitz.html'
		})
		.state('crazyhouse', {
			url: '/crazyhouse',
			templateUrl: 'src/chess/routes/templates/crazyhouse.html'
		})
		.state('app-description', {
			url: '/what',
			templateUrl: 'src/chess/routes/templates/what.html'
		})
		.state('john-description', {
			url: '/who',
			templateUrl: 'src/chess/routes/templates/who.html'
		})
		.state('acknowledgements', {
			url: '/thanks',
			templateUrl: 'src/chess/routes/templates/thanks.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'src/chess/routes/templates/login.html'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'src/chess/routes/templates/signup.html'
		})
};

})(); //IIFE