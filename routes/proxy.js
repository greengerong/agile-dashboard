
var $ = require('jquery');

exports.get = function(req, res){
	var url = req.query["url"];
   
   $.get(url,function(data){
   		res.send(data);
     });
  
};