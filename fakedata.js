var express = require('express');
var app = express();
var http = require('http');
var request = require("request");
var mongoose = require("mongoose");



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
inputArticleNames()
});


function inputArticleNames(){
var temp = new Article({
	article_url: "http://www.smashingmagazine.com/2014/09/08/improving-smashing-magazine-performance-case-study/?utm_source=CSS-Weekly&utm_campaign=Issue-128&utm_medium=email",
	favicon_url: "http://www.smashingmagazine.com/wp-content/themes/smashing-magazine/images/favicon.ico",
	title : "Imporving Smashing Magazine Performance: A Case Study",
	web_host: "www.smashingmagaine.com",
	article_topic: "CSS",
})
temp.save(function(err){
db.close()

})


}