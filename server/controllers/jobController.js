const UserService = require("../services/userService");
const PresetService = require("../services/presetService");
const CollectionService = require("../services/collectionService");
const SubCollectionService = require("../services/subCollectionService");
const QuestionService = require("../services/questionService");
const ALLOWED_USER_IDS = [1];
class JobController {
    async resetDB(req, res) {
        try {
            console.log(ALLOWED_USER_IDS)
            await UserService.resetUsers(ALLOWED_USER_IDS);
            await PresetService.cleanPresets();
            await CollectionService.cleanCollections();
            await SubCollectionService.cleanSubCollections();
            await QuestionService.cleanQuestions();
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    }
}

module.exports = new JobController();
