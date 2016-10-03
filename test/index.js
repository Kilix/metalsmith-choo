const test = require('tape')
const tapSpec = require('tap-spec')
const { parseKey, createState, createFile, deleteFiles } = require('../lib/utils')

const choo = require('choo')
const html = require('choo/html')

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout)

test('metalsmith-choo', function (t) {

  t.test('parseKey', function (tt) {
    tt.plan(2)

    tt.equal(typeof parseKey, 'function')

    const key = '/'
    const result = parseKey(key)
    tt.equal(result, 'index.html')
  })

  t.test('createState', function (tt) {
    tt.plan(2)

    tt.equal(typeof createState, 'function')

    const meta = { title: 'ok' }
    const files = {
      'index.md': { namespace: 'home', contents: 'Hellow' },
      'about.md': { namespace: 'about', contents: '# About \n Hellox' }
    }
    const expected = {
      metadata: { title: 'ok' },
      home: { namespace: 'home', contents: 'Hellow' },
      about: { namespace: 'about', contents: '# About \n Hellox' }
    }
    const result = createState(meta, files)
    tt.deepEqual(result, expected)
  })

  t.test('deleteFiles', function (tt) {
    tt.plan(2)

    tt.equal(typeof deleteFiles, 'function')

    const files = {
      'index.md': { namespace: 'home', contents: 'Hellow' },
      'about.md': { namespace: 'about', contents: '# About \n Hellox' }
    }
    const result = deleteFiles(files)
    const expected = {}
    tt.deepEqual(result, expected)
  })

  t.test('createFile', function (tt) {
    tt.plan(2)

    tt.equal(typeof createFile, 'function')

    const app = choo()
    app.router(r => [
      r('/', (state, prev, send) => html`<div><h1>Hello</h1></div>`)
    ])

    const f = {}
    const state = {
      metadata: {},
      home: { namespace: 'home', contents: 'Hello' }
    }
    const opts = { bundle: '/bundle.js' }
    const key = '/'
    createFile(app, f, state, opts, key)
    const expected = { 'index.html': { contents: '<!doctype html>\n<html lang="en">\n<head>\n\n<meta charset="utf-8">\n\n\n\n</head>\n<body>\n\n      <script>var CHOO_INITIAL_STATE = {"metadata":{},"home":{"namespace":"home","contents":"Hello"}}</script>\n      <div id="app-root"><div><h1>Hello</h1></div></div>\n    \n<script src="/bundle.js"></script>\n</body>\n</html>\n' } }
    tt.deepEqual(f, expected)
  })
})
