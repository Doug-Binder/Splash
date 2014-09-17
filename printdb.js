var express = require('express');
var app = express();
var http = require('http');
var request = require("request");
var mongoose = require("mongoose");
var Article = require("./models/article").Article


var mongooseUrl =
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/MyDatabase';

mongoose.connect(mongooseUrl);

var db = mongoose.connection;
var Article = require('./models/article').Article


db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
	console.log('connected)))');
printArticleNames()
});


function printArticleNames(){
Article.find(function(err, objs){
	if (err) console.log(err)
		for (var key in objs){
			console.log(objs[key])
	}
db.close()
})
}