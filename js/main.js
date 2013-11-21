var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	$routeProvider.when('/', {
	  templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/video/:id', {
      templateUrl: 'views/videoContainer.html',
      controller: 'VideoCtrl'
    }).otherwise({
      redirectTo: '/'
    });
}]);
myApp.controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
	$scope.videoID = '9KMUnqB_NiU';
	$scope.changeView = function() {
		$location.path('/video/' + $scope.videoID);
	}
}]);
myApp.controller('VideoCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
	var videoID = $routeParams.id;
	$scope.videoID = videoID;
}]);
myApp.directive('videoAngular', function () {
	var myPlayer;
	return {
		restrict: 'E',
		templateUrl: 'views/video.html',
		link: function($scope, element) {
			// TODO Need to fix as this causes the stack to exceed its limit
			if(myPlayer) {
				myPlayer.dispose();
			}
			myPlayer = videojs('currentVideo', { "techOrder": ["youtube"], "src": "http://www.youtube.com/watch?v="+$scope.videoID });
		}
	}
});