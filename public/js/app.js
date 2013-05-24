var app = angular.module("dashboardApp", [])
    .factory("underscore", ["$window", function ($window) {
    return $window._;
}]).value("messageBoxTimer", 3 * 1000).
    value("messageBoxColor", {"error":"alert-error", "warring":"", "info":"alert-info", "success":"alert-success"}).
    factory("errorBoxService", ["messageBoxColor", "$timeout", "messageBoxTimer",
    function (messageBoxColor, $timeout, messageBoxTimer) {
        var messageBoxContainer = "messageBoxContainer";
        return {
            show:function (title, type) {
                var $container = $("." + messageBoxContainer);
                if ($container.length < 1) {
                    var $container = $("<div class='" + messageBoxContainer + "'></div>").prependTo(document.body);
                }
                $container.html('<div class="box alert alert-block ' + messageBoxColor[type] + '">' +
                    '<button class="close" type="button">×</button>' +
                    '<h4 class="alert-heading">' + title + '</h4>' +
                    '</div>').find("button").bind("click", function () {
                        $container.remove();
                    });

                $timeout(function () {
                    $container.remove();
                }, messageBoxTimer);
            }
        };
    }]).
    factory("proxy", ["$http", "$window", "errorBoxService", function ($http, $window, errorBoxService) {
    return {
        get:function (url, success, error) {
            $http.get($window.dashboardConfig.proxy + "?url=" + encodeURIComponent(url)).
                success(success).error(function (error) {
                    errorBoxService.show(error, "error");
                });
        }
    };
}]).factory("timer", ["$window", function ($window) {
    return {
        start:function (callback) {
            callback();
            $window.setInterval(callback, $window.dashboardConfig.timer || 1000);
        }
    };
}]);

function dashboardCtr($scope, $window) {
    $scope.dashboardConfig = $window.dashboardConfig;

}
app.controller("dashboardCtr", ["$scope", "$window", dashboardCtr]);
