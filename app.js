var express = require('express')
    , routes = require('./routes')
    , proxy = require('./routes/proxy')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + "public/images/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.send(500, { error:'Something blew up!' });
    } else {
        next(err);
    }
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/proxy/get', proxy.get);
app.get('/config', routes.config);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
