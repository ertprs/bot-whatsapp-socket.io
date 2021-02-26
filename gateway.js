var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
const { Client, Location } = require('./index');
const qrcode = require('qrcode-terminal');

const SESSION_FILE_PATH = './session.json';
let sessionCfg;

//MANIPULATE FILE
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

//START BOT
const bot = new Client({ puppeteer: { headless: true }, session: sessionCfg });
bot.initialize();
bot.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});
bot.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});
//ENDBOOT

//DEFINE SOCKET.IO EVENTS
io.on("connection", function (client) {
    client.on("received", function (message) {
        console.log('Mensagem recebida via socket.io', message);

        let { number, content } = message;
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        bot.sendMessage(number, content);

        console.log('Enviada para o whatsapp');
    });
});
//END SOCKER.IO

//HTTP EVENTS
app.get('/', function (req, res) {

    console.log('Mensagem recebida via REST', req.query);

    let { number, content } = req.query;
    number = number.includes('@c.us') ? number : `${number}@c.us`;
    bot.sendMessage(number, content);
    res.send('Mensagem enviada');

    console.log('Enviada para o whatsapp');

});
//ENDHTTP

//START WEBSERVER
http.listen(3000, function () {
    console.log('listening on port 3000');
});
//EOF