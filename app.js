/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(3000, function(){
	console.log('Servidor online');
});

/*
ALWAYS DO THAT

1 - export GOOGLE_APPLICATION_CREDENTIALS=skynet-94a868ba972c.json
2 - change node_modules/node-spotify-webhelper/index.js - line 158: return util.format("http://%s:%d%s", generateRandomLocalHostName(), localPort, url);

 */