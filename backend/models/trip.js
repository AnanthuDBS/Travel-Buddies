//import mongoose module to work wiht MongoDB
const mongoose = require("mongoose");

//define the schema for a trip using mongoose's schema class
const tripSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    modeOfTravel: { type: String, required: true },
    travelTime: { type: Date, required: true },
    participantLimit: { type: Number, required: true },
    participants: { type: [String], default: [] } // Array to hold participant names/emails
});


//Create a mongoose model for the 'Trip" collection using the tripSchema, this allows us to interact with the trips collection in mongoDB.
module.exports = mongoose.model("Trip", tripSchema)