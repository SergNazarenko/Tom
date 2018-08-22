// const request = require('request');
// const constst = require('../Utils/consts');
// const show_currency_exchange_dict = require('../Privatbank/privat_dictionary');
// const bot = require('../Kuna/kuna');



// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//       for(let i = 0; i <= show_currency_exchange_dict.length; i++)
//       {
//         if(msg.text.toLowerCase() === show_currency_exchange_dict[i])
//         {
//         bot.sendMessage(chatId, 'Выбери валюту', {
//           reply_markup: {
//             inline_keyboard: 
//             [[
//                 { text: 'USD-UAH', callback_data: 'USD' },
//                 { text: 'EUR-UAH', callback_data: 'EUR' }
//             ]]
//             }
//           });
//         }
//       }
//     });
    
// bot.on('callback_query1', query1 => {
//  const id1 = query1.message.chat.id;
//  console.log("................\n", query1, "\n.......................................\n");
    
//   request(constst.privat_currency_exchange_url , function (error, response, body) {
//    const data1 = JSON.parse(body);
//     data1.array.forEach(element => {
//       const md = `${element.ccy}`;
//   });
   

// bot.sendMessage(id1, md, { parse_mode : "Markdown",
//       reply_markup: {
//         inline_keyboard: [
//           [
//             { text: 'Купить', callback_data: 'buy' },
//             { text: 'Пподать', callback_data: 'sell' }
//           ]
//         ]}
//       });
//     })
// })