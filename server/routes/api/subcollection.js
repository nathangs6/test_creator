// subcollection.js - Subcollection route module
const express = require("express");
const SubCollectionController = require("../../controllers/subCollectionController");
const router = express.Router();


// define routes
router.get("/:collectionID", SubCollectionController.getSubCollections);
router.post("/:collectionID", SubCollectionController.createSubCollection);
router.put("/:subCollectionID", SubCollectionController.renameSubCollection);
router.delete("/:subCollectionID", SubCollectionController.deleteSubCollection);

module.exports = router;
