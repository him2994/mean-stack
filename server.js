var express = require('express'),
	user 	= require('./app/user');

var app = express();

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.get('/users',user.findAll);
app.get('/users/:id',user.findbyId);
app.post('/users',user.addUser);
app.put('/users/:id',user.updateUser);
app.delete('/users/:id',user.deleteUser);

app.listen(3000);
console.log("listening")