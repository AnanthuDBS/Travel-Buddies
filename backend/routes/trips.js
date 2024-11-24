//API routes for Creating, Reading/Fetching, Updating/Joining and Deleting the trips

const express = require("express");
const Trip = require("../models/trip");
const router = express.Router():


//for Creating a new Trip
router.post("/", async (req, res) => {
    try {
        const trip = new Trip(req.body);
        await trip.save();
        res.status(201).json(trip);
    }   catch (err) {
        res.status(400).json({error: err.message});
    }
})


//To Fetch all created trips
router.get("/", async (req, res) => {
    try {
        const trips = await Trip.find();
    }   catch (err) {
        res.status(500).json({error: err.message });
    }
})

// Delete a trip