
const request = require('request');
const show_crypto_course_dict = require('./kuna_dictionary');
const constst = require('../Utils/consts');

const bot = require('../bot');

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
      for(let i = 0; i <= show_crypto_course_dict.length; i++)
      {
        if(msg.text.toLowerCase() === show_crypto_course_dict[i])
        {
        bot.sendMessage(chatId, 'Выбери валюту', {
          
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
 console.log("................\n", query, "\n.......................................\n");
    
  request(constst.kuna_ulr + query.data, function (error, response, body) {
    if(!error && response.statusCode === 200)
       var data = JSON.parse(body);
      const crypro_name = query.data.substring(0, query.data.length-3).toUpperCase();
      console.log(constst.kuna_ulr + query.data);
     let md = `*📢Last ${crypro_name}: ${data.ticker.last} uah*

💰Buy: *${data.ticker.buy}* uah\t🔼High:  *${data.ticker.high}* uah
💲Sell: *${data.ticker.sell}* uah\t\t🔽Low: *${data.ticker.low}* uah
🏦Vol.: *${data.ticker.vol}* `;


    bot.sendMessage(id, md, { parse_mode : "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Купить', callback_data: 'buy' },
            { text: 'Пподать', callback_data: 'sell' }
          ]
        ]}
      });
    })
})