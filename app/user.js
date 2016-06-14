var mongo = require('mongodb');

var Server = mongo.Server,
	Db	   = mongo.Db,
	BSON   = mongo.BSONPure;
	ObjectID = mongo.ObjectID;

var server = new Server('localhost',27017,{auto_reconnect:true});

db = new Db('userdb',server);

db.open(function(err,db){
	if (!err) {
		console.log('connected to db');
		db.collection('users',{strict:true},function(err,collection){
			if(err){
				db.createCollection('users',function(err,result){
					if(err){
						console.log('error1');
					}
					else {
						console.log('create');
						populateDB();
					}
				});
			}
			else {
				console.log('exist');
			}
		});
	}
});


exports.findbyId = function(req,res) {
	var id = req.params.id;
	console.log(id);
	db.collection('users',function(err,collection){
		collection.findOne({'_id': new ObjectID(id)},function(err,item){
			console.log(err);
			console.log(item);
			res.send(item);
		});
	});
}

exports.findAll = function(req,res){
	db.collection('users',function(err,collection){
		collection.find().toArray(function(err,items){
			res.send(items);
		});
	});
}

exports.addUser = function(req,res) {
	var u = req.body;
	console.log(JSON.stringify(u));
	db.collection('users',function(err,collection){
		collection.insert(u,{safe:true},function(err,result){
			if(err){
				res.send({'error':'Error occured.'})
			}
			else {
				console.log(JSON.stringify(result));
				res.send(result);
			}
		});
	});
}

exports.updateUser = function(req,res) {
	var id = req.params.id;
	var u = req.body;
	console.log(id);
	console.log(JSON.stringify(u));
	db.collection('users',function(err,collection){
		collection.update({'_id': new ObjectID(id)},u,{safe:true},function(err,result){
			if(err){
				res.send({'error':'Error occured.'})
			}
			else {
				console.log(JSON.stringify(result));
				res.send(u);
			}
		});
	});
}

exports.deleteUser = function(req,res){
	var id = req.params.id;
	console.log(id);
	db.collection('users',function(err,collection){
		collection.remove({'_id': new ObjectID(id)},{safe:true},function(err,result){
			if(err){
				res.send({'error':'Error occured.'})
			}
			else {
				console.log(JSON.stringify(result));
				res.send(result);
			}
		});
	});
}

var populateDB = function() {

    var users = [
    {
        name: "Himanshu Sharma",
        dob: "2-9-1994",
        college: "Jiit",
        country: "India",
        description: "----"
    },
    {
        name: "Akash Singh",
        dob: "2-10-1995",
        college: "Ipu",
        country: "India",
        description: "***"
    }];

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {
        	console.log(result);
        });
    });
    return
};