const createHTML = require('create-html')
const R = require('ramda')

const createState = (metadata, f) => {
  const deleteStat = R.omit(['stats'])
  const deleteMode = R.omit(['mode'])
  const deleteNext = R.omit(['next'])
  const deletePrevious = R.omit(['previous'])
  const stringifyContents = R.over(R.lensProp('contents'), R.toString)

  const cleanMetadata = R.curry((obj) => {
    const test = R.ifElse(
      R.hasIn('contents'),
      R.compose(
        deletePrevious,
        deleteNext,
        deleteMode,
        deleteStat,
        stringifyContents),
      cleanMetadata
    )
    return R.map(test, obj)
  })
  const state = { metadata: cleanMetadata(metadata) }

  for (let key in f) {
    if (f[key].namespace) {
      const obj = R.compose(
        stringifyContents,
        deleteMode,
        deleteStat)(f[key])

      state[f[key].namespace] =
        Object.assign({}, obj)
    }
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
