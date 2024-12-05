// API routes for Creating, Reading, Joining, Updating, and Deleting trips

const express = require("express");
const Trip = require("../models/trip");
const router = express.Router();

// Create a new Trip
router.post("/", async (req, res) => {
    try {
        const trip = new Trip(req.body);
        await trip.save();
        res.status(201).json(trip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Fetch all trips
router.get("/", async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Join a trip
router.put("/join/:id", async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (trip.participants.length < trip.participantLimit) {
            trip.participants.push("new participant"); // Here, you could get the current user info from the request (e.g., req.user.id)
            await trip.save();
            res.status(200).json(trip);
        } else {
            res.status(400).json({ message: "Trip is full." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit a trip
router.put("/:id", async (req, res) => {
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTrip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a trip
router.delete("/:id", async (req, res) => {
    try {
        await Trip.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Trip deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
