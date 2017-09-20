var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var http     = require('http').Server(app);
var mongodbUri = require('./config/dbconnect');

/*
* Connection to DB
* Setting a 30sec connection timeout as recommended by MLabs
*/
var options = { server: { socketOptions: { keepAlive: 900000, connectTimeoutMS: 90000 } },
                replset: { socketOptions: { keepAlive: 900000, connectTimeoutMS : 90000 } } };


mongoose.connect(mongodbUri);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  console.log("Connected to db");
});

/*
* Accessing Public folder and setting routes
*/
app.use(express.static(__dirname + '/public'));


/*
* Routing
*/



//-- catch all route to initialize client app --
app.get('*', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, './public') })
});

/*
* Starting server on 3000 port
*/
http.listen(8080, function(){
  console.log('listening on :8080');
});
