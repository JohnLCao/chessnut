(function(){

'use strict';

angular.module('chessnut')
.controller('ReservesController', ReservesController);

ReservesController.$inject = ['$scope', '$rootScope'];
function ReservesController($scope, $rootScope){
	var $ctrl = this;
	$ctrl.piece_theme = "img/chesspieces/wikipedia/";
	$ctrl.captured_pieces = [];
	$ctrl.piece_multiplicity = {};

	$scope.$on('game:capture', function(event, data){
		var piece = data.color + data.captured.toUpperCase();
		if ($ctrl.captured_pieces.includes(piece)){
			$ctrl.piece_multiplicity[piece]++;
		}
		else{
			$ctrl.captured_pieces.push(piece);
			$ctrl.piece_multiplicity[piece] = 1; 
		}
 		$scope.$apply();
	});

	$ctrl.dragStart = function(event){
		var piece = event.srcElement.getAttribute('piece');
		$rootScope.$broadcast('crazyhouse:reserves:drag_start', {piece: piece});
	}
};

})(); //IIFE