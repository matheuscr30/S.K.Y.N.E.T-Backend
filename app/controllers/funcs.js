/*const translate = require('google-translate-api');

const ypi = require('youtube-playlist-info');

const ffmpeg = require('fluent-ffmpeg');
const YouTube = require('youtube-node');
const Speaker = require('speaker');
const request = require('request');
const ytdl = require('ytdl-core');
const lame = require('lame');
const yql = require('yql');



const youTube = new YouTube();
var musicaTocando = false;
var lastEntity;
var stream;

const target = 'pt';

youTube.setKey('AIzaSyC5NNONZMPnkrdvvCWJ9ordrYcybEK16mo');



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

module.exports.configMusica = function (input) {

    if (input['entities'].length > 0) {
        let entity = input['entities'][0]['entity'];

        if (entity === "podeEscolher") {

            ypi("AIzaSyC5NNONZMPnkrdvvCWJ9ordrYcybEK16mo", "PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj").then(items => {
                //console.log(items.length);
                min = Math.ceil(0);
                max = Math.floor(199);
                ran = Math.floor(Math.random() * (max - min)) + min;
                //console.log(ran);
                //console.log(items[ran]['resourceId']['videoId']);
                console.log(items[ran]['title']);
                module.exports.tocarMusica(items[ran]['resourceId']['videoId']);

            }).catch(console.error);
        }

        lastEntity = entity;
        return;
    }

    if (lastEntity === "naoPodeEscolher") {
        text = input['context']['musica'];
        delete input['context']['musica'];

        youTube.search(text, 5, function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                //console.log(JSON.stringify(result, null, 2));
                let id = result['items'][0]['id']['videoId'];
                module.exports.tocarMusica(id);
                lastEntity = "";
            }
        });
    }
}

module.exports.tocarMusica = function (id) {
    let url = 'http://youtube.com/watch?v=' + id;

    let dl = ytdl(url, {
        filter: function (format) {
            return format.container === 'mp4';
        }
    });
    stream = ffmpeg(dl).format('mp3').pipe(new lame.Decoder())
        .on('format', function (format) {
            this.pipe(new Speaker(format));
            musicaTocando = true;
        });
};

module.exports.pararMusica = function () {
    if (musicaTocando) {
        stream.end();
        musicaTocando = false;
    }
};
*/

const watson = require('watson-developer-cloud');
const SoundPlayer = require('soundplayer');
const player = new SoundPlayer();
const fs = require('fs');

//Brainstorm IOT 5
const text_to_speech = new watson.TextToSpeechV1({
    username: "ecb79334-a04e-4c6e-98a8-83143f4b1631",
    password: "jyM05UoNNp4n"
});

module.exports.speak = function (message, callback = () => {}) {
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

            player.sound('audio.wav', function () {
                callback();
            });
        });
};