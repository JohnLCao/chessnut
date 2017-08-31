(function(){

'use strict';

angular.module('chessnut')
.service('GameService', GameService);

GameService.$inject = ['PromotionService', '$rootScope', 'EngineService', 'UserService'];
function GameService(PromotionService, $rootScope, EngineService, UserService){
	var service = this;
	// var promotion_test_position = '8/3P3P/8/1k6/8/6K1/1p1p4/8 w - - 0 1';
	service.game = new Chess();
	service.promoting = false;
	service.in_history = false;
	service.move_index = -1;
	service.timeOut = false; //only for blitz
	service.game_on = false;
	service.player_side = 'w'; //white by default
	service.engineDifficulty = 0; //noob by default

	service.setLevel = function(level){
		service.engineDifficulty = level;
	}

	service.player_change_side = function(){
		service.player_side = (service.player_side === 'w') ? 'b' : 'w'; 
	}

	service.begin = function(){
		service.game_on = true;
	}

	// do not pick up pieces if the game is over or viewing history
	// only pick up pieces for the side to move
	service.onDragStart = function(source, piece, position, orientation) {
	  if ( !service.game_on ||
	  	   service.in_history ||
	  	   service.timeOut ||
	  	   service.game.game_over() ||
	  	   service.game.turn()!== service.player_side ||
	      (service.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
	      (service.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
	  	if (service.game.game_over()){
	  		service.game_on = false;
	  	}
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
		   	 service.move_index++;
		 } 
		 else {
			 var move = service.game.move(move_cfg);
			 if (move === null) {
			 	return 'snapback';
			 } //illegal move
			 else {
			 	if (move.flags.includes('c') || move.flags.includes('e')) {//capture or enpassant
			 		$rootScope.$broadcast('game:capture', {
			 			captured: move.captured,
			 			color: (move.color === 'w') ? 'b' : 'w'
			 		});
			 	}
			 	service.move_index++;
			 }
		}
	};

	// update the board position after the piece snap 
	// for castling, en passant, pawn promotion
	service.onSnapEnd = function() {
		if (service.promoting) return;
	  	service.board.position(service.game.fen());
	  	$rootScope.$broadcast('game:moving_side', {
	  		color: service.game.turn()
	  	});

	  	if (service.game.game_over()){
	  		service.game_on = false;
	  		$rootScope.$broadcast('game:game_over', {
	  			winner: (service.game.turn()==='w') ? 'black' : 'white' 
	  		});
	  		service.storeGame();
	  	}
	  	else if(service.game.turn()!== service.player_side){
	  		$rootScope.$broadcast('game:engine_move');
	 	}
	};

	$rootScope.$on('game:engine_move', function(event, data){
		setTimeout(function(){
			if (!service.timeOut){ //for the rare occasion that engine timesout in blitz
				EngineService.engineMove(service.game, service.engineDifficulty)
				.then(function(pos){
					service.move_index++;
					service.board.position(pos);
					$rootScope.$broadcast('game:moving_side', {
		  				color: service.game.turn()
		  			});
		  			if(service.game.game_over()){
		  				$rootScope.$broadcast('game:game_over', {
		  					winner: (service.game.turn()==='w') ? 'black' : 'white'
		  				});
					  	service.storeGame();
		  			}
				});
			}
		}, 500); //give time for chessboardjs to process player move changes in GUI
	});

	$rootScope.$on('engine_difficulty:set', function(event, data){
		if (service.player_side === 'b'){
			$rootScope.$broadcast('game:engine_move');
		}
	});

	$rootScope.$on('game:store_game', function(event, data){
		service.storeGame();
	})

	var cfg = {
	  draggable: true,
	  position: 'start',
	  moveSpeed: 300,
	  // position: promotion_test_position,
	  onDragStart: service.onDragStart,
	  onDrop: service.onDrop,
	  onSnapEnd: service.onSnapEnd
	};

	service.makeBoard = function(board_id, custom_fen = null){		
		if (custom_fen){
			service.game = new Chess(custom_fen);
			cfg.position = custom_fen;
		} else {
			service.game = new Chess();
			cfg.position = 'start';
		}
		service.board = ChessBoard(board_id, cfg);
		service.timeOut = false;
		service.move_index = -1;
		service.promoting = false;
		service.in_history = false;
		return service.board;
	}

	service.getGame = function(){
		return service.game;
	};

	service.storeGame = function(){
	  	UserService.storeGame({
			difficulty: service.engineDifficulty,
			pgn: service.game.pgn(),
			result: service.game.in_draw() ? 'draw' : (service.game.turn()===service.player_side ? 'lost' : 'won'),
			date: new Date().toString()
		});
	}

	service.pieceDrop = function(piece, square, turn){
		// service.game.setTurn(turn);
		// to make crazyhouse, neet to patch chess.js. changing turns won't work. 
		service.game.put({type: piece[1], color: piece[0]}, square);
	}

	service.moveNavigate = function(isLeft) {
		if (isLeft){
			if (service.move_index >= 0){
				var move = processMove(isLeft, service.move_index);

				if (move.pos_pre_cap){
					service.board.position(move.pos_pre_cap);
				} else if(move.pos_pre_castle){
					service.board.position(move.pos_pre_castle);
				} else if(move.pos_pre_enpassant){
					service.board.position(move.pos_pre_enpassant);
				} else if(move.pos_pre_promotion){
					service.board.position(move.pos_pre_promotion);
				} else {
					service.board.move(move.move);
				}

				service.move_index--;
				service.in_history = true;
			}
		}
		else {
			if (service.move_index < service.game.history().length-1){
				var move = processMove(isLeft, service.move_index + 1);

				if (move.pos_aft_castle){
					service.board.position(move.pos_aft_castle);
				} else if(move.pos_aft_enpassant){
					service.board.position(move.pos_aft_enpassant);
				} else if(move.pos_aft_promotion){
					service.board.position(move.pos_aft_promotion);
				} else {
					service.board.move(move.move);
				}

				service.move_index++;
				if (service.move_index === service.game.history().length-1){
					service.in_history = false;
				}
			}
		}
	};

	function processMove(isLeft, index){
		var move_data = service.game.history({verbose:true})[index];
		var move = isLeft ? (move_data.to + '-' + move_data.from) : (move_data.from + '-' + move_data.to);
		// console.log(move_data);
		if (move_data.flags==='e'){
			return processEnpassant(isLeft, move_data);
		};

		if (move_data.captured) {
			return processCapture(isLeft, move_data);
		};

		if (move_data.flags==='k' || move_data.flags==='q'){
			return processCastling(isLeft, move_data);
		};

		if(move_data.flags==='np') { //assume not a capture promotion
			return processPromotion(isLeft, move_data);
		};

		return {move: move};
	}

	function processCapture(isLeft, move_data){
		if (isLeft){
			var captured_piece_color = move_data.color === 'w' ? 'b' : 'w';
			var pos = service.board.position();

			pos[move_data.to] = captured_piece_color + move_data.captured.toUpperCase();
			pos[move_data.from] = move_data.color + move_data.piece.toUpperCase(); //handles capture promotions :)
			return {pos_pre_cap: pos};
		}
		else {
			if (move_data.flags==='cp'){
				return processPromotion(false, move_data);
			}
			return {move: move_data.from + '-' + move_data.to};
		}
	}

	function processCastling(isLeft, move_data){
		if (isLeft){
			var pos = service.board.position();
			delete pos[move_data.to];
			pos[move_data.from] = move_data.color+'K';

			if (move_data.flags === 'k'){ // king side castle
				switch(move_data.color){
					case 'w':
						delete pos.f1;
						pos.h1 = 'wR';
						break;
					case 'b':
						delete pos.f8;
						pos.h8 = 'bR';
						break;
					default: 
						console.log('this should never happen');
				}
			} else { //queenside castle
				switch(move_data.color){
					case 'w':
						delete pos.d1;
						pos.a1 = 'wR';
						break;
					case 'b':
						delete pos.d8;
						pos.a8 = 'bR';
						break;
					default: 
						console.log('this should never happen');
				}
			}
			return {pos_pre_castle: pos};
		}
		else {
			var pos = service.board.position();
			delete pos[move_data.from];
			pos[move_data.to] = move_data.color + 'K';

			if (move_data.flags === 'k'){ // king side castle
				switch(move_data.color){
					case 'w':
						delete pos.h1;
						pos.f1 = 'wR';
						break;
					case 'b':
						delete pos.h8;
						pos.f8 = 'bR';
						break;
					default: 
						console.log('this should never happen');
				}
			} else { //queenside castle
				switch(move_data.color){
					case 'w':
						delete pos.a1;
						pos.d1 = 'wR';
						break;
					case 'b':
						delete pos.a8;
						pos.d8 = 'bR';
						break;
					default: 
						console.log('this should never happen');
				}
			}
			return {pos_aft_castle: pos};
		}
	}

	function processEnpassant(isLeft, move_data){
		var captured_piece_color = move_data.color === 'w' ? 'b' : 'w';
		var pos = service.board.position();
		var captured_file = move_data.to[0];
		var captured_rank = captured_piece_color === 'w' ? 4 : 5;

		if (isLeft){
			pos[captured_file + captured_rank] = captured_piece_color + move_data.captured.toUpperCase(); 
			pos[move_data.from] = move_data.color + 'P';
			delete pos[move_data.to];

			return {pos_pre_enpassant: pos};
		}
		else {
			delete pos[move_data.from];
			delete pos[captured_file + captured_rank];
			pos[move_data.to] = move_data.color + 'P';
			return {pos_aft_enpassant: pos};
		}
	}

	function processPromotion(isLeft, move_data){
		if (isLeft){
			var pos = service.board.position();
			delete pos[move_data.to];
			pos[move_data.from] = move_data.color + 'P';
			return {pos_pre_promotion: pos};
		}
		else {
			var pos = service.board.position();
			delete pos[move_data.from];
			pos[move_data.to] = move_data.color + move_data.promotion.toUpperCase();
			return {pos_aft_promotion: pos};
		}
	}
};

})();//IIFE

