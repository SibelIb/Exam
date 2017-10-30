//var http = require('http');
var express = require('express');
//var morgan = require('morgan');
var config = require('./config/config');
//var app = express();
//var bodyParser = require('body-parser');
var logger
/*
var winston = require('winston');

winston.level = 'debug';

//winston.info('Hello world');
//winston.debug('Debugging info');


var tsFormat = () => (new Date()).toLocaleTimeString();

var logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    })
  ]
});
logger.level = 'debug';
logger.info('Hello world');
logger.debug('Debugging info');
*/

var winston = require('winston')
     fs = require('fs');
var env = process.env.NODE_ENV || 'development';
var logDir = 'log';
    var tsFormat = () => (new Date()).toLocaleTimeString();
    // Create the log directory if it does not exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: env === 'development' ? 'verbose' : 'info',
            level: 'verbose'
        }),
        new (require('winston-daily-rotate-file'))({
                name: 'logFile',
                filename: `${logDir}/-results.log`,
                prepend: true,
                level: env === 'development' ? 'verbose' : 'info'
            })
        ]
    });
    log = function(message, level){
        level = level || 'info';
        logger.log(level, message);
    }
    exports.log = log;
    
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// var users = require('./app/controllers/users')(app);

app.get('/', function(request, response) {
    response.send('Hello World!');
});


console.log("Creating HTTP server on port: " + config.port);
require('http').createServer(app).listen(config.port, function () {
    console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});



