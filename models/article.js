var mongoose = require("mongoose")


var articleSchema = mongoose.Schema({
	name: String,
	favicon_url : String,
	article_url : String,
	title : String,
	web_host: String,
	date_read: Date,
	article_topic: String,
	readers: [
		{email: String,
		 date_read: String,
		 rating: Number,
		  }
	]
})

var Article = mongoose.model('Article', articleSchema);

exports.Article = Article