var http = require('http'), url = require("url");
var querystring = require('querystring');

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
    function getCookie(hostname) {
        hostname = hostname || requestURL.hostname;
        return global.cookies[hostname] || "";
    }

    function storeCookie(response, hostname) {
        var cookie = response.headers["set-cookie"];
        if (cookie) {
            global.cookies[hostname] = cookie;
        }
    }

    var accept = req.headers["accept"] || "*/*";
    var options = {
        Host:requestURL.hostname,
        hostname:requestURL.hostname,
        port:port,
        path:path,
        method:'GET',
        Cookie:getCookie(requestURL.hostname),
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
            storeCookie(response, requestURL.hostname);
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

exports.post = function (req, res) {

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

    function getCookie(hostname) {
        return global.cookies[hostname] || "";
    }

    function storeCookie(response, hostname) {
        var cookie = response.headers["set-cookie"];
        if (cookie) {
            global.cookies[hostname] = cookie;
        }
        console.log(cookie, "------------");
    }

    var accept = req.headers["accept"] || "*/*";
    var post_data = JSON.stringify(req.body);
    console.log(post_data);
    var options = {
        Host:requestURL.hostname,
        hostname:requestURL.hostname,
        port:port,
        path:path,
        method:'POST',
        Cookie:getCookie(requestURL.hostname),
        headers:{
            'Accept':accept,
            'User-Agent':'Mozilla/5.0 (compatible; MSIE 6.0; Windows NT5.0)',
            'Accept-Language':'en-us',
            'Accept-Charset':'utf-8;q=0.7,*;q=0.7',
            'Content-Type':"application/json",
            'Content-Length':post_data.length
        }
    };

    var request = http.request(options, function (response) {
        var body = '';
        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            storeCookie(response, requestURL.hostname);
            res.send(body);
        });

        response.on('error', function (e) {
            res.send(e.message, 500);
        });
    });

    request.on('error', function (e) {
        res.send(e.message, 500);
    });

    request.write(post_data);
    request.end();
};