// question.js - Question route module
const express = require("express");
const QuestionController = require("../../controllers/questionController");
const router = express.Router();

router.get("/:subCollectionID", QuestionController.getQuestions);
router.post("/:username", QuestionController.createQuestion);
router.put("/:questionID", QuestionController.updateQuestion);
router.delete("/:questionID", QuestionController.deleteQuestion);

module.exports = router;
