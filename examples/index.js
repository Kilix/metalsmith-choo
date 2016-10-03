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
