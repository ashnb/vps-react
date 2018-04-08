import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthFrame from './components/pages/AuthFrame'

import Login from './components/templates/Login'
import Logout from './components/templates/Logout'

import ServerList from './components/templates/ServerList'
import ServerDetail from './components/templates/ServerDetail'
import ServerCreate from './components/templates/ServerCreate'

import SwytchList from './components/templates/SwytchList'
import SwytchDetail from './components/templates/SwytchDetail'
import SwytchCreate from './components/templates/SwytchCreate'

import UserRegist from './components/templates/UserRegist'
import EventLog from './components/templates/EventLog'

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Login} />
			<Route path='/login' component={Login} />
			<Route path='/logout' component={Logout} />
			<Route path='/user/regist' component={UserRegist} />
			<AuthFrame>
				<Switch>
					<Route path='/server/create' component={ServerCreate} />
					<Route path='/server/:id' component={ServerDetail} />
					<Route path='/server' component={ServerList} />
					<Route path='/switch/create' component={SwytchCreate} />
					<Route path='/switch/:id' component={SwytchDetail} />
					<Route path='/switch' component={SwytchList} />
					<Route path='/eventlog' component={EventLog} />
				</Switch>
			</AuthFrame>
		</Switch>
	</BrowserRouter>
)

export default App