const SubCollectionModel = require("../models/subCollectionModel.js");
const QuestionModel = require("../models/questionModel.js");

export default class SubCollectionService() {
    async getSubCollections(collectionID) {
        const subCollectionsData = await SubCollectionModel.getSubCollections(collectionID);
        return subCollectionsData;
    };

    async createSubCollection(collectionID, subCollectionName) {
        await SubCollectionModel.createSubCollection(collectionID, subCollectionName);
    };

    async renameSubCollection(subCollectionID, newName) {
        await SubCollectionModel.renameSubCollection(subCollectionID, newName);
    };

    async deleteSubCollection(subCollectionID) {
        await SubCollectionModel.deleteSubCollection(subCollectionID);
        await QuestionModel.deleteOrphanedQuestions();
    };
};
