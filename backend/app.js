const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//Connecting to mongoDB
const MONGO_URI = "mongodb+srv://root:root@cluster.mongodb.net/travel-buddies?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connection to MongoDB successful"))
    .catch((err) => console.error("Error while connecting to MongoDB:", err));


//setting up Routes
const tripRoutes = require("./routes/trips");
app.use("/api/trips", tripRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
