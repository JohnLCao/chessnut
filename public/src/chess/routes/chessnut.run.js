(function(){

'use strict';

angular.module('chessnut')
.run(RunFunc);

RunFunc.$inject = ['$rootScope', 'LoginService', '$transitions'];
function RunFunc($rootScope, LoginService, $transitions){
	$transitions.onStart({to: stateMatch}, ensureLogin);

	function ensureLogin(trans){
		if (!LoginService.loggedIn){
			return trans.router.stateService.target('login');
		}
	};

	function stateMatch(state){
		// console.log(state);
		var protected_states = [
		'classical','blitz','chess960','app-description','john-description','acknowledgements'
		];

		return protected_states.includes(state.name);
	};
};

})();//IIFE