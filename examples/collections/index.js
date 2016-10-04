const metalsmith = require('metalsmith')
const collections = require('metalsmith-collections')
const choo = require('../../lib/')

metalsmith(__dirname)
.source('src')
.destination('dist')
.use(collections())
.use(choo({
  entry: './choo/index.js'
, routes: ['/', '/about']
, bundle: '/bundle.js'
}))
.build(err => err ? console.error(err) : console.log("builded."))
