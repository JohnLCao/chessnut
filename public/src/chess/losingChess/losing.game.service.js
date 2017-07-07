(function(){

'use strict';

angular.module('chessnut')
.service('LosingChessGameService', LosingChessGameService);

LosingChessGameService.$inject = ['PromotionService'];
function LosingChessGameService(PromotionService){
	var service = this;
};

})(); //IIFE