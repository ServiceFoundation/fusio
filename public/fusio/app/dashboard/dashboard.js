'use strict';

angular.module('fusioApp.dashboard', ['ngRoute', 'chart.js'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'app/dashboard/index.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', ['$scope', '$http', '$uibModal', 'fusio', function($scope, $http, $uibModal, fusio) {

  // set initial date range
  var fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 9);
  var toDate = new Date();

  var query = '?from=' + fromDate.toISOString() + '&to=' + toDate.toISOString();

  $http.get(fusio.baseUrl + 'backend/statistic/incoming_requests' + query)
    .then(function(data) {
      $scope.incomingRequests = data;
    });

  $http.get(fusio.baseUrl + 'backend/statistic/most_used_routes' + query)
    .then(function(data) {
      $scope.mostUsedRoutes = data;
    });

  $http.get(fusio.baseUrl + 'backend/statistic/most_used_apps' + query)
    .then(function(data) {
      $scope.mostUsedApps = data;
    });

  $http.get(fusio.baseUrl + 'backend/dashboard/latest_requests')
    .then(function(data) {
      $scope.latestRequests = data.entry;
    });

  $http.get(fusio.baseUrl + 'backend/dashboard/latest_apps')
    .then(function(data) {
      $scope.latestApps = data.entry;
    });

  $http.get(fusio.baseUrl + 'backend/statistic/errors_per_route' + query)
    .then(function(data) {
      $scope.errorsPerRoute = data;
    });

}]);
