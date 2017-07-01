var promotion_dialog = $("#promotion-dialog");
var promote_to = 'q';

var promo_game, promo_move_cfg, promo_board; //this is what giving up looks like

$("#promote-to").selectable({
  stop: function() {
    $( ".ui-selected", this ).each(function() {
      var selectable = $('#promote-to li');
      var index = selectable.index(this);
      if (index > -1) {
        var promote_to_html = selectable[index].innerHTML;
        var span = $('<div>' + promote_to_html + '</div>').find('span');
        promote_to = span[0].innerHTML;
      }
      promotion_dialog.dialog('close');
      $('.ui-selectee').removeClass('ui-selected');
      promo_board.position(promo_game.fen(), false);
    });
  }
});


// promotion logic utility functions
function isPromotion(move_cfg, game){
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

function promote(move_cfg, game, board){
	//clean this shit up john >:(
 	promo_move_cfg = move_cfg;
 	promo_game = game;
 	promo_board = board;

 	// get piece images
 	var piece_color = game.turn();
    $('.promotion-piece-q').attr('src', getImgSrc('q', piece_color));
    $('.promotion-piece-r').attr('src', getImgSrc('r', piece_color));
    $('.promotion-piece-n').attr('src', getImgSrc('n', piece_color));
    $('.promotion-piece-b').attr('src', getImgSrc('b', piece_color));

    //show the select piece to promote to dialog
    promotion_dialog.dialog({
      modal: true,
      height: 50,
      width: 184,
      resizable: true,
      draggable: false,
      close: onDialogClose,
      closeOnEscape: false,
      dialogClass: 'noTitleStuff'
    }).dialog('widget').position({
      of: $('#board'),
      my: 'middle middle',
      at: 'middle middle',
    }); 
    //the actual move is made after the piece to promote to
    //has been selected, in the stop event of the promotion piece selectable
};

var onDialogClose = function(){
	promo_move_cfg.promotion = promote_to;
	promo_game.move(promo_move_cfg);
};

function getImgSrc(piece, color) {
  var piece_theme = "img/chesspieces/wikipedia/{piece}.png";
  return piece_theme.replace('{piece}', color + piece.toLocaleUpperCase());
};
