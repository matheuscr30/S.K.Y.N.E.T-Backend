module.exports = function (application) {
    application.post('/api/conversation', function (req, res) {
        application.app.controllers.index.conversation(application, req, res);
    });

    application.post('/what', function (req, res) {
        let message = req.body.message;

        var natural = require('natural');
        const translate = require('google-translate-api');
        natural.PorterStemmer.attach();

        translate(message, {to: 'en'}).then(result => {
            let translation = result.text;
            console.log(translation);
            console.log(translation.tokenizeAndStem());
        }).catch(err => {
            console.error(err);
        });
    });
};
