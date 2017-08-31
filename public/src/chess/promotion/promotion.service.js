(function(){

'use strict';

angular.module('chessnut')
.service('PromotionService', PromotionService);

PromotionService.$inject = ['$rootScope', 'GameService']
function PromotionService($rootScope, GameService){
	var promotion = this;
	promotion.promote_to = 'q'; //default queen promotion

	promotion.initSelectable = function(){
		promotion.promotion_dialog = $("#promotion-dialog");
	}

	promotion.isPromotion = function(move_cfg, game){
		var from_rank = move_cfg.from.substring(1,2);
		var to_rank = move_cfg.to.substring(1,2);
		var piece = game.get(move_cfg.from).type;

		if (piece === 'p' &&
		    ((from_rank === '7' && to_rank === '8') || 
		     (from_rank === '2' && to_rank === '1'))
		   ) {
			return true;
		}

		return false;
	};

	promotion.promote = function(move_cfg, game, board){
	 	promotion.move_cfg = move_cfg;
	 	promotion.game = game;
	 	promotion.board = board;

	 	// get piece images
	 	var piece_color = game.turn();
	    $('.promotion-piece-q').attr('src', getImgSrc('q', piece_color));
	    $('.promotion-piece-r').attr('src', getImgSrc('r', piece_color));
	    $('.promotion-piece-n').attr('src', getImgSrc('n', piece_color));
	    $('.promotion-piece-b').attr('src', getImgSrc('b', piece_color));

	    //show the select piece to promote to dialog
	    promotion.promotion_dialog.dialog({
	      modal: true,
	      height: 50,
	      width: 184,
	      resizable: true,
	      draggable: false,
	      close: onDialogClose,
	      closeOnEscape: false,
	      dialogClass: 'noTitleStuff'
	    }).dialog('widget').position({
	      of: $('.board'),
	      my: 'middle middle',
	      at: 'middle middle',
	    }); 
	    //the actual move is made after the piece to promote to
	    //has been selected, in the stop event of the promotion piece selectable
	};

	promotion.onSelectionEnd = function(){
		$( ".ui-selected", this).each(function() {
	      var selectable = $('#promote-to li');
	      var index = selectable.index(this);
	
	      if (index > -1) {
	        var promote_to_html = selectable[index].innerHTML;
	        var span = $('<div>' + promote_to_html + '</div>').find('span');
	        promotion.promote_to = span[0].innerHTML;
	      }
	      
	      promotion.promotion_dialog.dialog('close');
	      $('.ui-selectee').removeClass('ui-selected');
	      promotion.board.position(promotion.game.fen(), false);
	      $rootScope.$broadcast('game:moving_side', {
	      	color: promotion.game.turn()
	      });
	    });
	};

	function onDialogClose(){
		promotion.move_cfg.promotion = promotion.promote_to;
		var move = promotion.game.move(promotion.move_cfg);
		if (move.flags.includes('c') || move.flags.includes('e')){ //a capture
			$rootScope.$broadcast('game:capture', {
	 			captured: move.captured,
	 			color: move.color
	 		});
		}

		if(promotion.game.game_over()){
			$rootScope.$broadcast('game:game_over', {
				winner: (promotion.game.turn()==='w') ? 'black' : 'white'
			})
			GameService.storeGame();
		}
 		$rootScope.$broadcast('game:engine_move');
	};

	function getImgSrc(piece, color) {
	  var piece_theme = "img/chesspieces/wikipedia/{piece}.png";
	  return piece_theme.replace('{piece}', color + piece.toLocaleUpperCase());
	};


};

})()//IIFE