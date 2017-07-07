(function(){

'use strict';

angular.module('chessnut')
.controller('ChessClockController', ChessClockController);

ChessClockController.$inject = ['$interval', '$scope', '$rootScope'];
function ChessClockController($interval, $scope, $rootScope){
	var $ctrl = this;
	var initialTime = 3000;
	var whiteTime = initialTime;
	var blackTime = initialTime;
	$ctrl.formatTime = function(tenths){
		var minutes = String(Math.floor(tenths/600));
		var seconds = String(Math.floor(tenths/10) % 60);
		if (seconds.length === 1) {
			seconds = '0' + seconds;
		}
		var decimal = String(tenths % 10);

		return (minutes === '0') ? (seconds + '.' + decimal) : (minutes + ':' + seconds);
	};

	var initialDisplay = $ctrl.formatTime(initialTime); //deci-seconds 
	$ctrl.whiteTimeDisplay = initialDisplay;
	$ctrl.blackTimeDisplay = initialDisplay;
	$ctrl.movingSide = null;
	$ctrl.movingSideColor = 'white';
	$ctrl.lowerColor = 'white';
	$ctrl.upperColor = 'black';

	$scope.$on('orientation:change_color', function(event, data){
		var temp = $ctrl.upperColor;
		$ctrl.upperColor = $ctrl.lowerColor;
		$ctrl.lowerColor = temp;
	});

	$scope.$on('game:moving_side', function(event, data){
		$ctrl.movingSide = data.color;
		$ctrl.movingSideColor = (data.color === 'w') ? 'white' : 'black';
	})

	$ctrl.chessclock = $interval(function(){
		if ($ctrl.movingSide){
			switch($ctrl.movingSide){
				case 'w':
					whiteTime--;
					$ctrl.whiteTimeDisplay = $ctrl.formatTime(whiteTime);
					break;
				case 'b':
					blackTime--;
					$ctrl.blackTimeDisplay = $ctrl.formatTime(blackTime);
					break;
				default: 
					console.log('this should never happen, bad data?');
			}

			if (whiteTime === 0 || blackTime === 0){
				$ctrl.endClock();
			}
		}
	}, 100);

	$ctrl.endClock = function(){
		$rootScope.$broadcast('chessclock:timeout');
		$interval.cancel($ctrl.chessclock);
	}
};

})();//IIFE