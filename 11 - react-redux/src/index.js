import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import {addNumber, decNumber} from './actions'
import SimpleApp from './reducers'

import App from './components/App'

let store = createStore(SimpleApp)

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(addNumber(4))
store.dispatch(decNumber(2))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)