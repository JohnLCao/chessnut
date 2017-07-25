(function(){

'use strict';

angular.module('chessnut')
.controller('CrazyhouseController', CrazyhouseController);

CrazyhouseController.$inject = ['GameService', '$document', 'MoveNavigationService', '$scope', '$rootScope']
function CrazyhouseController(GameService, $document, MoveNavigationService, $scope, $rootScope){
	var $ctrl = this;
	$ctrl.name = "crazyhouse";
	$ctrl.dragging = false;
	$ctrl.drag_piece = null;

	$ctrl.initialize = function(){
		$ctrl.game = GameService.getGame();
		$ctrl.board = GameService.makeBoard($ctrl.name);
		$(document).on('keyup', MoveNavigationService.moveListener);
		$('.square-55d63').on('mouseover', $ctrl.dropHelper);
	};

	$document.ready($ctrl.initialize);

	$ctrl.$onDestroy = function(){
		$(document).off();
	}

	$scope.$on('orientation:change_color', function(event, data){
		$ctrl.board.flip();
	});

	$scope.$on('crazyhouse:reserves:drag_start', function(event, data){
		$ctrl.dragging = true;
		$ctrl.drag_piece = data.piece;
	})

	$ctrl.onDropReserve = function(){
		console.log('droped');
		$rootScope.$broadcast('crazyhouse:reserves:drag_stop');
	};

	$ctrl.dropHelper = function(e){
		if ($ctrl.dragging){
			console.log('a', $ctrl.drag_piece, 'on', e.target.getAttribute('data-square'));
		 	$ctrl.dragging = false;
		 	$ctrl.drag_piece = null;
		}
	};

	$ctrl.onDragOver = function(e){
		e.preventDefault();
	}
};

})(); //IIFE