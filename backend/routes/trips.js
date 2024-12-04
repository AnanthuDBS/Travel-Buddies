// API routes for Creating, Reading/Fetching, Updating/Joining, and Deleting the trips

// Dependencies import
const express = require("express");
const Trip = require("../models/trip"); // Trip model to interact with the trips data in MongoDB
const router = express.Router(); // New Express router for handling diff routes

// Create a new Trip
// POST /api/trips
router.post("/", async (req, res) => {
    try {
        const trip = new Trip(req.body); // Create a new trip using the data from the req body
        await trip.save(); // Save the newly created trip to the DB
        res.status(201).json(trip); // Success case and response
    } catch (err) {
        res.status(400).json({ error: err.message }); // In case of invalid data
    }
});

// Fetch all created trips
// GET /api/trips
router.get("/", async (req, res) => {
    try {
        const trips = await Trip.find(); // Retrieve all trips from DB
        res.status(200).json(trips); // Respond with the list of trips
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a trip by ID
// DELETE /api/trips/:id
router.delete("/:id", async (req, res) => {
    try {
        await Trip.findByIdAndDelete(req.params.id); // Delete the trip by ID
        res.status(200).json({ message: "The Trip is deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Export the routes to be used in the main app
module.exports = router;
