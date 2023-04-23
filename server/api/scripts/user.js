const db = require("../../db");

async function verifyLogin(inputtedUsername, inputtedPassword) {
    const fetchedData = await db.query(
        "SELECT Password " + 
        "FROM UserAccount " + 
        "WHERE Username = $1",
        [inputtedUsername]
    );
    var result = {};
    userNotFound = fetchedData.rowCount === 0;

    if (userNotFound) {
        result.status = "fail";
        result.message = "User not found";
        return result;
    };
    actualPassword = fetchedData.rows[0].password;
    if (inputtedPassword != actualPassword) {
        result.status = "fail";
        result.message = "Wrong password";
        return result;
    };

    result.status = "success";
    result.message = "Login verified"
    return result;
};

async function getUserID(username) {
    const results = await db.query(
        "SELECT UserAccountID " + 
        "FROM UserAccount " + 
        "WHERE Username = $1",
        [username]
    );
    userIDNotFound = results.rowCount === 0;
    if (userIDNotFound) {
        return null;
    }
    return results.rows[0].useraccountid;
};


module.exports = { getUserID, verifyLogin };
