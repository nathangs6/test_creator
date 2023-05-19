const SubCollectionService = require("../services/subCollectionService");

export default class SubCollectionController() {
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
            await SubCollectionService.createSubCollection(collectionID, subCollectionName);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async renameSubCollection(req, res) {
        try {
            const subCollectionID = req.params.subCollectionID;
            const newSubCollectionName = req.body.newSubCollectionName;
            await SubCollectionService.renameSubCollection(subCollectionID, newSubCollectionName);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async deleteSubCollection(req, res) {
        try {
            const subCollectionID = req.params.subCollectionID;
            await SubCollectionService.deleteSubCollection(collectionID);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };
};
