import { request, alertAction } from './common'

export default function reducer(state = { 
	alert: null
}, action) {
	switch (action.type) {
		case 'SWYTCH_CREATE_VIEW':
			return {
				alert: null
			}
		case 'SWYTCH_CREATE_ALERT':
			return {
				...state,
				alert: action.alert
			}
		default:
			return state
	}
}

export function view() {
	return {type: 'SWYTCH_CREATE_VIEW'}
}

export function create(swytchInfo) {
	return function (dispatch, getState) {
		dispatch(alertAction('SWYTCH_CREATE_ALERT','スイッチを作成中','loading'))
		request('switch/create','post',function(err,res){
			dispatch(alertAction('SWYTCH_CREATE_ALERT',res.body.message,'success'))
		},swytchInfo)

	}
}