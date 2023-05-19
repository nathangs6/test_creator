require("dotenv").config();
const db = require("../../db");

async function cleanCollections() {
    // Ensures there are no orphaned collections
    try {
        const orphanedCollections = await db.query(
            "SELECT Collection.CollectionID " + 
            "FROM Collection " + 
            "WHERE NOT EXISTS (" + 
                "SELECT 1 FROM JunctionUserAccountCollection " + 
                "WHERE CollectionID = Collection.CollectionID" + 
            ")"
        );
        console.log(orphanedCollections);
        // TODO: delete the orphans
    } catch(err) {
        console.log(err);
    };
};

async function cleanQuestions() {
    // Ensures there are no orphaned questions
    try {
        const orphanedQuestions = await db.query(
            "DELETE FROM Question " + 
            "WHERE NOT EXISTS (" + 
                "SELECT 1 FROM JunctionUserAccountQuestion " + 
                "WHERE QuestionID = Question.QuestionID" + 
            ") AND NOT EXISTS (" + 
                "SELECT 1 FROM JunctionSubCollectionQuestion " +
                "WHERE QuestionID = Question.QuestionID)"
        );
        // TODO: delete the orphans
    } catch(err) {
        console.log(err)
    };
};

async function cleanSubCollections() {
    try {
        const orphanedQuestions = await db.query(
            "DELETE FROM Question " + 
            "WHERE NOT EXISTS (" + 
                "SELECT 1 FROM JunctionSubCollectionQuestion " +
                "WHERE QuestionID = Question.QuestionID)"
        );
    } catch(err) {
        console.log(err);
    };
};
module.exports = { cleanCollections, cleanQuestions, cleanSubCollections };
