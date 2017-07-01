(function() {
	var board;
	var game = new Chess();
	var promoting = false;

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	var onDragStart = function(source, piece, position, orientation) {
	  if (game.game_over() === true ||
	      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
	      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
	    return false;
	  }
	};

	var onDrop = function(source, target) {
	  // see if the move is legal
		 var move_cfg = {
		    from: source,
		    to: target,
		    promotion: null
		 };

		 if (promoting = isPromotion(move_cfg, game)){
		   promote(move_cfg, game, board);
		 } 
		 else {
			  // illegal move
			 var move = game.move(move_cfg);
			 if (move === null) return 'snapback';

			 updateStatus();
		}
	};

	// update the board position after the piece snap 
	// for castling, en passant, pawn promotion
	var onSnapEnd = function() {
		if (promoting) return;
	  board.position(game.fen());
	};

	var updateStatus = function() {
	  // var status = '';
	  // var moveColor = (game.turn() === 'w') ? 'While' : 'Black';

	  // checkmate?
	  if (game.in_checkmate() === true) {
	    
	  }

	  // draw?
	  else if (game.in_draw() === true) {
	    
	  }

	  // game still on
	  else {

	    // check?
	    if (game.in_check() === true) {

	    }
	  }
	};

	var cfg = {
	  draggable: true,
	  position: 'start',
	  onDragStart: onDragStart,
	  onDrop: onDrop,
	  onSnapEnd: onSnapEnd
	};

	// requires div id = board in html
	board = ChessBoard('board', cfg);

	updateStatus();

})(); //IIFE