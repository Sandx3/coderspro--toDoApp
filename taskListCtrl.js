var ngApp = angular.module('todosApp');
ngApp.controller('tasksListCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
	var apiUrl = 'http://localhost:3000/api';

	$scope.tasksList = null;
	getTasks();

	function getTasks(){
		$http({
			method: 'GET',
			url: apiUrl + '/todos',
		}).then(function successCallback(response){
			$scope.tasksList = response.data;
		});
	}

	$scope.showDetails = function(id){
		$rootScope.$broadcast('showDetails', id)
	}

	$scope.$on('taskAdded', function(){
		getTasks();
	})

	$scope.setTaskState =  function(task){
		task.done = !task.done;
		$http({
			method: 'PUT',
			url: apiUrl + '/todos/' + task._id,
			data: {done: task.done}
		}).then(function successCallback(response){
			console.log('task updated');
		});
	}

	$scope.deleteTask = function(id){
		$http({
			method: 'DELETE',
			url: apiUrl + '/todos/' + id
		}).then(function successCallback(response){
			console.log('task DELETED');
			getTasks();
		});
	}

}])