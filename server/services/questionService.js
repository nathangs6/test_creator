const UserService = require("../services/userService.js");
const QuestionModel = require("../models/questionModel.js");

export default class QuestionService() {
    async getQuestions(subCollectionID) {
        const questionData = await getQuestionsInSubCollection(subCollectionID);
        res.status(200).json({
            data: {
                questionData
            }
        });
        
    };

    async createQuestion(username, subCollectionID, questionData) {
        const userID = UserService.getUserID(username);
        if (!userID) {
            res.sendStatus(401);
            return null;
        }

        await QuestionModel.createQuestion(username, subCollectionID, questionData.name, questionData.content, questionData.source);
        res.sendStatus(200);
    };

    async updateQuestion(questionID, updateData) {
        await QuestionModel.updateQuestion(questionID, updateData.name, updateData.content, updateData.source);
        res.sendStatus(200);
    };

    async deleteOrphanedQuestions() {
    };

    async deleteQuestion(questionID) {
        await QuestionModel.deleteQuestion(questionID);
        res.sendStatus(200);
    };
};
