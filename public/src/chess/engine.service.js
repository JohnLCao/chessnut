(function(){

'use strict';

angular.module('chessnut')
.service('EngineService', EngineService);

EngineService.$inject = ['$q'];
function EngineService($q){
	var service = this;
	service.difficultyLevels = [0, 10, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]; //quite arbitrary
	service.engineCaller = Module.cwrap('command', 'string', ['string', 'string']);

	service.engineMove = function(game, difficulty){
		return $q(function(resolve, reject){
			service.engineCaller("setMaxTimeMillsec", service.difficultyLevels[difficulty].toString());
			service.engineCaller("position", game.fen());
			var move = service.engineCaller("go", "");
			var from = move.substring(0, 2);
			var to = move.substring(2, 4);
			var move = game.move({
				from: from, 
				to: to, 
				promotion: 'q' //engine always promotes to queen
			});

			if (move){
				resolve(game.fen());
			}
		});
	};
};

})(); //IIFE