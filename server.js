var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var http       = require('http').Server(app);
var mongodbUri = require('./config/dbconnect');
var jwt        = require('jsonwebtoken');
var path       = require('path');
var bodyParser = require('body-parser')

var User       = require('./models/userModel');
var userCtrl   = require('./controllers/userController');
var testCtrl   = require('./controllers/testController');

var multer     = require('multer');
var upload     = multer({ dest: 'uploads/' })

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
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));


/*
* Routing
*/

// app.use(function(req,res,next){
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//     jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err,decode){
//       if (err) req.user = undefined;
//       req.user = decode;
//       next();
//     });
//   } else {
//     req.user = undefined;
//     next();
//   }
// })
app.get("/register", function(req,res){
  res.sendFile('register.html', { root: path.join(__dirname, './public') })
})
app.post("/register", function(req,res){
  if (req.body.password == req.body.password_confirmation){
    console.log(req.body.email)
  } else { console.log("nah");}

  })

app.post('/post', upload.single('file'), function(req,res,next){
  console.log(req)
})

app.route('/protected')
   .get(userCtrl.loginRequired,testCtrl.test_func)

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
