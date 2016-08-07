var ngApp = angular.module('todosApp');

ngApp.controller('taskDetails', ['$scope', '$http', function($scope, $http){
	var apiUrl = 'http://localhost:3000/api';


	$scope.$on('showDetails', function(evt, id){
		getTask(id);
	})

	function getTask(id){
		$http({
			method: 'GET',
			url: apiUrl + '/todos/' + id
		}).then(function successCallback(response){
			$scope.task = response.data;
		});
	}
}])