(function(){

'use strict';

angular.module('chessnut')
.run(RunFunc);

RunFunc.$inject = ['$rootScope', 'LoginService', '$transitions'];
function RunFunc($rootScope, LoginService, $transitions){
	$transitions.onStart({to: stateMatch}, ensureLogin);

	function ensureLogin(trans){
		console.log('ensureLogin was ran');
		if (!LoginService.loggedIn){
			console.log('detected that user has not logged in');
			return trans.router.stateService.target('login');
		}
	};

	function stateMatch(state){
		console.log(state);
		var protected_states = [
		'classical','blitz','chess960','app-description','john-description','acknowledgements'
		];

		return protected_states.includes(state.name);
	};
};

})();//IIFE