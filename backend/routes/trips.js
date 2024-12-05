// API routes for Creating, Reading/Fetching, Updating/Joining, and Deleting the trips

// Dependencies import
const express = require("express");
const Trip = require("../models/trip"); // Trip model to interact with the trips data in MongoDB
const router = express.Router(); // New Express router for handling diff routes

// Create a new Trip
// POST /api/trips
router.post("/", async (req, res) => {
    try {
        const trip = new Trip({
            ...req.body,
            participants: [], // Ensure participants array is empty initially
        });
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

// Fetch a single trip by ID
// GET /api/trips/:id
router.get("/:id", async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id); // Find the trip by ID
        res.status(200).json(trip); // Return the trip data
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Join a trip by adding a participant
// PATCH /api/trips/join/:id
router.patch("/join/:id", async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id); // Find the trip by ID

        if (trip.participants.length < trip.participantLimit) {
            // Add a participant (assuming a hardcoded participant ID, you can replace it with actual logic)
            trip.participants.push("currentUser"); // Replace with actual user ID or name
            await trip.save();
            res.status(200).json(trip);
        } else {
            res.status(400).json({ error: "Participant limit reached" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a trip by ID
// PUT /api/trips/:id
router.put("/:id", async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        // Only allow the creator to update the trip
        if (trip.creator !== "currentUser") { // Replace with actual creator verification
            return res.status(403).json({ error: "You are not authorized to edit this trip." });
        }

        // Update the trip's details
        trip.destination = req.body.destination;
        trip.modeOfTravel = req.body.modeOfTravel;
        trip.travelTime = req.body.travelTime;
        trip.participantLimit = req.body.participantLimit;

        await trip.save();
        res.status(200).json(trip); // Return the updated trip
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a trip by ID (only allow creator to delete)
// DELETE /api/trips/:id
router.delete("/:id", async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        // Check if the current user is the creator
        if (trip.creator === "currentUser") { // Replace with logic to check if the current user is the creator
            await Trip.findByIdAndDelete(req.params.id); // Delete the trip by ID
            res.status(200).json({ message: "The Trip is deleted successfully." });
        } else {
            res.status(403).json({ error: "You are not authorized to delete this trip." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Export the routes to be used in the main app
module.exports = router;
