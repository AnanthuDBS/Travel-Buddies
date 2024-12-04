const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string (update if credentials or URI change)
const MONGO_URI = "mongodb+srv://root:root@cluster0.6iiyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Trip Schema
const tripSchema = new mongoose.Schema({
  destination: String,
  modeOfTravel: String,
  travelTime: Date,
  participantLimit: Number,
  participants: { type: [String], default: [] },
});

const Trip = mongoose.model("Trip", tripSchema);

// Routes
app.get("/api/trips", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).send("Error fetching trips");
  }
});

app.post("/api/trips", async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).send("Trip created successfully");
  } catch (err) {
    res.status(500).send("Error creating trip");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
