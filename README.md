# Metalsmith-choo

[![Travis branch](https://img.shields.io/travis/wcastand/metalsmith-choo/master.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/wcastand/metalsmith-choo/master)
[![npm](https://img.shields.io/npm/v/metalsmith-choo.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/metalsmith-choo)

## Install

``` npm install metalsmith-choo ```

## Usage

```javascript

// In yout metalsmith file

const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const choo = require('../lib/')

metalsmith(__dirname)
.source('src')
.destination('dist')
.use(markdown())
.use(choo({
  entry: './choo/index.js'
, routes: ['/', '/about']
, bundle: '/bundle.js'
}))
.build(err => err ? console.error(err) : console.log("builded."))

```

In your choo app require the wrapper.

```javascript
  const wrapper = require('metalsmith-choo/lib/chooWrap')
```

and then replace the app.start() by :

```javascript
  module.exports = wrapper(app)
```

## Roadmap

- handle dynamic routing with metalsmith-collection ?
- get route from choo app (avoid the user to explicitly tell the routes to render)

## Tests

``` npm run test ```

## Contribute

Make an issue or a PR :)
To commit just use ``` npm run commit ```
