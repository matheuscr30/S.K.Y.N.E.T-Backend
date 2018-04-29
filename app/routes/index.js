module.exports = function (application) {
    application.post('/api/conversation', function (req, res) {
        application.app.controllers.index.conversation(application, req, res);
    });

    application.get('/what', function (req, res) {

    });
};
