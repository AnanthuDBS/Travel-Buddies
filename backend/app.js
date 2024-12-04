// Required dependencies
const express = require("express"); // Framework for server and API routing
const mongoose = require("mongoose"); // MongoDB library
const cors = require("cors"); // Middleware to handle requests from different domains
const bodyParser = require("body-parser"); // Middleware to parse JSON requests

// Initialize the Express app
const app = express();
const PORT = 5000; // The server will run on this port

// Middleware to enable CORS and parse JSON data in requests
// CORS Configuration to allow requests from localhost:3000
const corsOptions = {
    origin: 'http://localhost:5000', // to match my frontend's URL
    methods: ['GET', 'POST'],
};

app.use(cors(corsOptions)); // customized CORS settings

app.use(bodyParser.json());
app.use(express.json()); // To handle JSON data in HTTP requests

//middleware to log incoming reqs
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware to manually handle CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Change "*" to your frontend URL if you want to restrict it
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// MongoDB connection string (update if credentials or URI change)
const MONGO_URI = "mongodb+srv://root:root@cluster0.6iiyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB using Mongoose
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connection to MongoDB successful"))
    .catch((err) => console.error("Error while connecting to MongoDB:", err));

// Import and use routes
const tripRoutes = require("./routes/trips"); // Import the trips routes
app.use("/api/trips", tripRoutes); // Use the trips routes for `/api/trips` endpoints

app.get("/", (req, res) => {
    res.send("Server is up and running");
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
