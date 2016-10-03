const createHTML = require('create-html')

module.exports = (opts = {}) => {
  const app = require(opts.entry)
  return (f, metalsmith, d) => {
    const metadata = metalsmith.metadata()
    const state = { metadata }

    // Create state
    for (let key in f) {
      state[f[key].namespace] =
        Object.assign({}, f[key], { contents: f[key].contents.toString() })
    }

    // Delete file to make real files from choo app
    for (let file in f) {
      delete f[file]
    }

    // Create files for each routes (static duh!)
    opts.routes.map(key => {
      // Replace extension with .html
      const newFile = key === '/'
        ? 'index.html'
        : key.replace('/', '') + '/index.html'

      // Create file with new extensions, copy and replace contents
      f[newFile] = {}
      f[newFile].contents = createHTML({
        script: opts.bundle,
        body: `
          <script>var CHOO_INITIAL_STATE = ${JSON.stringify(state)}</script>
          <div id="app-root">${app.toString(key, state)}</div>
        ` })
    })
    d()
  }
}
