Node-twitter-troll
======

This is a twitter troll bot using Surly2 AIML library.

Requirements
============

[Node.js](https://nodejs.org/)


Installation
============

 1. Acquire code
 2. `npm install`


Config
======

Config file is found in the config folder. You'll need to add your own Twitter credentials which you can generate at http://apps.twitter.com

The AIML which generates responses can be found in 'data/aiml/mega.aiml'. At the very bottom you will find an AIML tag that looks like this:

```
<category><pattern>*</pattern>
<template><random>
<li>...</li>
...
</random></template>
</category>
```

When a message doesn't match to any of the AIML contained in this project then we use one of several random responses related to our search term (defined in the config file).

Usage
=====

1. `npm start`
2. Laugh as troll messages are sent out. 

Thanks
======

* [MrChimp](http://www.github.com/surly2), creator of Surly2 library used by this bot.
* [Richard Wallace](http://www.alicebot.org/bios/richardwallace.html), creator of AIML and AliceBot.
* Noel Bush, author of the well written, if jargon-dense, [AIML v1.0.1 spec](http://www.alicebot.org/TR/2001/WD-aiml/).
* [Rosie](https://github.com/pandorabots/rosie/tree/master/lib/aiml), Pandora bots fork of ALICE aiml files
