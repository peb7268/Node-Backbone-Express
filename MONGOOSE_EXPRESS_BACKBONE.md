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