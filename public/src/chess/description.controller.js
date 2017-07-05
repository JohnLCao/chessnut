(function(){

'use strict';

angular.module('chessnut')
.controller('DescriptionController', DescriptionController);

function DescriptionController(){
	var $ctrl = this;

	$ctrl.$onInit = function(){
		$ctrl.arrow = "up";
		$ctrl.text_hidden = false;
	};

	$ctrl.slide = function(){
		$('.description').slideToggle(300);
		$ctrl.text_hidden = !$ctrl.text_hidden;
		$ctrl.arrow = $ctrl.text_hidden ? "down" : "up";
	}
};

})(); //IIFE