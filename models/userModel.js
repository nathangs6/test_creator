const db = require("../db");
const { renameKey } = require("./formatData.js");

class UserModel {
    async getUser(username) {
            const results = await db.query(
                "SELECT * " + 
                "FROM UserAccount " + 
                "WHERE Username = $1",
                [username]
            );
        if (results.rows.length === 0) {
            return null;
        };
        const user = results.rows[0];
        renameKey(user, "useraccountid", "id");
        return user;
    };

    async getUserByID(userID) {
        const results = await db.query(
            "SELECT * " + 
            "FROM UserAccount " +
            "WHERE UserAccountID = $1",
            [userID]
        );
        if (results.rows.length === 0) {
            return null;
        };
        const user = results.rows[0];
        renameKey(user, "useraccountid", "id");
        return user;
    };

    async createUser(username, password) {
    await db.query(
        "INSERT INTO UserAccount " + 
        "(Username, Password) " + 
        "VALUES ($1, $2)",
        [username, password]
    );

    };

    async changePassword(username, newPassword) {
        await db.query(
            "UPDATE UserAccount " + 
            "SET Password = $1 " + 
            "WHERE Username = $2", 
            [newPassword, username]
        );
    };

    async addCollectionToUser(userID, collectionID) {
        await db.query(
            "INSERT INTO JunctionUserAccountCollection (UserAccountID, CollectionID) " + 
            "VALUES ($1, $2)", 
            [userID, collectionID]
        );
    };
    
    async addPresetToUser(userID, presetID) {
        await db.query(
            "INSERT INTO JunctionUserAccountPreset (UserAccountID, PresetID) " + 
            "VALUES ($1, $2)",
            [userID, presetID]
        );
    };

    async deleteUser(userID) {
        await db.query(
            "DELETE FROM UserAccount " + 
            "WHERE UserAccountID = $1",
            [userID]
        );
    }

    async deleteOtherUsers(allowedUserIDs) {
        const placeholders = allowedUserIDs.map(function(user, idx) {
            return '$' + (idx + 1)
        }).join(',');
        await db.query(
            "DELETE FROM UserAccount " +
            "WHERE UserAccountID NOT IN (" + placeholders + ")",
            allowedUserIDs
        );
    };
};

module.exports = new UserModel();
