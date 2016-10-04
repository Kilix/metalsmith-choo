const path = require('path')
const { createState, createFile, deleteFiles } = require('./utils')

module.exports = (opts = {}) => {
  const app = require(path.resolve(process.cwd(), opts.entry))
  return (files, metalsmith, done) => {
    // Get metalsmith's metadata
    const metadata = metalsmith.metadata()

    // Create state
    const state = createState(metadata, files)

    // Delete file to make real files from choo app
    deleteFiles(files)

    // Create files for each routes (static duh!)
    opts.routes.map(key => createFile(app, files, state, opts, key))

    done()
  }
}
