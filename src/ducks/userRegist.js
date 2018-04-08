import { alertAction, request } from './common'

export default function reducer(state = {
	alert:null, isConfirm:false, errorMsg:null, userInfo:{name:'', user_id:'', password:'', password_cf:''}
}, action) {
	switch (action.type) {
		case 'USER_REGIST_BACK':
			return {
				...state,
				errorMsg:null,
				isConfirm: false,
			}
		case 'USER_REGIST_ERROR':
			return {
				...state,
				errorMsg: action.errorMsg,
				isConfirm: false,
			}
		case 'USER_REGIST_CONFIRM':
			return {
				...state,
				errorMsg:null,
				isConfirm: true,
				userInfo: action.userInfo,
			}
		case 'USER_REGIST_ALERT':
			return {
				...state,
				errorMsg:null,
				alert: action.alert
			}
		default:
			return state
	}
}

export function confirm(userInfo) {
	return function (dispatch, getState) {
		request('user/regist','post',function(err,res){
			if (res.body.error) {
				dispatch({type: 'USER_REGIST_ERROR', errorMsg: res.body.error})
			} else {
				dispatch({type: 'USER_REGIST_CONFIRM', userInfo: res.body})
			}
		}, userInfo, false, true)
	}
}

export function back () {
	return { type: 'USER_REGIST_BACK'}
}

export function regist() {
	return function (dispatch, getState) {
		dispatch(alertAction('USER_REGIST_ALERT','作成中','loading'))
		request('user/regist_fin','put',function(err,res){
			if (res.body.error) {
				dispatch(alertAction('USER_REGIST_ALERT','エラーが発生しました。再度お試しください','failure'))
			} else {
				dispatch(alertAction('USER_REGIST_ALERT','作成しました','success'))
			}
		}, null, false, true)
	}
}