const UserService = require("../services/userService");
const CollectionService = require("../services/collectionService");

export default class CollectionController() {
    async getCollections(req, res) {
        try {
            const username = req.params.username;
            const userID = await UserService.getUserID(username);
            if (!userID) {
                res.sendStatus(401);
                return null;
            }
            const collectionData = await CollectionService.getCollections(userID);
            res.status(200).json({
                data: {
                    collectionData
                }
            });
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async createCollection(req, res) {
        try {
            const username = req.params.username;
            const collectionName = req.body.newCollectionName;
            const userID = await UserService.getUserID(username);
            if (!userID) {
                res.sendStatus(401);
                return null;
            }
            await CollectionService.createCollection(userID, collectionName);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async renameCollection(req, res) {
        try {
            const collectionID = req.params.collectionID;
            const newCollectionName = req.body.newCollectionName;
            await CollectionModel.renameCollection(collectionID, newCollectionName);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async deleteCollection(req, res) {
        try {
            const collectionID = req.params.collectionID;
            await CollectionService.deleteCollection(collectionID);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };
};
