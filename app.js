var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;

var app = express();

app.use(bodyParser());
app.use(express.static(__dirname+'/public'));

var dbUrl='mongodb://127.0.0.1:27017/contacts';


app.post('/deletePeople/:id',function(req,res){	
    	var findKey = {_id:req.params['id']};        
        var removePeople = function(db, callback) {
	   		db.collection('people').deleteOne(
		      	{ "_id": ObjectId(findKey._id) },
		      	function(err, results) {
		         console.log(findKey._id);
		         callback();
		      	}
	   		);
		};
		MongoClient.connect(dbUrl, function(err, db) {
	  	assert.equal(null, err);
	  	removePeople(db, function() {
	      db.close();
	      res.redirect('/');
	  });
});
});

app.get('/showPeople',function(req,res){
	MongoClient.connect(dbUrl, function (err, db) {
		 if (err) {
        console.log(err);
    	} 
    	else {
		        db.collection('people').find().toArray(function(e, d) {
		            res.send(d)
		            db.close();
		        });
    		}
	});
});

app.post('/addPeople',function(req,res){
		var name = req.body.name;
		var surname = req.body.surname;
		var phone = req.body.phone;

		var user = {
			'name' : name,
			'surname' : surname,
			'phone' : phone
		}
		console.log(user);
		MongoClient.connect(dbUrl, function (err, db) {
			if (err) throw err;
			console.log('Successfully connected');
			var collection = db.collection('people');
			collection.insert(user, function (err, docs) {
			console.log('Inserted', docs[0]);
			console.log('ID:', user._id);
			db.close();
		});
	});	
	res.redirect('/');	
});
app.listen(3000);