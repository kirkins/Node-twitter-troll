// See config file for values needed on setup
const config = require('./config/config');
const Twit = require('twit');

var Bot = new Twit({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});


const pkg = require('./package.json');
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

var sur = new Surly({
  brain: options.brain
});

console.log('Surly started will respond to a tweet every ' + config.TWEET_FREQUENCY + ' minutes');

function BotReply() {

  var query = {
    q: config.TWITTER_SEARCH_PHRASE,
    count: 100,
    result_type: "recent",
    since_id: config.TWITTER_LAST_REPLIED
  }

  Bot.get('search/tweets', query, BotGotLatestTweet);

  function BotGotLatestTweet(error, data, response) {
    if (error) {
      console.log('Bot could not find latest tweet, : ' + error);
    } else {
      var tweetQue = data.statuses.length - 1; //start at last tweet in search to check if replied
      while (tweetQue > -1) {
        if (data.statuses[tweetQue].text.substring(0, 2) != 'RT') { //check if a RT
          var tweetId = data.statuses[tweetQue].id_str;
          var username = data.statuses[tweetQue].user.screen_name;
          // Clean msg for urls and weird chars before aiml
          // Unfortunately this means twitter names are stripped of @ and _
          var text = data.statuses[tweetQue].text
            .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
            .replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, " ");
          console.log(text);
          respondTo(username, text, tweetId);
	  return; // this makes only respond to one person at a time
        }
        tweetQue--;
      }
    }
  }

  function respondTo(username, text, tweetId) {
    sur.talk(text, function(err, response) {
      config.TWITTER_LAST_REPLIED = tweetId;
      if (err) {
        console.log('error: ' + err);
      }
      else if (response) {
        var cleanText = response.toLowerCase();
        cleanText = cleanText.replace(/yyy/g, "_")
          .replace(/xxx/g, "@");

        console.log('Sending: ' + cleanText);
        Bot.post('statuses/update', {
          status: '@' + username + ' ' + cleanText,
          in_reply_to_status_id: tweetId
        });
        console.log('tweet sent');
        return;
      }
      console.log('didn\'t return an error or response trying another tweet');
      BotReply();
    });
  }

}

var timer = setInterval(BotReply, config.TWEET_FREQUENCY * 60 * 60 * 10);
