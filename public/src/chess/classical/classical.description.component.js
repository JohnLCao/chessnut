(function(){

'use strict';

angular.module('chessnut')
.component('classicalDescription', {
	templateUrl: 'src/chess/classical/templates/classical.description.html',
	controller: 'DescriptionController',
	bindings: {
		arrow: '<'
	}
});

})();//IIFE