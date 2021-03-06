const rp = require('request-promise');
const moment = require('moment-timezone');

async function getWeather() {
  const w =  await rp({
    uri: 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="kiev, ukraine") and u = "c"&format=json',
    json: true
});

 const hour = moment().tz("Europe/Kiev").hour();
 const day = hour <= 18 ? 'Today':'Tomorrow';
 const dayIndex = hour <= 18 ? 0:1;
 const {date, text, high, low} = w.query.results.channel.item.forecast[dayIndex];
 return `${day} on ${date} in Kiev, the weather will be *${text.toLowerCase()}*, ${low} - ${high} °C. `;
}

module.exports = getWeather;
