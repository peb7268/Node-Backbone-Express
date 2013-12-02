var models = require('../db/models');

exports.build = function(app){
	app.get('/', function(req, res){
		res.render('index', { title: 'Express | Backbone & Mongo' });
	});

	app.get('/products', function(req, res){
		models.Product.find({}, 'name description price category rating reviews')
			.limit(99)
			.exec(function(err, docs){
				res.send({
					count: docs.length,
					products: docs
				});
		});
	});
};