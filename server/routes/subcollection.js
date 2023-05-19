// subcollection.js - Subcollection route module
const express = require("express");
const SubCollectionService = require("../services/subCollectionService.js");
const router = express.Router();


// define routes

router.get("/:collectionID", async (req, res) => {
    try {
        const collectionID = req.params.collectionID;
        await SubCollectionService.getSubCollections(collectionID);
    } catch(err) {
        console.log(err);
    };
});

router.post("/new/:collectionID", async (req, res) => {
    // Creates a new subcollection
    console.log("Attempting to create new subcollection for collection " + req.params.collectionID);
    try {
        const collectionID = req.params.collectionID;
        const subCollectionName = req.body.newSubCollectionName;
        await SubCollectionService.createSubCollection(collectionID, subCollectionName);
    } catch (err) {
        console.log(err);
    };
});

router.put("/rename/:subCollectionID", async (req, res) => {
    console.log("Attempting to rename subcollection with ID " + req.params.subCollectionID);
    try {
        const subCollectionID = req.params.subCollectionID;
        const newSubCollectionName = req.body.newSubCollectionName;
        await SubCollectionService.renameSubCollection(subCollectionID, newSubCollectionName);
    } catch (err) {
        console.log(err);
    };
});

router.delete("/delete/:subCollectionID", async (req, res) => {
    try {
        const subCollectionID = req.params.subCollectionID;
        await SubCollectionService.deleteSubCollection(collectionID);
    } catch(err) {
        console.log(err);
    };
});

module.exports = router;
