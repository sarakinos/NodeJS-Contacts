var app = angular.module('myApp',[]);

app.controller('HomeController', function($scope, $http) {
  $http.get('/showPeople').success(function(data){
  	$scope.results = data;
  	
  });

  $scope.deletePeople = function(id){
  	$http.post('/deletePeople/'+id).then(function(response){
			window.location.reload();
		});	
  }

});

app.controller('DataController',function($scope,$http){

	$scope.postData = function(){
		var user = $scope.user;
		$http.post('/addPeople',user).then(function(response){
			window.location.reload();
		});		
	}
	
});


