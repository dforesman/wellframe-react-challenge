import React from 'react'
import {render} from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'

import MyApp from './containers/app'

// set up our Thunk middleware, with logging for dev environment
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

// set up integration with redux developer tools
const composeEnhancers = (process.env.NODE_ENV !== 'production') ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
)

// render our root application, wrapped in a store
render(
  <Provider store={store}>
    <MyApp/>
  </Provider>,
  document.getElementById('app')
)