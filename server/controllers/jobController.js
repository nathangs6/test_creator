const UserService = require("../services/userService");
const PresetService = require("../services/presetService");
const CollectionService = require("../services/collectionService");
const SubCollectionService = require("../services/subCollectionService");
const QuestionService = require("../services/questionService");
const ALLOWED_USER_IDS = [1];
class JobController {
    async resetDB(req, res) {
        try {
            await UserService.resetUsers(ALLOWED_USER_IDS);
            setTimeout(async () => { await PresetService.cleanPresets() }, 100);
            setTimeout(async () => { await CollectionService.cleanCollections() }, 150);
            setTimeout(async () => { await SubCollectionService.cleanSubCollections() }, 200);
            setTimeout(async () => { await QuestionService.cleanQuestions() }, 250);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    }
}

module.exports = new JobController();
