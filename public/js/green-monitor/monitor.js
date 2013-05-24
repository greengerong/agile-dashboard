app.filter("status", function () {
    return function (status) {
        return status ? "Passed" : "Failed";
    };
})
    .filter("timeParser", function () {
        return function (time) {
            if (time) {
                var minutes = Math.floor(time / ( 60 * 1000));
                var divisor_for_seconds = time % ( 60 * 1000);
                var seconds = Math.floor(divisor_for_seconds / (1000));
                var divisor_for_mseconds = divisor_for_seconds % 1000;
                var mseconds = Math.ceil(divisor_for_mseconds);

                return minutes + "min:" + seconds + "s:" + mseconds + "ms";
            }
            return  0 + "min:" + 0 + "s:" + 0 + "ms";

        };
    })
    .directive('greenMonitor', ["proxy", "$timeout", "timer", function (proxy, $timeout, timer) {
    var directiveDefinitionObject = {
        priority:0,
        templateUrl:'/html/green-monitor/monitor.html',
        replace:true,
        transclude:false,
        restrict:'EA',
        scope:true,
        controller:function ($scope) {

            var config = $scope.dashboardConfig.greenMonitor;

            $scope.getFailedCount = function () {
                if ($scope.vm && $scope.vm.items) {
                    var len = $scope.vm.items.length;
                    for (var item in $scope.vm.items) {
                        if (item.success === true) {
                            len--;
                        }
                    }
                    return len;
                }

                return 0;
            };

            var getStatus = function () {
                angular.forEach($scope.vm.items, function (item) {
                    proxy.get(config.host + "/monitor/" + item.id, function (data) {
                        $timeout(function () {
                            item.result = data;
                        });

                    });
                });
            };

            proxy.get(config.host + "/monitor/config", function (data) {
                $timeout(function () {
                    $scope.vm = data;
                    timer.start(getStatus);
                });
            });


        }
    };
    return directiveDefinitionObject;
}]);