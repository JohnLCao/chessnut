(function() {
	var board;
	var game = new Chess();

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
	  var move = game.move({
	    from: source,
	    to: target,
	    promotion: 'q' // NOTE: always promote to a queen for example simplicity
	  });

	  // illegal move
	 if (move === null) return 'snapback';

	  updateStatus();
	};

	// update the board position after the piece snap 
	// for castling, en passant, pawn promotion
	var onSnapEnd = function() {
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