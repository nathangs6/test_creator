const db = require("../db");
const { renameKey } = require("./formatData.js");

export default class UserModel() {
    async getUser(username) {
            const results = await db.query(
                "SELECT UserAccountID " + 
                "FROM UserAccount " + 
                "WHERE Username = $1",
                [username]
            );
        if (results.rows.length === 0) {
            return null;
        };
        user = results.rows[0];
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
};
