var TelegramBot = require('node-telegram-bot-api');
const rp = require('request-promise');
const moment = require('moment-timezone');

var token = '484090442:AAEFHOeMlVAhI6UqRtUiTHiO9OtJbcji84A';
var YQL = require('yql');
var query = new YQL('select * from weather.forecast where (location = 94089)');
var Q = require('Q');
var request = Q.denodeify(require("request"));

var bot = new TelegramBot(token, {polling: true});
bot.getMe().then(function (me) {
  console.log('Hi my name is %s!', me.username);
});


bot.onText(/\/start/, function (msg, match) {
  var fromId = msg.from.id; // get the id, of who is sending the message
  var message = "Welcome to your WeatherBot\n"
  message += "Get weather update by sending /weather [your_city] command."
  bot.sendMessage(fromId, message);
});

bot.onText(/\/weather/, function (msg) {
    var fromId = msg.from.id; // get the id, of who is sending the message
   
  getWeather()

});

 function getWeather() {
    const w =  rp({
      uri: 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="kiev, ua") and u = "c"&format=json',
      json: true
  });
  
   const hour = moment().tz("Europe/Kiev").hour();
   const day = hour <= 18 ? 'Today':'Tomorrow';
   const dayIndex = hour <= 18 ? 0:1;
   const {date, text, high, low} = w.query.results.channel.item.forecast[dayIndex];
   //return `${day} on ${date} in Kiev, the weather will be *${text.toLowerCase()}*, ${low} - ${high} °C. `;
   console.log(`${day} on ${date} in Kiev, the weather will be *${text.toLowerCase()}*, ${low} - ${high} °C. `);
  }