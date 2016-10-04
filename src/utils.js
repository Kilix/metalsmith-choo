const createHTML = require('create-html')
const R = require('ramda')

const createState = (metadata, f) => {
  const state = { metadata }
  for (let key in f) {
    const obj = R.omit(['stats', 'mode'], f[key])
    state[f[key].namespace] =
      Object.assign({}, obj, { contents: f[key].contents.toString() })
  }
  return state
}

const deleteFiles = (f) => {
  for (let file in f) {
    delete f[file]
  }
  return f
}

const parseKey = key => {
  return key === '/'
    ? 'index.html'
    : key.replace('/', '') + '/index.html'
}

const createFile = (app, f, state, opts, key) => {
  // Replace extension with .html
  const newFile = parseKey(key)

  // Create file with new extensions, copy and replace contents
  f[newFile] = {}
  f[newFile].contents = createHTML({
    script: opts.bundle,
    body: `
      <script>var CHOO_INITIAL_STATE = ${JSON.stringify(state)}</script>
      <div id="app-root">${app.toString(key, state)}</div>
    ` })
}

module.exports = {
  createState,
  deleteFiles,
  parseKey,
  createFile
}
