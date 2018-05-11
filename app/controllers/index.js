const projectId = 'skynet-202411';
const sessionId = 'backend-key';
const languageCode = 'pt-BR';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

module.exports.conversation = function (application, req, res) {
    let body = req.body;
    let message = body['message'];
    console.log(message);

    sendMessage(message, (responses) => {
        let result = responses[0].queryResult;
        application.app.controllers.funcs.speak(result.fulfillmentText);

        if (result.intent) {
            switch (result.intent.displayName) {
                case "music.yes":
                case "music.artist":
                case "music.genre":
                case "music.name":
                    application.app.controllers.funcs.playMusic(result);
                    break;
                case "music.stop":
                    application.app.controllers.funcs.stopMusic();
                    break;
            }
        }
    });

    res.status(200).json({"response" : "ok"});
};

function sendMessage(message, callback = () => {}) {
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    sessionClient
        .detectIntent(request)
        .then(responses => {
            callback(responses);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}
