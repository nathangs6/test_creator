// subcollection.js - Subcollection route module
const express = require("express");
const db = require("../db");
const router = express.Router();
const { getCollectionSubCollections } = require("./scripts/subcollection.js");
const { cleanSubCollections } = require("./scripts/dbClean.js");
const { renameKey } = require("./scripts/formatData.js");


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
    console.log("Attempting to create new subcollection for collection " + req.params.collectionID);
    try {
        const collectionID = req.params.collectionID;
        const subCollectionName = req.body.newSubCollectionName;
        const subCollectionCreation = await db.query(
            "INSERT INTO SubCollection (Name, CollectionID) " + 
            "VALUES ($1,$2) " + 
            "RETURNING *",
            [subCollectionName, collectionID]
        );
        const subCollectionData = subCollectionCreation.rows[0];
        renameKey(subCollectionData, "subcollectionid", "id");

        res.status(200).json({
            status: "success",
            data: { subCollectionData }
        });
    } catch (err) {
        console.log(err);
    };
});

router.post("/rename/:subCollectionID", async (req, res) => {
    console.log("Attempting to rename subcollection with ID " + req.params.subCollectionID);
    const subCollectionID = req.params.subCollectionID;
    const newSubCollectionName = req.body.newSubCollectionName;
    try {
        const subCollectionRenameResult = await db.query(
            "UPDATE SubCollection " + 
            "SET Name = $1 " + 
            "WHERE SubCollectionID = $2 " + 
            "RETURNING *", 
            [newSubCollectionName, subCollectionID]
        );
        const subCollectionData = subCollectionRenameResult.rows[0];
        renameKey(subCollectionData, "subcollectionid", "id");
        res.status(200).json({
            status: "success",
            data: { subCollectionData }
        });
        return res;
        
    } catch (err) {
        console.log(err);
    };
});

router.post("/delete/:subCollectionID", async (req, res) => {
    console.log("Attempting to delete subcollection with ID " + req.params.subCollectionID);
    try {
        const subCollectionID = req.params.subCollectionID;
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
