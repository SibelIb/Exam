var mongoose = require('mongoose');

//Create a schema which defines the attributes, their data types, default values, validation, etc.

var Schema = mongoose.Schema;

var myExam  = new Schema({
	property1:{type: String, required: false},
    property2:{type: Number, required: false}
});

// Create a model from the schema which provides the interface to MongoDB, and export the model

module.exports = mongoose.model('MyModel', myExam);