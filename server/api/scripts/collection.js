const db = require("../../db");
const { renameKey } = require("./formatData.js");
async function getUserCollections(userID) {
    const collectionQueryResults = await db.query(
        "SELECT Collection.CollectionID, Collection.Name " +
        "FROM Collection " + 
        "INNER JOIN JunctionUserAccountCollection " + 
            "ON Collection.CollectionID = JunctionUserAccountCollection.CollectionID " + 
            "WHERE JunctionUserAccountCollection.UserAccountID = $1", 
        [userID]
    );
    collectionData = collectionQueryResults.rows;
    for (var i = 0; i < collectionData.length; i++) {
        renameKey(collectionData[i], "collectionid", "id");
    };
    return collectionData;
};

async function addCollectionToUser(userID, collectionID) {
    try {
        const collectionAddition = await db.query(
            "INSERT INTO JunctionUserAccountCollection (UserAccountID, CollectionID) " + 
            "VALUES ($1, $2)", 
            [userID, collectionID]
        );
    } catch(err) {
        console.log(err);
    };
};

module.exports = { getUserCollections, addCollectionToUser };
