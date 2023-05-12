// collection.js - Collection route module
const express = require("express");
const db = require("../db");
const { getUserID } = require("./scripts/user.js");
const { getUserCollections, addCollectionToUser } = require("./scripts/collection.js");
const { cleanSubCollections } = require("./scripts/dbClean.js");
const { getCollectionSubCollections } = require("./scripts/subcollection.js");
const { getSubCollectionQuestions } = require("./scripts/question.js");
const { renameKey } = require("./scripts/formatData.js");
const router = express.Router();


async function getCollectionData(userID) {
    const collectionData = await getUserCollections(userID);
    for (var i = 0; i < collectionData.length; i++) {
        await addSubCollectionData(collectionData[i]);
        renameKey(collectionData[i], "collectionid", "id");
    };
    return collectionData;
};

async function addSubCollectionData(collection) {
    collectionID = collection.collectionid;
    subCollections = await getCollectionSubCollections(collectionID);
    for (var j = 0; j < subCollections.length; j++) {
        await addQuestionData(subCollections[j]);
        renameKey(subCollections[j], "subcollectionid", "id");
    };
    collection.subCollections = subCollections;
};

async function addQuestionData(subCollection) {
    subCollectionID = subCollection.subcollectionid;
    questions = await getSubCollectionQuestions(subCollectionID);
    for (var k = 0; k < questions.length; k++) {
        renameKey(questions[k], "questionid", "id");
    };
    subCollection.questions = questions;
};

// define routes
router.get("/:username", async (req, res) => {
    userID = await getUserID(req.params.username);
    //const collectionData = await getCollectionData(userID)
    const collectionData = await getUserCollections(userID);
    res.status(200).json({
        status: "success",
        data: {
            collectionData
        }
    });
});

router.post("/new/:username", async (req, res) => {
    // Creates a new collection
    try {
        userID = await getUserID(req.params.username);
        collectionName = req.body.newCollectionName;
        const collectionCreation = await db.query(
            "INSERT INTO Collection (Name) " + 
            "VALUES ($1) " + 
            "RETURNING CollectionID",
            [collectionName]
        );
        collectionID = collectionCreation.rows[0].collectionid;
        await addCollectionToUser(userID, collectionID);
        res.status(200).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    };
});

router.post("/rename/:collectionID", async (req, res) => {
    collectionID = req.params.collectionID;
    newCollectionName = req.body.newCollectionName;
    try {
        const collectionRenameResult = await db.query(
            "UPDATE Collection " + 
            "SET Name = $1 " + 
            "WHERE CollectionID = $2 ", 
            [newCollectionName, collectionID]
        );
        res.status(200).json({
            status: "success",
        });
        return res;
        
    } catch (err) {
        console.log(err);
    };
});

router.post("/delete/:collectionID", async (req, res) => {
    try {
        collectionID = req.params.collectionID;
        await db.query(
            "DELETE FROM Collection " + 
            "WHERE CollectionID = $1",
            [collectionID]
        )
        cleanSubCollections();
        res.status(200).json({
            status: "success",
        });
        
    } catch(err) {
        console.log(err);
    };
});

module.exports = router;
