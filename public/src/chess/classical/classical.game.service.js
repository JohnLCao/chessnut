(function(){

'use strict';

angular.module('chessnut')
.service('ClassicalGameService', ClassicalGameService);

ClassicalGameService.$inject = ['PromotionService'];
function ClassicalGameService(PromotionService){
	var service = this;
	// var promotion_test_position = '8/3P3P/8/1k6/8/6K1/1p1p4/8 w - - 0 1';
	service.game = new Chess();
	service.promoting = false;

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	service.onDragStart = function(source, piece, position, orientation) {
	  if (service.game.game_over() === true ||
	      (service.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
	      (service.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
	    return false;
	  }
	};

	service.onDrop = function(source, target) {
	  // see if the move is legal
		 var move_cfg = {
		    from: source,
		    to: target,
		    promotion: null
		 };

		 if (service.promoting = PromotionService.isPromotion(move_cfg, service.game)){
		   	 PromotionService.promote(move_cfg, service.game, service.board);
		 } 
		 else {
			 var move = service.game.move(move_cfg);
			 if (move === null) return 'snapback'; //illegal move
		}
	};

	// update the board position after the piece snap 
	// for castling, en passant, pawn promotion
	service.onSnapEnd = function() {
		if (service.promoting) return;
	  service.board.position(service.game.fen());
	};

	var cfg = {
	  draggable: true,
	  position: 'start',
	  // position: promotion_test_position,
	  onDragStart: service.onDragStart,
	  onDrop: service.onDrop,
	  onSnapEnd: service.onSnapEnd
	};

	service.makeBoard = function(board_id, custom_fen = null){		
		if (custom_fen){
			service.game = new Chess(custom_fen);
			cfg.position = custom_fen;
		} 
		service.board = ChessBoard(board_id, cfg);
		return service.board;
	}

	service.getGame = function(){
		return service.game;
	};

};

})()//IIFE

