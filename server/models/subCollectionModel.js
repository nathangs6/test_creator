const db = require("../db");
const { renameKey } = require("./formatData.js");

class SubCollectionModel {
    async getSubCollections(collectionID) {
        const subCollectionQueryResults = await db.query(
            "SELECT SubCollectionID, Name " + 
            "FROM SubCollection " + 
            "WHERE CollectionID = $1",
            [collectionID]
        );
        const subCollectionsData = subCollectionQueryResults.rows;
        for (var i = 0; i < subCollectionsData.length; i++) {
            renameKey(subCollectionsData[i], "subcollectionid", "id");
        };
        return subCollectionsData;
    };

    async createSubCollection(collectionID, subCollectionName) {
        const subCollectionCreation = await db.query(
            "INSERT INTO SubCollection (Name, CollectionID) " + 
            "VALUES ($1,$2) " +
            "RETURNING *",
            [subCollectionName, collectionID]
        );
        const newSubCollection = subCollectionCreation.rows[0];
        renameKey(newSubCollection, "subcollectionid", "id");
        return newSubCollection;
    };

    async renameSubCollection(subCollectionID, newName) {
        const subCollectionRenamed = await db.query(
            "UPDATE SubCollection " + 
            "SET Name = $1 " + 
            "WHERE SubCollectionID = $2 " +
            "RETURNING *",
            [newName, subCollectionID]
        );
        const renamedSubCollection = subCollectionRenamed.rows[0];
        renameKey(renamedSubCollection, "subcollectionid", "id");
        return renamedSubCollection;
    };

    async deleteSubCollection(subCollectionID) {
        await db.query(
            "DELETE FROM SubCollection " + 
            "WHERE SubCollectionID = $1",
            [subCollectionID]
        )
    };
};

module.exports = new SubCollectionModel();
