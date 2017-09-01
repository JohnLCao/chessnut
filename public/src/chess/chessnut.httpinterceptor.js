(function(){

'use strict';

angular.module('chessnut')
.config(HttpInterceptorConfig);

HttpInterceptorConfig.$inject = ['$httpProvider', '$provide'];
function HttpInterceptorConfig($httpProvider, $provide){	
	$provide.factory('PacmanInterceptor', ['$q', '$rootScope', function($q, $rootScope){
		return {
			'response': function(response){
				$('.pacman').hide();
				$rootScope.$broadcast('http:data_retrieved');
				return response;
			}, 

			'responseError': function(error){
				$('.pacman').hide();
				return $q.reject(error);
			}
		}
	}]);

	$httpProvider.interceptors.push('PacmanInterceptor');
	var showPacman = function(data){
		$('.pacman').show();	
		return data;
	};
	$httpProvider.defaults.transformRequest.push(showPacman); //show loading gif for ajax requests
};

})(); //IIFE