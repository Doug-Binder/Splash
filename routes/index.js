
/*
 * GET home page.
 */
var Article = require('../models/article')
exports.index = function(req, res){
	Article.find(function(err, articles){
  res.render('index', { title: 'Doug Binder', ARTS: articles});
})
};