// collection.js - Collection route module
// import modules
const express = require("express");
const CollectionController = require("../controllers/collectionController");

// define constants
const router = express.Router();

// define routes
router.get("/:username", CollectionController.getCollections);
router.post("/:username", CollectionController.createCollection);
router.put("/:collectionID", CollectionController.renameCollection);
router.delete("/:collectionID", CollectionController.deleteCollection);

module.exports = router;
