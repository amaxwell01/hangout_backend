
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hangout = require('./routes/hangout');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function setHeader(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}

app.get('/', routes.index);
//app.get('/users', user.list);
app.all('/broadcasts/:ho_id/:fb_id/:ho_url/:jv_id', setHeader, hangout.saveIds);

//jobseeker needs it to query to get the fbId
app.all('/broadcasts/:ho_id', setHeader, hangout.getfbIds);

//jobseeker needs it to get the hangout url
app.all('/hangoutURL/:jv_id', setHeader, hangout.getHangoutUrl);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
