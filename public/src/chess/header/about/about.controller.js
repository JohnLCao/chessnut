(function(){

'use strict';

angular.module('chessnut')
.controller('AboutController', AboutController);

function AboutController(){
	var $ctrl = this;
	$ctrl.toggleList = function(){
		var aboutDropMenu = $('#about-dropdown');

		aboutDropMenu.attr('class').includes('open') ? 
			aboutDropMenu.removeClass('open') : 
			aboutDropMenu.addClass('open');
	};

	$ctrl.closeList = function(){
		$('#about-dropdown').removeClass('open');
	}
};	

})(); //IIFE