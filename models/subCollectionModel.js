const db = require("../db");
const { renameKey } = require("./formatData.js");

class SubCollectionModel {
    async getSubCollections(collectionID) {
        const subCollectionQueryResults = await db.query(
            "SELECT * " +
            "FROM SubCollection " +
            "INNER JOIN JunctionCollectionSubCollection " + 
            "ON SubCollection.SubCollectionID = JunctionCollectionSubCollection.SubCollectionID " + 
            "WHERE JunctionCollectionSubCollection.CollectionID = $1",
            [collectionID]
        );
        const subCollectionsData = subCollectionQueryResults.rows;
        for (var i = 0; i < subCollectionsData.length; i++) {
            renameKey(subCollectionsData[i], "subcollectionid", "id");
        };
        return subCollectionsData;
    };

    async createSubCollection(subCollectionName) {
        const subCollectionCreation = await db.query(
            "INSERT INTO SubCollection (Name) " + 
            "VALUES ($1) " +
            "RETURNING *",
            [subCollectionName]
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

    async cleanSubCollections() {
        try {
            await db.query(
                "DELETE FROM SubCollection " + 
                "WHERE NOT EXISTS (" + 
                "SELECT 1 FROM JunctionCollectionSubCollection " + 
                "WHERE SubCollectionID = SubCollection.SubCollectionID" + 
                ")"
            );
        } catch(err) {
            console.log(err);
        };
    };
};

module.exports = new SubCollectionModel();
