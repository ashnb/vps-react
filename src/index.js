import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import App from './App'

import reducers from './ducks/reducers'

const middleware = [ thunk, createLogger() ]
const store = createStore(reducers, applyMiddleware(...middleware))

ReactDOM.render(
	<Provider store={store}><App /></Provider>
	,document.getElementById('root')
)