
const TelegramBot = require('node-telegram-bot-api');
const config = require('./Utils/config');

const bot = new TelegramBot(config.tommas_access_token, { polling: true });
console.log('................Bot started.............');


module.exports = bot;