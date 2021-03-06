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
app.use(express.cookieParser());
app.use(express.cookieSession());
app.use(function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.send(500, { error:err });
    } else {
        next(err);
    }
});

app.get('/', routes.index);
app.get('/proxy/get', proxy.get);
app.post('/proxy/post', proxy.post);
app.get('/config', routes.config);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Welcome to agile-dashboard,the server listening on port ' + app.get('port'));
});
