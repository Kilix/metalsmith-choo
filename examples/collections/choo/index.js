const wrapper = require('../../../lib/chooWrap')
const choo = require('choo')
const html = require('choo/html')

const app = choo()
app.model({
  namespace: 'input',
  state: {
    title: 'my demo app'
  },
  reducers: {
    update: (data, state) => ({ title: data.payload })
  },
  effects: {
    update: (data, state, send, done) => {
      document.title = data.payload
      done()
    }
  }
})

const mainView = (state, prev, send) => {
  return html`
    <main class="app">
      <a href='/about'>About me</a>
      <h1>${state.input.title}</h1>
      <label>Set the title</label>
      <p>${state.home.contents}</p>
      <input
        type="text"
        placeholder=${state.input.title}
        oninput=${(e) => send('input:update', { payload: e.target.value })}>
    </main>
  `
}

const aboutView = (state, prev, send) => {
  return html`
    <main class="app">
      <h1>About me</h1>
      ${state.about.contents}
    </main>
  `
}

app.router((route) => [
  route('/', mainView)
, route('/about', aboutView)
])

module.exports = wrapper(app)
