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
                    var $container = $("<div class='" + messageBoxContainer + "' style='position:fixed;width:100%;'></div>").prependTo(document.body);
                }
                $container.html('<div class="box alert alert-block ' + messageBoxColor[type] + '">' +
                    '<button class="close" type="button">×</button>' +
                    '<h4 class="alert-heading">' + (title ? title : "Unknow exception.") + '</h4>' +
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
    var error = function (error) {
        errorBoxService.show(error, "error");
    };

    var getProxyUrl = function (url, method) {
        method = method || "get";
        return $window.dashboardConfig.proxy + method.toLowerCase() + "?url=" + encodeURIComponent(url);
    }

    return {
        get:function () {
            var url = arguments[0];
            var proxyUrl = getProxyUrl(url);
            if (arguments.length === 2) {
                var success = arguments[1];
                $http.get(proxyUrl).success(success).error(error);
            } else if (arguments.length === 3) {
                var config = arguments[1], success = arguments[2];
                $http.get(proxyUrl, config).success(success).error(error);
            }
        },
        post:function () {
            var url = arguments[0];
            var data = arguments[1];
            var proxyUrl = getProxyUrl(url, "post");
            if (arguments.length === 3) {
                var success = arguments[2];
                $http.post(proxyUrl, data).success(success).error(error);
            } else if (arguments.length === 4) {
                var config = arguments[2], success = arguments[3];
                $http.post(proxyUrl, data, config).success(success).error(error);
            }
        }
    };
}]).factory("timer", ["$window", function ($window) {
    return {
        start:function (callback) {
            callback();
            $window.setInterval(callback, $window.dashboardConfig.timer || 1000);
        }
    };
}]).filter("duration",function () {
        var calculateDuration = function (inuput) {
            var durationSec = parseInt(inuput, 10);
            var minutes = parseInt(durationSec / 60000, 10);
            var secs = parseInt((durationSec % 60000) / 1000, 10);

            return minutes + " mins, " + secs + " secs";
        };
        return calculateDuration;
    }).filter("notEmpty", ['underscore', function (underscore) {
    return function (input) {
        return underscore.filter(input, function (item) {
            return !!item;
        });
    };
}]);

function dashboardCtr($scope, $window) {
    $scope.dashboardConfig = $window.dashboardConfig;

}
app.controller("dashboardCtr", ["$scope", "$window", dashboardCtr]);
