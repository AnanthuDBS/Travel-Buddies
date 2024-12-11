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
// Route to join a trip
router.put("/join/:tripId", async (req, res) => {
    const { tripId } = req.params;
    const { name, age, email, phoneNumber } = req.body;

    // Validate user details
    if (!name || !age || !email || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required to join the trip." });
    }

    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found." });
        }

        // Add user details to participants array
        const participant = { name, age, email, phoneNumber };
        if (trip.participants.length >= trip.participantLimit) {
            return res.status(400).json({ message: "Trip is already full." });
        }

        trip.participants.push(participant);
        await trip.save();

        res.status(200).json({ message: "Successfully joined the trip!" });
    } catch (error) {
        console.error("Error joining trip:", error);
        res.status(500).json({ message: "An error occurred while joining the trip." });
    }
});


// Fetch a specific trip by ID
router.get("/:id", async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.status(200).json(trip);
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
