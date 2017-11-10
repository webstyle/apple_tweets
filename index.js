const Twit = require('twit');
const request = require('request');

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000  // optional HTTP request timeout to apply to all requests.
});

const appleStream = T.stream('statuses/filter', {track: '#apple', language: 'en'});

appleStream.on('tweet', function (tweet) {
  sendToChannel(tweet.text);
});

function sendToChannel(text) {
  request.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    json: {
      "chat_id": "@apple_tweets",
      "text": text
    }
  });
}