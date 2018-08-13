var TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const show_crypto_course_dict = require('./kuna_dictionary');
const constst = require('./consts');
const config = require('./config');
var bot = new TelegramBot(config.telegram_access_token, {polling: true});

bot.on('message', (msg, match) => {
    const chatId = msg.chat.id;
      for(let i = 0; i <= show_crypto_course_dict.length; i++)
      {
        if(msg.text.toLowerCase() === show_crypto_course_dict[i])
        {
        bot.sendMessage(chatId, 'Выберите какая валюта вас интересует', {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'BTC', callback_data: 'btcuah' },
                { text: 'XRP', callback_data: 'xrpuah' },
                { text: 'ETH', callback_data: 'ethuah' },
                { text: 'WAVES', callback_data: 'wavesuah' }],
                [{ text: 'BCH', callback_data: 'bchbtc' },
                { text: 'GBG', callback_data: 'gbguah' },
                { text: 'LTC', callback_data: 'ltcuah' },
                { text: 'DSH', callback_data: 'dashuah' }]
              ]
            }
          });
        }
      }
    });
    
    
bot.on('callback_query', query => {
 const id = query.message.chat.id;
    
  request(constst.kuna_ulr + query.data, function (error, response, body) {
   const data = JSON.parse(body);
    console.log(constst.kuna_ulr + query.data);
    let md = 
    ` Last: *${data.ticker.last}* uah`;
    bot.sendMessage(id, md, {parse_mode: 'Markdown'});
    })
})
    
module.exports = show_crypto_course_dict;