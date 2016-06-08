Surly2
======

> **surly** *adjective*
>
>  1. bad-tempered and unfriendly

Surly2 is a half-complete node.js AIML interpreter with a bad attitude.

Surly2 is a remake from the ground up of [Surly](http://github.com/mrchimp/surly) using Node 5 and using as much asynchronicity as possible.


Status
======

Actually works quite well so far but not everything is implemented. Even so, I wouldn't try using it for anything serious quite yet. Check out `COVERAGE.md` for full details.


Requirements
============

[Node.js](https://nodejs.org/)


Installation
============

 1. Acquire code
 2. `npm install`


Config
======

Config files are found and read by [rc](https://www.npmjs.com/package/rc). Check the "Configuration File Formats" section of the `rc` readme for more instructions. Any flag shown in `node cli.js --help` can be set in the options file.

You probably just want to create `~/.surly2rc` and put something like this in it:

    {
        "brain": "/path/to/aiml/files",
        "username": "someXMPPUser@example.com",
        "password": "whatever"
    }


Usage
=====

1. `node cli.js`
2. Talk to Surly. Type `exit` to exit.

Or chat over XMPP

1. Set up a config file (see above) with XMPP details `username`, `password`, `host` and `port`.
2. `node xmpp.js`
3. You can't add contacts yet. You'll have to do that yourself somehow.

Or chat over Twitter

1. goto apps.twitter.com get consumer key, consumer secret, access token, and token secret
2. update credentials in twitter.js
3. `node twitter.js`


Thanks
======

* [Richard Wallace](http://www.alicebot.org/bios/richardwallace.html), creator of AIML and AliceBot.
* Noel Bush, author of the well written, if jargon-dense, [AIML v1.0.1 spec](http://www.alicebot.org/TR/2001/WD-aiml/).
