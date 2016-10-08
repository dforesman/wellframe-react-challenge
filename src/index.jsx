import React from 'react'
import {render} from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'

import App from './containers/app'

// set up our Thunk middleware, with logging for dev environment
const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)


// render our root application, wrapped in a store
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)