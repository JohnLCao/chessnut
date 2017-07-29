(function(){

'use strict';

angular.module('chessnut')
.service('UserService', UserService);

UserService.$inject = ['$cookies', '$http', 'ProductionBaseUrl', 'DevBaseUrl'];
function UserService($cookies, $http, ProductionBaseUrl, DevBaseUrl){
	var service = this;
	var dummy_user_id = 0; //current logged in user set on the server side
	service.user = {};
	service.getUser = function(){
		return $http({
			method: 'GET',
			url: ProductionBaseUrl + '/users/' + dummy_user_id
		})
		.then(function(response){
			console.log(response);
			service.user = response.data;
		})
		.catch(function(error){
			console.log(error);
		})
	};
};

})(); //IIFE