
var http = require('http'), url = require("url");;
const DEFAULT_TIMEOUT = 1000 * 60;

exports.get = function(req, res){
	
	 console.log(req.headers,"123");
	 var params = url.parse(req.url, true).query;
      
	 var requestURL = url.parse(params.url);
	  if (path == '') {
	    path = '/';
	  }
      
      var path = '';

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

	  var accept = req.headers["accept"] || "*/*";
	  var client = http.createClient(port, requestURL.hostname);
	  var request = client.request("GET", path, {
	    Host : requestURL.hostname,
	    'Accept' : accept,
	    'User-Agent' : 'Mozilla/5.0 (compatible; MSIE 6.0; Windows NT5.0)',
	    'Accept-Language' : 'en-us',
	    'Accept-Charset' : 'utf-8;q=0.7,*;q=0.7'
	  });

	  request.addListener('response', function(response) {
	    var body = '';

	    response.setEncoding("utf8");

	    response.addListener("data", function(chunk) {
	      body += chunk;
	    });

	    response.addListener('end', function() {
	       res.send(body);
	    });
	  });

  	 request.end();
  
};