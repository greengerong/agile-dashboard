app.directive("sonar", ["proxy", function(proxy){
	return {
		priority: 0,
		templateUrl: '/html/sonar/sonar.html',
		replace: true,
		transclude: false,
		restrict: 'EA',
		scope: true,
		controller: function($scope, $element, $attrs, $transclude){
            var sonarUrl = $scope.dashboardConfig.sonar.url;
            var resourceKey = $scope.dashboardConfig.sonar.resource;
            $scope.metrics = [];

            var parseData = function(data){
                for (var i in data.msr) {
                    $scope.metrics.push({'name':data.msr[i].key, 'percentage': data.msr[i].val+"%"});
                }
                //console.log($scope.metrics);
                $scope.description = data.description;
            };

            proxy.get(sonarUrl + '?resource='+resourceKey +'&metrics=coverage,line_coverage,branch_coverage', function(data){
                //console.log(data);
                parseData(data[0]);
            })
		}
	};
}]);
