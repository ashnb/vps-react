import { request, alertAction } from './common'

export default function reducer(state = { 
	isRequesting: false, data: null, alert: null, deleteStatus: null, deleteAlert: null
}, action) {
	switch (action.type) {
		case 'SWYTCH_DETAIL_REQUEST':
			return {
				...state,
				isRequesting: true,
			}
		case 'SWYTCH_DETAIL_SUCCESS':
			return {
				...state,
				isRequesting: false,
				data: action.data,
			}
		case 'SWYTCH_DETAIL_FAILURE':
			return {
				...state,
				isRequesting: false,
			}
		case 'SWYTCH_DETAIL_ALERT':
			return {
				...state,
				alert: action.alert
			}
		case 'SWYTCH_DETAIL_DELETE':
			return {
				...state,
				deleteStatus: action.deleteStatus,
				deleteAlert: action.alert
			}
		default:
			return state
	}
}

export function detail(swytchId) {
	return function (dispatch, getState) {
		dispatch({ type:'SWYTCH_DETAIL_REQUEST' })
		request('switch/'+swytchId+'/detail','get',function(err,res){
			if (res.body.error) {
				dispatch({ type:'SWYTCH_DETAIL_FAILURE' })
			} else{
				dispatch({ type:'SWYTCH_DETAIL_SUCCESS', data:res.body })
			}
		})
	}
}

export function update(swytchId, swytchInfo) {
	return function (dispatch, getState) {
		dispatch(alertAction('SWYTCH_DETAIL_ALERT','スイッチ情報編集中','loading'))
		request('switch/'+swytchId,'put',function(err,res){
			dispatch(detail(swytchId))
			const mes = 'スイッチ情報を編集しました。';
			dispatch(alertAction('SWYTCH_DETAIL_ALERT',mes,'success'))
		},swytchInfo)
	}
}

export function erase(swytchId) {
	return function (dispatch, getState) {
		dispatch(alertAction('SWYTCH_DETAIL_DELETE','スイッチを削除中','loading'))
		request('switch/'+swytchId,'del',function(err,res){
			let action;
			if (res.body.return_code === 1) {
				action = alertAction('SWYTCH_DETAIL_DELETE',res.body.err_message,'failure')
				action['deleteStatus'] = 2
			} else{
				action = alertAction('SWYTCH_DETAIL_DELETE','スイッチを削除しました','success')
				action['deleteStatus'] = 1
			}
			dispatch(action)
		})

	}
}