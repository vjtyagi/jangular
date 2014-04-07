angular.module("testApp", ['ngRoute', 'jangular'])
	   .config(function($routeProvider){
	   		$routeProvider.when("/", {
	   			controller : 'SimpleController',
	   			templateUrl : 'src/partials/basic.html'
	   		})
	   })
	   .controller('SimpleController', function($scope){
	   	
	   	$scope.message = 'hello world';

	   	$scope.totalRecords = 70;
		$scope.perPage = 5;
		$scope.paginationOptions = {};
		$scope.perPageOptions = [5, 10, 15];	

		$scope.loadData = function(){};
	   

	   });