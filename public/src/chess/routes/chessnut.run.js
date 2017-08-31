(function(){

'use strict';

angular.module('chessnut')
.run(RunFunc);

RunFunc.$inject = ['$rootScope', 'SigninService', '$transitions', '$cookies'];
function RunFunc($rootScope, SigninService, $transitions, $cookies){
	$transitions.onStart({to: stateMatch}, ensureLogin);

	function ensureLogin(trans){
		if (!SigninService.loggedIn && !$cookies.get('login_session')){ //If not logged in and no cookie
			return trans.router.stateService.target('login');
		}
		else if (!SigninService.loggedIn && $cookies.get('login_session')){
			SigninService.loggedIn = true;
		}
	};

	function stateMatch(state){
		// console.log(state);
		var protected_states = [
		'classical','blitz','chess960','crazyhouse','app-description','john-description',
		'acknowledgements','user-profile'
		];

		return protected_states.includes(state.name);
	};
};

})();//IIFE