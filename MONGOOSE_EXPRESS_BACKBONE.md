##The Data Layer
So to hook mongo into the app lets take a look at the first thing we do in the app.js file:
On line 7 we require the **mongoose** module. Then the interesting stuff happens twoards the bottom of the file. To connect to mongo you start of by doing 2 things:

1. You require mongoose
2. You call the connect method of mongoose and pass it a mongo connection string.

> The connection screen is how you connect your app with an instance of mongo.

So below is the connection code. Take a look at it and then we will go over it.

```bash
//The Definition
function dbConnect(callback){
	var db = mongoose; 	//shortcut
	db.connect('mongodb://localhost/backbone_mongo');

	db.connection.on('open', function(){
		console.log('Mongoose connected.');
		callback();
	});
}

//The Implementation
dbConnect(function(){
	http.createServer(app).listen(app.get('port'), function(){
  		console.log('Express server listening on port ' + app.get('port'));
	});
});
```

The *dbConnect* method above is just a wrapper around our mongoose connector method. It just serves to give us a transparent way to get some extra work done while encapsulating the complexity and exposing a little simpler interface.

When called, db.connection returns a quasi-promise. You then listen for the open state using the *.on* method of that promise. Then inside of that you do your deed. We are just using that to create our Express server, pass it the app config and echo our connection debug info.

####Houston we have a connection, now what?
Now that we have a connection, we need to do something with it. This is done by utilizing mongo models. As before, you require the module you need at the top. In this case it's the module that contains the our models.

So at the top of our index route we do this:

```bash
var models = require('../db/models');
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
```

####Schema's: Your db layout.

####Seeding
To actually seed, you need to call the seed file and pass it through the node binary.
node db/seed.js


##Using the mongo console
Now that we have supposedly seeded we probably want to see if our data actually made it into the db. The easiest way to do that is to fire up the mongo shell and make some queries. So to open the shell, at the terminal, just type:

```bash
mongo
```

Now that we have the shell open, you are going to want to select the db.
The following are some useful commands for doing that.

```bash
#See the availible db's
show dbs

#Select a db for use
use db_name

#See all the collections in that db ( After the db is selected )
show collections

#find all items in a collection
db.collection_name.find()

#find how many records are in a collection
db.collection_name.count()

#Select only the first 100
db.collection_name.find().limit(100)
```