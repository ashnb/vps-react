import { request, alertAction } from './common'

export default function reducer(state = { 
	alert: null
}, action) {
	switch (action.type) {
		case 'SERVER_CREATE_VIEW':
			return {
				alert: null
			}
		case 'SERVER_CREATE_ALERT':
			return {
				alert: action.alert
			}
		default:
			return state
	}
}

export function view() {
	return {type: 'SERVER_CREATE_VIEW'}
}

export function create(serverInfo) {
	return function (dispatch, getState) {
		dispatch(alertAction('SERVER_CREATE_ALERT','サーバを作成中','loading'))
		request('server/create','post',function(err,res){
			dispatch(alertAction('SERVER_CREATE_ALERT',res.body.message,'success'))
		},serverInfo)
	}
}