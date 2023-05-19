const SubCollectionModel = require("../models/subCollectionModel.js");
const QuestionModel = require("../models/questionModel.js");

export default class SubCollectionService() {
    async getSubCollections(collectionID) {
        const subCollectionsData = await SubCollectionModel.getSubCollections(collectionID);
        res.json({ subCollectionsData });
        res.sendStatus(200);
    };

    async createSubCollection(collectionID, subCollectionName) {
        await SubCollectionModel.createSubCollection(collectionID, subCollectionName);
        res.sendStatus(200);
    };

    async renameSubCollection(subCollectionID, newName) {
        await SubCollectionModel.renameSubCollection(subCollectionID, newName);
        res.sendStatus(200);
    };

    async deleteSubCollection(subCollectionID) {
        await SubCollectionModel.deleteSubCollection(subCollectionID);
        await QuestionModel.deleteOrphanedQuestions();
        res.sendStatus(200);
    };
};
