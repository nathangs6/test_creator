const CollectionService = require("../services/collectionService");
const SubCollectionService = require("../services/subCollectionService");

class SubCollectionController {
    async getSubCollections(req, res) {
        try {
            const collectionID = req.params.collectionID;
            const subCollectionData = await SubCollectionService.getSubCollections(collectionID);
            res.status(200).json({
                data: {
                    subCollectionData
                }
            });
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async createSubCollection(req, res) {
        try {
            const collectionID = req.params.collectionID;
            const subCollectionName = req.body.newSubCollectionName;
            const subCollectionData = await SubCollectionService.createSubCollection(collectionID, subCollectionName);
            res.status(200).json({
                data: {
                    subCollectionData
                }
            });
            
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async renameSubCollection(req, res) {
        try {
            const subCollectionID = req.params.subCollectionID;
            const newSubCollectionName = req.body.newSubCollectionName;
            const subCollectionData = await SubCollectionService.renameSubCollection(subCollectionID, newSubCollectionName);
            res.status(200).json({
                data: {
                    subCollectionData
                }
            });
            
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async deleteSubCollection(req, res) {
        try {
            const subCollectionID = req.params.subCollectionID;
            await SubCollectionService.deleteSubCollection(subCollectionID);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async cleanSubCollections() {
        SubCollectionModel.cleanSubCollections();
    };
};

module.exports = new SubCollectionController();
