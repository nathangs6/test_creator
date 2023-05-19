const SubCollectionModel = require("../models/subCollectionModel.js");
const QuestionModel = require("../models/questionModel.js");

class SubCollectionService {
    async getSubCollections(collectionID) {
        const subCollectionsData = await SubCollectionModel.getSubCollections(collectionID);
        return subCollectionsData;
    };

    async createSubCollection(collectionID, subCollectionName) {
        const newSubCollection = await SubCollectionModel.createSubCollection(collectionID, subCollectionName);
        return newSubCollection;
    };

    async renameSubCollection(subCollectionID, newName) {
        return await SubCollectionModel.renameSubCollection(subCollectionID, newName);
    };

    async deleteSubCollection(subCollectionID) {
        await SubCollectionModel.deleteSubCollection(subCollectionID);
        await QuestionModel.deleteOrphanedQuestions();
    };
};

module.exports = new SubCollectionService();
