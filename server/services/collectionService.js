const UserService = require("./userModel.js");
const UserModel = require("../models/userModel.js");
const CollectionModel = require("../models/collectionModel.js");
const QuestionModel = require("../models/questionModel.js");

export default class CollectionService() {
    async getUserCollections(username) {
        userID = await UserService.getUserID(username);
        collections = await CollectionModel.getCollections(userID);
        res.json({ collections });
        res.sendStatus(200);
    };
    
    async createCollection(username, collectionName) {
        const userID = UserService.getUserID(username);
        const newCollection = await CollectionModel.createCollection(userID, collectionName);
        await UserModel.addCollectionToUser(userID, newCollection.id)
        res.sendStatus(200);
    };

    async renameCollection(collectionID, newCollectionName) {
        await CollectionModel.renameCollection(collectionID, newCollectionName);
        res.sendStatus(200);
    };

    async deleteCollection(collectionID) {
        await CollectionModel.deleteCollection(collectionID);
        await QuestionModel.deleteOrphanedQuestions();
        res.sendStatus(200);
    };
};
