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
            var username = $scope.dashboardConfig.jira.user;
            var password = $scope.dashboardConfig.jira.password;

            if (!jiraBlocks) {
                return;
            }

            var getJiraInfo = function () {
                var fillJiraInfo = function () {
                    $scope.rows = [];
                    angular.forEach(jiraBlocks, function (block, blockIndex) {
                        var getDetails = function () {
                            angular.forEach(block.tag, function (tagItem, index) {
                                proxy.get(
                                    jiraHost + "/rest/api/latest/search?jql=priority=" + tagItem + "%20AND%20issuetype=" + block.type + "%20AND%20status%20NOT%20IN%20(closed)&fields=''",
                                    function (a_index) {
                                        return function (data) {
                                            row.push({key:tagItem, value:data.total, order:a_index});
                                        };
                                    }(index)
                                );
                            });
                        }

                        var row = []
                        getDetails();
                        $scope.rows.push({key:block.type, value:row, rowIndex:blockIndex});
                    });
                }

                timer.start(fillJiraInfo);
            }


            proxy.post(jiraHost + "/rest/auth/latest/session",
                {username:username, password:password},
                function (data) {
                    getJiraInfo();
                });

        }
    };
}]);