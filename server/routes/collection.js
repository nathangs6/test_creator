// collection.js - Collection route module
// import modules
const express = require("express");
const CollectionService = require("../services/collectionService.js");

// define constants
const router = express.Router();


// define routes
router.get("/:username", async (req, res) => {
    try {
        const username = req.params.username;
        await CollectionService.getCollections(username);
    } catch(err) {
        console.log(err);
    };
});

router.post("/new/:username", async (req, res) => {
    // Creates a new collection
    console.log("Attempting to create a new collection for user " + req.params.username);
    try {
        const username = req.params.username;
        const collectionName = req.body.newCollectionName;

        await CollectionService.createCollection(username, collectionName);
    } catch (err) {
        console.log(err);
    };
});

router.put("/rename/:collectionID", async (req, res) => {
    try {
        const collectionID = req.params.collectionID;
        const newCollectionName = req.body.newCollectionName;

        await CollectionModel.renameCollection(collectionID, newCollectionName);
    } catch (err) {
        console.log(err);
    };
});

router.delete("/delete/:collectionID", async (req, res) => {
    try {
        const collectionID = req.params.collectionID;
        CollectionService.deleteCollection(collectionID);
    } catch(err) {
        console.log(err);
    };
});

module.exports = router;
