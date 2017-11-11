const Twit = require('twit');
const request = require('request');
const http = require('http');

const server = http.createServer((req, res) => {
  res.end(`OK. uptime: ${new Date()}`);
});

server.listen(process.env.PORT || 5000);

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
});

const appleStream = T.stream('statuses/filter', {track: ['#iPhoneX'], language: 'en'});

appleStream.on('tweet', function (tweet) {
  sendToChannel(tweet.text);
  log(tweet.text);
});

function sendToChannel(text) {
  request.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    json: {
      "chat_id": "@apple_tweets",
      "text": text
    }
  });
}

function log(text) {
  console.log("====================================");
  console.log(text);
  console.log("====================================");
}