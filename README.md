# Metalsmith-choo

[![Travis branch](https://img.shields.io/travis/Kilix/metalsmith-choo/master.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/Kilix/metalsmith-choo/master)
[![npm](https://img.shields.io/npm/v/metalsmith-choo.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/metalsmith-choo)

## Wiki

  You can find a tutorial [here](https://github.com/Kilix/metalsmith-choo/wiki)

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

## Informations

The metalsmith metadata will be automaticly added to your app state under the key 'metadata'.
The content of the file from metalsmith will be added to your app state under the key you specified in your frontmatter.

markdown example file:

```
---
namespace: home
// eventually more key, they will be add to your state
title: Homepage
---

# Hello content

```

## Roadmap

- handle dynamic routing with metalsmith-collection ?
- get route from choo app (avoid the user to explicitly tell the routes to render)

## Tests

``` npm run test ```

## Contribute

Make an issue or a PR :)
To commit just use ``` npm run commit ```
