const db = require("../../db");

async function getCollectionSubCollections(collectionID) {
    const subCollectionQueryResults = await db.query(
        "SELECT SubCollectionID, Name " + 
        "FROM SubCollection " + 
        "WHERE CollectionID = $1",
        [collectionID]
    );
    subCollectionsData = subCollectionQueryResults.rows;
    return subCollectionsData;
};

module.exports = { getCollectionSubCollections };
