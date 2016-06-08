#!/usr/bin/env node

// Fill these out with credentials from apps.twitter.com
// Be careful if Surley2 error message 'fuck knows' can trigger an app ban
// Avoid this by having a default msg for * at bottom of your aiml for anything that doesn't return a match
var TWITTER_CONSUMER_KEY = '';
var TWITTER_CONSUMER_SECRET = '';
var TWITTER_ACCESS_TOKEN = '';
var TWITTER_ACCESS_TOKEN_SECRET = '';

var TWITTER_SEARCH_PHRASE = '@ph___p'; // make bots handle to respond to incoming tweets
var TWITTER_LAST_REPLIED = 1; // change to skip all before tweet ID
var TWEET_FREQUENCY = 7; // check for tweets every X minutes, tweeting too fast can get app restricted

var Twit = require('twit');

var twitterApi = new Twit({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});


var pkg = require('./package.json');
var Surly = require('./src/Surly');
var conf = require('rc')('surly', {
  brain: '',
  b: '',
  help: false,
  version: false
});

var options = {
  brain: conf.b || conf.brain || __dirname + '/data/aiml',
  help: conf.help || conf.h,
  version: conf.version,
}

var bot = new Surly({
  brain: options.brain
});

console.log('responding to ' + TWITTER_SEARCH_PHRASE + ' every '  + TWEET_FREQUENCY + ' minutes');

function BotReply() {

  var query = { // more options https://dev.twitter.com/rest/reference/get/search/tweets
    q: TWITTER_SEARCH_PHRASE,
    count: 100,
    result_type: "recent",
    since_id: TWITTER_LAST_REPLIED
  }

  twitterApi.get('search/tweets', query, BotGotLatestTweet);

  function BotGotLatestTweet(error, data, response) {
    if (error) {
      console.log('Bot could not find latest tweet, : ' + error);
    } else {
      var tweetQue = data.statuses.length - 1;
      while (tweetQue > -1) {
        if (data.statuses[tweetQue].text.substring(0, 2) != 'RT') { //if tweet is a RT skip
          var tweetId = data.statuses[tweetQue].id_str;
          var username = data.statuses[tweetQue].user.screen_name;
          // Clean msg for urls and weird chars that break aiml
          // unfortunatly this means @ and _ are stripped 
          var text = data.statuses[tweetQue].text
            .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
            .replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, " ");
          console.log(text);
          respondTo(username, text, tweetId);
        }
        tweetQue--;
      }
    }
  }

  function respondTo(username, text, tweetId) {
    bot.talk(text, function(err, response) {
      TWITTER_LAST_REPLIED = tweetId;
      if (err) {
        console.log('error: ' + err);
      }
      if (response) {
        var cleanText = response.toLowerCase();
        console.log('Sending: ' + cleanText);
        twitterApi.post('statuses/update', {
          status: '@' + username + ' ' + cleanText,
          in_reply_to_status_id: tweetId
        });
      } else {
        console.log('didn\'t return an error or response trying another tweet');
        BotReply();
      }
    });
  }

}

var timer = setInterval(BotReply, TWEET_FREQUENCY * 60 * 60 * 10);
