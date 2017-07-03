(function(){

'use strict';

angular.module('chessnut')
.component('classicalBoard', {
	templateUrl: 'src/chess/classical/templates/classical.html',
	controller: 'ClassicalController'
});

})(); //IIFE