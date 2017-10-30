// BASE SETUP

// =============================================================================

// Call the needed packages 

var express = require('express');
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var path =require('path');
var app = express()


// Configure body parser

app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
    }));



// DATABASE SETUP

// =============================================================================

//Connect to MongoDB using Mongoose

  console.log("Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');
  mongoose.connect('mongodb://127.0.0.1/todo-dev', {useMongoClient: true});
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at 5000');
  });


	mongoose.set('debug', true);
	mongoose.connection.once('open', function callback() {
	  console.log("Mongoose connected to the database");

	});

  
	app.use(function (req, res, next) {
	  console.log('Request from ' + req.connection.remoteAddress, 'info');
	  next();
	});


// The model is here

var MyModel = require('./app/models/exam');



// ROUTES FOR API

// =============================================================================


// Create router

var router = express.Router();


// Routes that end in /exams

// ----------------------------------------------------

	// Create an exam (accessed at POST http://localhost:5000/api/exams)

	router.post('/exams', function (req, res, next) {
		console.log('Create an exam');
		var exam = new MyModel({property1:req.body.property1, property2:req.body.property2}); // create a new instance of MyModel (a new exam object from the data sent in the request using the model MyModel)
		exam.save()                                   // Save the exam 	
		.then(result => {                            // if there is no error send the exam data back with code 201	
			res.status(201).json(result);
		})
		.catch(err=>{                              // execute catch block if an error occurs
		   return next(err);
		});
	  })


		

	// Get all exams (accessed at GET http://localhost:5000/api/exams)

    router.get('/exams', function(req, res, next){
		 console.log('Get all exams');
		  var query = MyModel.find()                // Create a query object using the MyModel model’s find method
		  .exec()	                                 // Execute the query  			
		  .then(result => {	                       // Send back the result 
			   if(result && result.length) {	
			  res.status(200).json(result);	
		  } else {	
			  res.status(404).json({message: "No exams"});	
		  }	
		  })	
		  .catch(err => {	                        // Catch any errors
			return next(err);	
		  });	
	  })
	
	


// REGISTER  ROUTES -------------------------------

app.use('/api', router);



// START THE SERVER

// =============================================================================


// Test server to make sure everything is working (accessed at GET http://localhost:5000)

var port = process.env.port || 5000
require('http').createServer(app).listen(port, function () {
		console.log("HTTP Server listening on port: " + port + ", in " + app.get('env') + " mode");
});

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

  // 404 error handler
  app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  // 500 error handler    
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

console.log("Starting application");




  


