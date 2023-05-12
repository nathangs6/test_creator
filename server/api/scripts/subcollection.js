const db = require("../../db");
const { renameKey } = require("./formatData.js");

async function getCollectionSubCollections(collectionID) {
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

module.exports = { getCollectionSubCollections };
