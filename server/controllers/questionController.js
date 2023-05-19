const UserService = require("../services/userService");
const QuestionService = require("../services/questionService.js");

class QuestionController {
    async getQuestions(req, res) {
    try {
        const subCollectionID = req.params.subCollectionID;
        const questionData = await QuestionService.getQuestions(subCollectionID);
        res.status(200).json({
            data: {
                questionData
            }
        });
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
    };
    };

    async createQuestion(req, res) {
        try {
            const username = req.params.username;
            const subCollectionID = req.body.subCollectionID;
            const newQuestionData = {
                name: req.body.newQuestionName,
                content: req.body.newQuestionContent,
                source: req.body.newQuestionSource
            }
            const userID = await UserService.getUserID(username);
            if (!userID) {
                res.sendStatus(401);
                return null;
            };
            const questionData = await QuestionService.createQuestion(userID, subCollectionID, newQuestionData);
            res.status(200).json({
                data: {
                    questionData
                }
            });
            
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async updateQuestion(req, res) {
        try {
            const questionID = req.params.questionID;
            const updateData = {
                name: req.body.newQuestionName,
                content: req.body.newQuestionContent,
                source: req.body.newQuestionSource
            };
            const questionData = await QuestionService.updateQuestion(questionID, updateData);
            res.status(200).json({
                data: {
                    questionData
                }
            });
            
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async deleteQuestion(req, res) {
        try {
            const questionID = req.params.questionID;
            await QuestionService.deleteQuestion(questionID);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };
};

module.exports = new QuestionController();
