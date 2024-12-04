//API routes for Creating, Reading/Fetching, Updating/Joining and Deleting the trips

//dependencies import
const express = require("express");
const Trip = require("../models/trip"); //Trip model to interact with the trips data in MongoDB
const router = express.Router(); //new Express router for handling diff routes


//for Creating a new Trip
//Post /API/trips
// POST /api/trips
router.post("/", async (req, res) => {
    console.log("POST request received at /api/trips");
    try {
        const trip = new Trip(req.body); // Create a new trip from the request body
        await trip.save(); // Save the new trip to the DB
        res.status(201).json(trip); // Respond with the saved trip
    } catch (err) {
        console.error("Error during POST request:", err); // Log the error if any
        res.status(400).json({ error: err.message }); // Return error response
    }
});



//To Fetch all created trips
//GET /API/trips - POST changes to GET and no need of body
router.get("/", async (req, res) => {
    try {
        const trips = await Trip.find(); //retrieve all trips from DB
        res.status(200).json(trips); //to respond with the loist of trips that are already created
    }   catch (err) {
        res.status(500).json({error: err.message });
    }
});

// Delete a trip 
//DELETE /API/trips/:id
router.delete("/:id", async (req, res) => {
    try {
        await Trip.findByIdAndDelete(req.params.id); //search and DEL the corresponding tripById by using 'id' param from the URL
        res.status(200).json({ message: "The Trip is deleted successfully."});
    }   catch (err) {
        res.status(500).json({error: err.message });
    }
});

//Export the routes to be used in the main app
module.exports = router;