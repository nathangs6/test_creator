const db = require("../db");
const { renameKey } = require("./formatData.js");

export default class SubCollectionModel() {
    async getSubCollections(collectionID) {
        const subCollectionQueryResults = await db.query(
            "SELECT SubCollectionID, Name " + 
            "FROM SubCollection " + 
            "WHERE CollectionID = $1",
            [collectionID]
        );
        subCollectionsData = subCollectionQueryResults.rows;
        for (var i = 0; i < subCollectionsData.length; i++) {
            renameKey(subCollectionsData[i], "subcollectionid", "id");
        };
        return subCollectionsData;
    };

    async createSubCollection(collectionID, subCollectionName) {
        await db.query(
            "INSERT INTO SubCollection (Name, CollectionID) " + 
            "VALUES ($1,$2) " + 
            [subCollectionName, collectionID]
        );
    };

    async renameSubCollection(subCollectionID, newName) {
        await db.query(
            "UPDATE SubCollection " + 
            "SET Name = $1 " + 
            "WHERE SubCollectionID = $2 " + 
            [newSubCollectionName, subCollectionID]
        );
    };

    async deleteSubCollection(subCollectionID) {
        await db.query(
            "DELETE FROM SubCollection " + 
            "WHERE SubCollectionID = $1",
            [subCollectionID]
        )
    };
};
