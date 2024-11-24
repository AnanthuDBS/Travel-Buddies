//Required dependencies are imported first 

//The 'express' module is to create the server and handle the API routing
const express = require("express");
//'mongoose' -to interact with MongoDB, library
const mongoose = require("mongoose");
//middleware, to handle requests from different domains
const cors = require("cors");

//express app's instance to be created
const app = express();

//enable CORS to allow reqs from different origins(eg; different front-end apps)
app.use(cors()); 

//middleware to handle json data sent in http reqs easily(eg; POST > then i can access it in 'req.body')
app.use(express.json());

//Connecting to mongoDB, here my cluster name is cluster0, and the creds are hardcoded
const MONGO_URI = "mongodb+srv://root:root@cluster.mongodb.net/cluster0?retryWrites=true&w=majority";

//to connect my app to mongoDB using the provided URI
mongoose
    .connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() => console.log("Connection to MongoDB successful")) //success case
    .catch((err) => console.error("Error while connecting to MongoDB:", err)); //failure case


//setting up Routes
const tripRoutes = require("./routes/trips"); //to import the routes from trips.js file inside the routes folder
app.use("/api/trips", tripRoutes); //tells to use tripRoutes for any reqs that start with /api/trips


//setting up the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)); //tells the app to listen on the defined port, here 5000, and logs a message when the server is ON 
