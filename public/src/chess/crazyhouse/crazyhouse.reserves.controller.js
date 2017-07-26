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
		var color = (data.color === 'w') ? 'b' : 'w';
		var piece = color + data.captured.toUpperCase();
		if ($ctrl.captured_pieces.includes(piece)){
			$ctrl.piece_multiplicity[piece]++;
		}
		else{
			$ctrl.captured_pieces.push(piece);
			$ctrl.piece_multiplicity[piece] = 1; 
		}
 		$scope.$apply();
	});

	$scope.$on('crazyhouse:reserves:drag_stop', function(event, data){
		if (data.square){ //successful drop
			var piece = data.piece;
			if($ctrl.piece_multiplicity[piece] > 1){
				$ctrl.piece_multiplicity[piece]--;
			}else{
				var index = $ctrl.captured_pieces.indexOf(piece);
				$ctrl.captured_pieces.splice(index, 1);
			}
			$scope.$apply();
		}
	})

	$ctrl.dragStart = function(event){
		var piece = event.srcElement.getAttribute('piece');
		$rootScope.$broadcast('crazyhouse:reserves:drag_start', {piece: piece});
	}
};

})(); //IIFE