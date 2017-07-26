(function(){

'use strict';

angular.module('chessnut')
.controller('CrazyhouseController', CrazyhouseController);

CrazyhouseController.$inject = ['GameService', '$document', 'MoveNavigationService', '$scope', '$rootScope']
function CrazyhouseController(GameService, $document, MoveNavigationService, $scope, $rootScope){
	var $ctrl = this;
	$ctrl.name = "crazyhouse";
	$ctrl.drag_piece = null;

	$ctrl.initialize = function(){
		$ctrl.game = GameService.getGame();
		$ctrl.board = GameService.makeBoard($ctrl.name);
		$(document).on('keyup', MoveNavigationService.moveListener);
	};

	$document.ready($ctrl.initialize);

	$ctrl.$onDestroy = function(){
		$(document).off();
	}

	$scope.$on('orientation:change_color', function(event, data){
		$ctrl.board.flip();
	});

	$scope.$on('crazyhouse:reserves:drag_start', function(event, data){
		$ctrl.drag_piece = data.piece;
	})

	$ctrl.onDropReserve = function(e){
		console.log(e.target);
		console.log('droped a', $ctrl.drag_piece, 'on', e.target.getAttribute('data-square'));
		$rootScope.$broadcast('crazyhouse:reserves:drag_stop', {
			piece: $ctrl.drag_piece,
			square: e.target.getAttribute('data-square')
		});
		$ctrl.drag_piece = null;
	};

	$ctrl.onDragOver = function(e){
		e.preventDefault();
	}
};

})(); //IIFE