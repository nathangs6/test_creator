require("dotenv").config(); // use environment variables
const express = require("express") // import the express app
const jwt = require("jsonwebtoken");

// import middlewear
const cors = require("cors");
const bodyParser = require("body-parser");
const { logger } = require("./middleware/logEvents");

// import route modules
const userRoutes = require("./routes/api/user");
const presetRoutes = require("./routes/api/preset");
const collectionRoutes = require("./routes/api/collection");
const subCollectionRoutes = require("./routes/api/subcollection");
const questionRoutes = require("./routes/api/question");
//const generateRoutes = require("./routes/api/generate");

const app = express(); // create instance of express and store it in app


// Middlewear
app.use(logger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/preset", presetRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/subcollection", subCollectionRoutes);
app.use("/api/question", questionRoutes);
//app.use("/api/generate", generateRoutes);

// tell express app to listen on a specific port
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});
