import { combineReducers } from 'redux'

import auth from './auth'
import userRegist from './userRegist'
import logList from './logList'
import serverList from './serverList'
import serverDetail from './serverDetail'
import serverCreate from './serverCreate'
import swytchList from './swytchList'
import swytchDetail from './swytchDetail'
import swytchCreate from './swytchCreate'

const appReducer = combineReducers({
	auth, userRegist, logList,
	serverList, serverDetail, serverCreate,
	swytchList, swytchDetail, swytchCreate
})

const rootReducer = (state, action) => {
	switch (action.type) {
		case 'LOGOUT_SUCCESS':
			state = {}
			break
		default:
	}
	return appReducer(state, action)
}

export default rootReducer