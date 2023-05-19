const UserService = require("./userService.js");
const UserModel = require("../models/userModel.js");
const CollectionModel = require("../models/collectionModel.js");
const QuestionModel = require("../models/questionModel.js");

export default class CollectionService() {
    async getUserCollections(userID) {
        const collections = await CollectionModel.getCollections(userID);
        return collections
    };
    
    async createCollection(userID, collectionName) {
        const newCollection = await CollectionModel.createCollection(userID, collectionName);
        await UserModel.addCollectionToUser(userID, newCollection.id)
    };

    async renameCollection(collectionID, newCollectionName) {
        await CollectionModel.renameCollection(collectionID, newCollectionName);
    };

    async deleteCollection(collectionID) {
        await CollectionModel.deleteCollection(collectionID);
        await QuestionModel.deleteOrphanedQuestions();
    };
};
