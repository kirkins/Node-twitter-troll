const config = {};
// Fill these out with credentials from www.apps.twitter.com
config.TWITTER_CONSUMER_KEY = '';
config.TWITTER_CONSUMER_SECRET = '';
config.TWITTER_ACCESS_TOKEN = '';
config.TWITTER_ACCESS_TOKEN_SECRET = '';
config.TWITTER_SEARCH_PHRASE = '@your_user OR your search term'; // adding your user plus the search term means you'll respond
config.TWITTER_SEARCH_START_DATE = '2009-06-01'
config.TWITTER_LAST_REPLIED = 743205419682775040; // don't search tweets older than last replied
config.TWEET_FREQUENCY = 10; // tweet every minutes

module.exports = config;
