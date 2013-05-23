app.filter("status", function () {
        return function (status) {
            return status ? "Passed" : "Failed";
        };
    })
	.filter("timeParser",function () {
	        return function (time) {
	            var minutes = Math.floor(time / ( 60 * 1000));
	            var divisor_for_seconds = time % ( 60 * 1000);
	            var seconds = Math.floor(divisor_for_seconds / (1000));
	            var divisor_for_mseconds = divisor_for_seconds % 1000;
	            var mseconds = Math.ceil(divisor_for_mseconds);

	            return minutes + "min:" + seconds + "s:" + mseconds + "ms";
	        };
	    })
	.directive('greenMonitor', ["$filter",function($filter) {
	  var directiveDefinitionObject = {
	    priority: 0,
	    templateUrl: '/html/green-monitor/monitor.html',
	    replace: true,
	    transclude: false,
	    restrict: 'A',
	    scope: false,
	    controller: function($scope, $element, $attrs, $transclude) { 
	      $scope.vm = {name :"test 1",version:"1.0", items:[{name : "item1", result:{time:100,success:false}},
	         {name : "item2", result:{time:10023,success:true}}]};
	       console.log("controller",$scope);
	       $scope.getFailedCount = function () {
                if ($scope.vm && $scope.vm.items) {
                    return $filter('filter')($scope.vm.items, {"result.success": false}).length;
                }

                return 0;
            };
	     },
	    link: function (scope, iElement, iAttrs) { 
	      console.log("link",arguments);
	    }
	  };
	  return directiveDefinitionObject;
	}]);