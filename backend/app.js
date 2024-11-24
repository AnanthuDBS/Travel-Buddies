const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//Connecting to mongoDB
const MONGO_URI = "mongodb+srv://<username>:<password>@cluster.mongodb.net/travel-buddies?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connection to MongoDB successful"))
    .catch((err) => console.error("Error while connecting to MongoDB:", err));


//setting up Routes
