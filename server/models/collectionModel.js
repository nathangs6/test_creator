const db = require("../db");
const { renameKey } = require("./formatData.js");

class CollectionModel {
    async getCollections(userID) {
        const collectionQueryResults = await db.query(
            "SELECT Collection.CollectionID, Collection.Name " +
            "FROM Collection " + 
            "INNER JOIN JunctionUserAccountCollection " + 
            "ON Collection.CollectionID = JunctionUserAccountCollection.CollectionID " + 
            "WHERE JunctionUserAccountCollection.UserAccountID = $1", 
            [userID]
        );
        const collectionData = collectionQueryResults.rows;
        for (var i = 0; i < collectionData.length; i++) {
            renameKey(collectionData[i], "collectionid", "id");
        };
        return collectionData;
    }

    async createCollection(userID, collectionName) {
        const collectionCreation = await db.query(
            "INSERT INTO Collection (Name) " + 
            "VALUES ($1) " + 
            "RETURNING *",
            [collectionName]
        );
        const newCollection = collectionCreation.rows[0];
        renameKey(newCollection, "collectionid", "id");
        return newCollection;
    };

    async renameCollection(collectionID, newCollectionName) {
        const collectionRenameResult = await db.query(
            "UPDATE Collection " + 
            "SET Name = $1 " + 
            "WHERE CollectionID = $2 " + 
            "RETURNING *", 
            [newCollectionName, collectionID]
        );
        const renamedCollection = collectionRenameResult.rows[0];
        renameKey(renamedCollection, "collectionid", "id");
        return renamedCollection;
    };

    async deleteCollection(collectionID) {
        await db.query(
            "DELETE FROM Collection " + 
            "WHERE CollectionID = $1",
            [collectionID]
        );
    };

    async cleanCollections() {
        try {
            await db.query(
                "DELETE FROM Collection " + 
                "WHERE NOT EXISTS (" + 
                "SELECT 1 FROM JunctionUserAccountCollection " + 
                "WHERE CollectionID = Collection.CollectionID" + 
                ")"
            );
        } catch(err) {
            console.log(err);
        };
    };

    async addSubCollection(collectionID, subCollectionID) {
        try {
            await db.query(
                "INSERT INTO JunctionCollectionSubCollection " + 
                "(CollectionID, SubCollectionID) " + 
                "VALUES ($1, $2)",
                [collectionID, subCollectionID]
            );
        } catch(err) {
            console.log(err);
        };
    };
};

module.exports = new CollectionModel();
