var http = require('http'), url = require("url");

global.cookies = global.cookie || {};

exports.get = function (req, res) {

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

    function getCookie() {
        return global.cookies[requestURL.hostname] || "";
    }

    function storeCookie(response) {
        var cookie = response.headers["set-cookie"];
        if (cookie) {
            global.cookies[requestURL.hostname] = cookie;
        }
    }

    var accept = req.headers["accept"] || "*/*";
    var options = {
        Host:requestURL.hostname,
        hostname:requestURL.hostname,
        port:port,
        path:path,
        method:'GET',
        Cookie:getCookie(),
        headers:{
            'Accept':accept,
            'User-Agent':'Mozilla/5.0 (compatible; MSIE 6.0; Windows NT5.0)',
            'Accept-Language':'en-us',
            'Accept-Charset':'utf-8;q=0.7,*;q=0.7'
        }
    };

    var request = http.request(options, function (response) {
        var body = '';
        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            storeCookie(response);
            res.send(body);
        });

        response.on('error', function (e) {
            res.send(e.message, 500);
        });
    });

    request.on('error', function (e) {
        res.send(e.message, 500);
    });
    request.end();
};