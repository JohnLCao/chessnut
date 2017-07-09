(function(){

'use strict';

angular.module('chessnut')
.config(RouteConfig);

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RouteConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/classical');

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
};

})(); //IIFE