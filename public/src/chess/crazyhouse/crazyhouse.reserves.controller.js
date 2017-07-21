(function(){

'use strict';

angular.module('chessnut')
.controller('ReservesController', ReservesController);

ReservesController.$inject = ['$scope'];
function ReservesController($scope){
	var $ctrl = this;

	$scope.$on('game:capture', function(event, data){
		console.log('I got a '+data.color+data.captured);
	});
};

})(); //IIFE