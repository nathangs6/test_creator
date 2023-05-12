// subcollection.js - Collection route module
const express = require("express");
const db = require("../db");
const router = express.Router();
const { getCollectionSubCollections } = require("./scripts/subcollection.js");
const { cleanSubCollections } = require("./scripts/dbClean.js");


// define routes

router.get("/:collectionID", async (req, res) => {
try {
    collectionID = req.params.collectionID;
    const subCollectionData = await getCollectionSubCollections(collectionID);
    res.status(200).json({
        status: "success",
        data: {
            subCollectionData
        }
    });
    
} catch(err) {
    console.log(err);
};
});

router.post("/new/:collectionID", async (req, res) => {
    // Creates a new subcollection
    try {
        collectionID = req.params.collectionID;
        subCollectionName = req.body.newSubCollectionName;
        const subCollectionCreation = await db.query(
            "INSERT INTO SubCollection (Name, CollectionID) " + 
            "VALUES ($1,$2) ",
            [subCollectionName, collectionID]
        );
        subCollectionID = subCollectionCreation.SubCollectionID;
        res.status(200).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    };
});

router.post("/rename/:subCollectionID", async (req, res) => {
    subCollectionID = req.params.subCollectionID;
    newSubCollectionName = req.body.newSubCollectionName;
    try {
        const subCollectionRenameResult = await db.query(
            "UPDATE SubCollection " + 
            "SET Name = $1 " + 
            "WHERE SubCollectionID = $2 ", 
            [newSubCollectionName, subCollectionID]
        );
        res.status(200).json({
            status: "success",
        });
        return res;
        
    } catch (err) {
        console.log(err);
    };
});

router.post("/delete/:subCollectionID", async (req, res) => {
    try {
        subCollectionID = req.params.subCollectionID;
        await db.query(
            "DELETE FROM SubCollection " + 
            "WHERE SubCollectionID = $1",
            [subCollectionID]
        )
        await cleanSubCollections();
        res.status(200).json({
            status: "success",
        });
        
    } catch(err) {
        console.log(err);
    };
});

module.exports = router;
