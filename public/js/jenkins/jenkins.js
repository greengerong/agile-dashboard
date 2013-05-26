app.directive("jenkins", ["proxy", "timer", "$timeout", function (proxy, timer, $timeout) {
    return {
        priority: 0,
        templateUrl: '/html/jenkins/jenkins.html',
        replace: true,
        transclude: false,
        restrict: 'EA',
        scope: true,
        controller: function ($scope) {
            var jenkinsUrl = $scope.dashboardConfig.jenkins.url;
            var jenkinsJobs = $scope.dashboardConfig.jenkins.jobs;

            $scope.jobsData = {};

            if(jenkinsJobs == null)
                return;
            var countOfJobs = jenkinsJobs.length;
            if(countOfJobs == undefined || countOfJobs == 0){
                return;
            }
            var projectsByRow = Math.ceil(Math.sqrt(countOfJobs));
            var rows = Math.ceil(countOfJobs / projectsByRow);

            $scope.newCss = {
                width: (99 / projectsByRow) + '%',
                height: 97 / rows + '%',
                margin: (1 / (rows * 2)) + '% ' + (1 / (projectsByRow * 2)) + '%'
            };

            var handleJob = function (jobData) {
                var jobName = jobData.fullDisplayName.substring(0, jobData.fullDisplayName.indexOf('#')).trim();
                $scope.jobsData[jobName] = jobData;
            };

            var getJenkinsJobs = function () {
                for (var jobIndex in jenkinsJobs) {
                    proxy.get(jenkinsUrl + '/jenkins/job/' + jenkinsJobs[jobIndex] + '/lastBuild/api/json?pretty=true', function (jobData) {
                        $timeout(function () {
                            handleJob(jobData);
                        });
                    });
                }
            };
            timer.start(getJenkinsJobs);
        }
    };
}]);
