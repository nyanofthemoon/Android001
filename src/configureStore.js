'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import { Platform } from 'react-native'
import Immutable from 'immutable'

import reducer from './reducers'

const middlewares = []

let enhancer
if (__DEV__) {
  const installDevTools = require('immutable-devtools')
  installDevTools(Immutable)
  enhancer = compose(
    applyMiddleware(...middlewares),
    global.reduxNativeDevTools ?
      global.reduxNativeDevTools(/*options*/) : noop => noop )
} else {
  enhancer = applyMiddleware(...middlewares)
}

function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer)
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default)
    })
  }
  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }
  return store
}

export default configureStore()
