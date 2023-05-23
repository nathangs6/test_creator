const GenerateService = require("../services/generateService");

class GenerateController {
    async generateTest(req, res) {
        const username = req.params.username;
        const choiceData = req.body.testSelection;
        console.log("Generating test");
        console.log(username);
        console.log(choiceData);
        try {
            await GenerateService.generateTest(username, choiceData);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(401);
        };
    }

    async downloadTest(req, res) {
        try {
            const username = req.params.username;
            const filePath = await GenerateService.getDownloadPath(username);
            res.download(filePath);
            setTimeout(async () => {
                await GenerateService.removeFiles(username), 
                    1000
            });
        } catch(err) {
            console.log(err);
        };
    }
}

module.exports = new GenerateController();
