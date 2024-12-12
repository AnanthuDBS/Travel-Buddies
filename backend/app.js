// Required dependencies are imported first 
//References: Express. Mongoose, CORS, Node and npmjs documentations
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path"); // Import path module

// Express app instance
const app = express();
const PORT = 5000;

// Enable CORS and middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
if(process.env.NODE_ENV !== "test") { //this is to skip mongoDB connection while in test environment
    const MONGO_URI = "mongodb+srv://root:root@cluster0.6iiyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    mongoose
        .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
        .then(() => console.log("Connection to MongoDB successful"))
        .catch((err) => console.error("Error while connecting to MongoDB:", err));
}
// const uri = "mongodb://localhost:27017/travelBuddies"; // to connect to local MongoDB URI
// mongoose.connect(uri)
// .then(() => console.log("Connected to local MongoDB"))
// .catch((err) => console.error("Error connecting to MongoDB:", err));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "./")));

// Add a root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Import and use trip routes
const tripRoutes = require("./routes/trips");
app.use("/api/trips", tripRoutes);

//only start the server in non-test environments
let server;
if (process.env.NODE_ENV !== "test") { 
    server = app.listen(PORT, () => 
        console.log(`Server is running on http://localhost:${PORT}`)
    );
}

// export the app for testing
module.exports = app;