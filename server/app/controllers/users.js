'use strict'

var express = require('express'),
var router = express.Router(),
var logger = require('../../config/logger');
module.exports = function (app, config) {
	app.use('/api', router);

	router.route('/users').get(function(req, res, next){
		logger.log('Get all users', 'verbose');

    });
    router.get('/user/:id', function(req, res, next){
        logger.log('Get user'+ req.params.id, 'verbose');
    
        res.status(200).json({id: req.params.id}); 
    });
    router.post('/login', function(req, res, next){
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password;
  
        var obj = {'email' : email, 'password' : password};
        res.status(201).json(obj);
  });
  
};
