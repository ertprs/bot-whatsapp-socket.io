##Sobre o projeto

Este projeto viabiliza a automação de mensagens de Whatsapp.

O principal arquivo do projeto é o `gateway.js`, ele que escutará eventos http e socket.io e irá disparar o comando para o bot do whatsapp que foi construído usando um navegador serveless (puppeter)

##Instalação

Para instalar o projeto, basta você clonar este repositório e executar um `npm install` e em seguida executar o comando `node gateway.js`

**Obs.:** Na primeira execução, é necessário que você escaneie o QR Code para habilitar a sessão do Whatsapp, por isso é fundamental a execução em primeiro plano. Depois de criado a sessão, você poderá utilizar ele em segundo plano - eu recomendo a utilização da ferramenta [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/ "pm2").

##Consumindo a aplicação

Existem duas formas de consumir as funcionalidades desta automação sendo elas:

1. Via REST

	Realize uma requisição do tipo GET/ para `http:://localhost:3000?number=5555555555555&content=seu-texto`

2. Via socket.io

```javascript
const io = require("socket.io-client");
var socket = io.connect("http://localhost:3000");

socket.emit("received", {
    number: '555555555555@c.us',
    content: 'Esta é uma mensagem enviada através de socker.io'
});
```

##Agradecimentos

As funcionalidades do Whatsapp foram baseadas no pacote do Pedro Lopez
* [https://pedroslopez.me/whatsapp-web.js](https://pedroslopez.me/whatsapp-web.js)
