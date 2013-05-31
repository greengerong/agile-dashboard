var http = require('http'), url = require("url");

global.cookies = global.cookie || {};

function Proxy() {
    var getCookie = function (hostname) {
        return global.cookies[hostname] || "";
    }

    var storeCookie = function (response, hostname) {
        var cookie = response.headers["set-cookie"];
        if (cookie) {
            global.cookies[hostname] = cookie;
        }
    }

    var extractedUrlInfo = function (req) {
        var params = url.parse(req.url, true).query;

        var path = '';
        var requestURL = url.parse(params.url);

        if (requestURL.pathname) {
            path += requestURL.pathname;
        }

        if (requestURL.search) {
            path += requestURL.search;
        }

        var port = 80;

        if (requestURL.port) {
            port = requestURL.port;
        }
        return {path:path, requestURL:requestURL, port:port};
    };

    var getRequestOptions = function (req, requestData, met) {
        var method = met || 'GET';

        var urlInfo = extractedUrlInfo(req);

        var hostName = urlInfo.requestURL.hostname;
        var accept = req.headers["accept"] || "*/*";
        var contentType = req.headers["Content-Type"] || "application/json";

        var options = {
            Host:hostName,
            hostname:hostName,
            port:urlInfo.port,
            path:urlInfo.path,
            method:method,
            Cookie:getCookie(hostName),
            headers:{
                'Accept':accept,
                'User-Agent':'Mozilla/5.0 (compatible; MSIE 6.0; Windows NT5.0)',
                'Accept-Language':'en-us',
                'Accept-Charset':'utf-8;q=0.7,*;q=0.7',
                'Content-Type':contentType
            }
        };

        if (requestData) {
            options.headers['Content-Length'] = requestData.length;
        }

        return options;
    };

    this.proxy = function (req, res, method) {
        var requestData;
        if (method.toUpperCase() !== "GET" && req.body) {
            requestData = JSON.stringify(req.body);
        }
        var options = getRequestOptions(req, requestData, method);
        var request = http.request(options, function (response) {
            var body = '';
            response.setEncoding('utf8');

            response.on('data', function (chunk) {
                body += chunk;
            });

            response.on('end', function () {
                storeCookie(response, options.hostName);
                res.send(body);
            });

            response.on('error', function (e) {
                res.send(e.message, 500);
            });
        });

        request.on('error', function (e) {
            res.send(e.message, 500);
        });

        if (requestData) {
            request.write(requestData);
        }
        request.end();
    };
}

exports.get = function (req, res) {
    new Proxy().proxy(req, res, "GET");
};

exports.post = function (req, res) {
    new Proxy().proxy(req, res, "POST");
};