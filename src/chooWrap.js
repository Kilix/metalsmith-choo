/* global CHOO_INITIAL_STATE */
module.exports = function (app) {
  if (typeof window !== 'undefined') {
    app.use({
      wrapInitialState: (s) => {
        const newState = {}
        Object.keys(CHOO_INITIAL_STATE)
        .map(k => {
          const val = CHOO_INITIAL_STATE[k]
          if (val.contents) {
            const d = document.createElement('div')
            d.innerHTML = val.contents
            newState[k] = Object.assign({}, val, { contents: d })
          }
        })
        return Object.assign({}, s, newState)
      }
    })
    app.start('#app-root')
  }
  return app
}
