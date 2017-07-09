(function(){

'use strict';

angular.module('chessnut')
.controller('AboutController', AboutController);

function AboutController(){
	var $ctrl = this;
	$ctrl.toggleList = function(){
		$('#about-list').slideToggle(300);
	};
};	

})(); //IIFE