/**
 * Created by john on 2016/8/31.
 */
(function (angular) {
	'use strict';
	//模块
	var module = angular.module('movieCat.top250', ['ngRoute']);

	//配置模块的路由
	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/top250/:page', {
			templateUrl: 'top250/view.html',
			controller: 'Top250Controller'
		});
	}]);

	//控制器
	module.controller('Top250Controller',
		['$scope', 'httpService', '$routeParams', '$route',
			function ($scope, httpService, $routeParams, $route) {
				var count = 5;
				$scope.isLoading = true;
				$scope.subjects = [];
				$scope.total = '';
				$scope.pagecount = '';
				$scope.currentPage = 1;
				var page = parseInt($routeParams.page);
				$scope.currentPage = page;
				var start = (page - 1) * count;
				httpService.jsonp('http://api.douban.com/v2/movie/top250', {
						start: start,
						count: count
					},
					function (data) {
						$scope.subjects = data.subjects;
						$scope.isLoading = false;
						$scope.total = data.total;
						$scope.pagecount = Math.ceil(data.total / count);
						console.log(data);
						$scope.$apply();//引用的第三方库需要对其赋值的进行重新监视.
					}
				);
				$scope.go = function (page) {
					//传过来是第几页,我就跳转到多少页
					if (page >= 1 || page <= pagecount) {
						$route.updateParams({page: page});
					}
				}
			}]);


})(angular);
