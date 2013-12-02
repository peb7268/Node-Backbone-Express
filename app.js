//Deps
var express 	= require('express');
var sass 		= require('node-sass');
var routes 		= require('./routes');
var http 		= require('http');
var path 		= require('path');
var mongoose 	= require('mongoose');	//Db Connector Lib

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(sass.middleware({
	src: __dirname + '/public',
	dest: path.join(__dirname, '/public'),
	debug: true
}));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
routes.build(app);

//Wrapper for the mongo connector
function dbConnect(callback){
	var db = mongoose; //shortcut
	db.connect('mongodb://localhost/backbone_mongo');

	db.connection.on('open', function(){
		console.log('Mongoose connected.');
		callback();
	});
}

//Have to start mongo before npm start
//so do: mongod --config db/mongo.conf or npm run mongo
//Also, to seed the db do node db/seed.js
dbConnect(function(){
	http.createServer(app).listen(app.get('port'), function(){
  		console.log('Express server listening on port ' + app.get('port'));
	});
});