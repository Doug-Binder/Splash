
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongoose = require("mongoose")


var uristring =
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/MyDatabase';;

mongoose.connect(uristring)


var app = express();
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port' + app.get('port'));
})
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
var Twit = require('twit')
var T = new Twit({
	consumer_key:'iJz9VlJ2G3hgKcdffc8HPIf36',
	consumer_secret:'RfQD9hxeXLxfixb6RVqWoBu1IqMZeJppAvwY9BSlq79wuGSlSe',
	access_token:'2831637981-ffWoUTteuWRv4S7Tui7z4qcrLLAKfGdbrrGc692',
	access_token_secret:'el9wOAwI01itqzD0094jw6JByyLz2UZSe7ioTpCDKQotk'
})

var io = require('socket.io').listen(server);
var stream = T.stream('statuses/filter', {follow: "2831637981"});
//io.sockets.on('connection', function(socket){
	stream.on('tweet', function(tweet){
		console.log(tweet);
		//socket.emit('info', {tweet: tweet})
//	})
})

var db = mongoose.connection;
var Article = require('./models/article').Article


db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected.');
});


if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	Article.find(function(err, articles){
  res.render('index', { title: 'Doug Binder', ARTS: articles});
})
});
app.get('/users', user.list);
app.get('/articles', function(req, res){
res.render('layout', { title: 'Hey'})
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
