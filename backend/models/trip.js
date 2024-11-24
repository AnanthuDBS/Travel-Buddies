//import mongoose module to work wiht MongoDB
const mongoose = require("mongoose");

//define the schema for a trip using mongoose's schema class
const tripSchema = new mongoose.Schema({
    destination: {type:String, required:true},
    modeOfTravel: {type:String, require:true},
    timeOfTravel: {type:Date, required:true},
    participantLimit: {type:Number, required:true}
});

//Create a mongoose model for the 'Trip" collection using the tripSchema, this allows us to interact with the trips collection in mongoDB.
module.exports = mongoose.model("Trip", tripSchema)