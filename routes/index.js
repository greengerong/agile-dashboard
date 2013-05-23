
var fs = require("fs");

exports.index = function(req, res){
	
   res.render('index', { title: 'Project Dashboard',version:"1.0"});
};


exports.config = function(req, res){
	fs.readFile("./config/client-config.json",function(err,text){
       res.send("window.dashboardConfig = " + text +";");
   });
};
