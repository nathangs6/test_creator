require("dotenv").config(); // use environment variables
const cors = require("cors");
const express = require("express") // import the express app
const db = require("./db"); // import the database files
const bodyParser = require("body-parser");

// import route modules
const userRoutes = require("./api/user");
const presetRoutes = require("./api/preset");
const collectionRoutes = require("./api/collection");
const subCollectionRoutes = require("./api/subcollection");
const questionRoutes = require("./api/question");
const generateRoutes = require("./api/generate");

const app = express(); // create instance of express and store it in app

// Use the express.json() middleware to allow reading req.body
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/preset", presetRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/subcollection", subCollectionRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/generate", generateRoutes);

// tell express app to listen on a specific port
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});
