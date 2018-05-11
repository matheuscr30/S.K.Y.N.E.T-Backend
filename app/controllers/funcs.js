/*const translate = require('google-translate-api');

const target = 'pt';

module.exports.verifyTranslate = function (input) {
    //console.log(input);
    if (input['entities'].length == 0) return false;

    let entity = input['entities'][0]['entity'];

    if (entity !== 'idiomas') return false;
    else {
        module.exports.speak("Tradução Simultânea ativada");
        return true;
    }
};

module.exports.translate = function (text, callback = () => {}) {
    translate(text, {to: target}).then(res => {
        let translation = res.text;
        //console.log(translation);
        module.exports.speak(res.text);
        callback(translation);
    }).catch(err => {
        console.error(err);
    });
};
*/

const nodeSpotifyWebHelper = require('node-spotify-webhelper');
const spotify = new nodeSpotifyWebHelper.SpotifyWebHelper({port : 4381});
const watson = require('watson-developer-cloud');
const Sound = require('node-aplay');
const fs = require('fs');

//Brainstorm IOT 5
const text_to_speech = new watson.TextToSpeechV1({
    username: "ecb79334-a04e-4c6e-98a8-83143f4b1631",
    password: "jyM05UoNNp4n"
});

module.exports.playMusic = function (result) {
    let texts = result['fulfillmentMessages'][0]['text']['text'];
    let spotifyList = JSON.parse(texts[1]);

    spotify.play(spotifyList);

    spotify.getStatus(function (err, res) {
        if (err) {
            return console.error(err);
        }

        console.info('currently playing:',
            res.track.artist_resource.name, '-',
            res.track.track_resource.name);
    });
};

module.exports.stopMusic = function () {
    spotify.getStatus(function (err, res) {
        if (err) {
            return console.error(err);
        }

        let playing = res.playing;
        if(playing)
            spotify.pause();
    });
};

module.exports.speak = function (message, callback = () => {
}) {
    console.log(message);
    message = message.replace('.', '<break time="1s"/>');

    let params = {
        text: message,
        voice: 'pt-BR_IsabelaVoice', // Optional voice
        accept: 'audio/wav'
    };

    text_to_speech
        .synthesize(params, function (err, audio) {
            if (err) {
                console.log(err);
                return;
            }
            text_to_speech.repairWavHeader(audio);
            fs.writeFileSync('audio.wav', audio);

            let music = new Sound('audio.wav');
            music.play();
            music.on('complete', function () {
                callback();
            });
        });
};