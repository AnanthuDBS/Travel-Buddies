// Import mongoose to work with MongoDB
const mongoose = require("mongoose");

// Define the schema for a trip using mongoose's schema class
const tripSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    modeOfTravel: { type: String, required: true },
    travelTime: { type: Date, required: true },
    participantLimit: { type: Number, required: true },
    participants: { type: [String], default: [] }, // Adding participants field
});

// Create a mongoose model for the 'Trip' collection using the tripSchema
module.exports = mongoose.model("Trip", tripSchema);
