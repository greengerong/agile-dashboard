app.filter("sum", ["underscore", function (underscore) {
    return function (items, property) {
        if (!items) {
            return 0;
        }

        return underscore.reduce(items, function (memo, num) {
            var val = property ? num[property] : num;
            return memo + val;
        }, 0);
    };
}]).directive("jira", ["proxy", "timer", "$timeout", "$http", function (proxy, timer, $timeout, $http) {
    return {
        priority:0,
        templateUrl:'/html/jira/jira.html',
        replace:true,
        transclude:false,
        restrict:'EA',
        scope:true,
        controller:function ($scope) {
            var jiraHost = $scope.dashboardConfig.jira.url;

            var jiraBlocks = $scope.dashboardConfig.jira.blocks;
            var total = 0;

            if (jiraBlocks == null)
                return;
            var countOfBlocks = jiraBlocks.length;
            if (countOfBlocks == undefined || countOfBlocks == 0) {
                return;
            }

            var getBase64AuthInfo = function () {
                var user = $scope.dashboardConfig.jira.user;
                var password = $scope.dashboardConfig.jira.password;

                return jQuery.base64.encode(user+":"+password);
            }

            var fillCounts = function () {
                $scope.rows = [];
                angular.forEach(jiraBlocks, function (block, blockIndex) {
                    var row = []
                    angular.forEach(block.tag, function (tagItem, index) {
                        proxy.get(
                            jiraHost + "/rest/api/latest/search?jql=priority=" + tagItem + "%20AND%20issuetype=" + block.type + "%20AND%20status%20NOT%20IN%20(closed)&fields=''",
                            {Authorization:"Basic " + getBase64AuthInfo()},
                            function (a_index) {
                                return function (data) {
                                    row.push({key:tagItem, value:data.total, order:a_index});
                                };
                            }(index)
                        );
                    });
                    $scope.rows.push({key:block.type, value:row, rowIndex:blockIndex});
                });
            }

            timer.start(fillCounts);
        }
    };
}]);