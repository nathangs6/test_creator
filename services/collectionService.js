const UserModel = require("../models/userModel.js");
const CollectionModel = require("../models/collectionModel.js");
const SubCollectionModel = require("../models/subCollectionModel.js");
const QuestionModel = require("../models/questionModel.js");

class CollectionService {
    async getCollections(userID) {
        const collections = await CollectionModel.getCollections(userID);
        return collections
    };
    
    async createCollection(userID, collectionName) {
        const newCollection = await CollectionModel.createCollection(userID, collectionName);
        await UserModel.addCollectionToUser(userID, newCollection.id);
        return newCollection;
    };

    async renameCollection(collectionID, newCollectionName) {
        return await CollectionModel.renameCollection(collectionID, newCollectionName);
    };

    async deleteCollection(collectionID) {
        await CollectionModel.deleteCollection(collectionID);
        await SubCollectionModel.cleanSubCollections();
        await QuestionModel.cleanQuestions();
    };

    async cleanCollections() {
        await CollectionModel.cleanCollections();
    };
};

module.exports = new CollectionService();
