// Required dependencies are imported first 
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
const MONGO_URI = "mongodb+srv://root:root@cluster0.6iiyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(MONGO_URI) 
    .then(() => console.log("Connection to MongoDB successful"))
    .catch((err) => console.error("Error while connecting to MongoDB:", err));

app.use(express.static(path.join(__dirname, './')));


// Add a root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Import and use trip routes
const tripRoutes = require("./routes/trips");
app.use("/api/trips", tripRoutes);



// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));