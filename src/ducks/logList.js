import { request } from './common'

export default function reducer(state = {
	isRequesting:false, data:[]
}, action) {
	switch (action.type) {
		case 'EVENT_LOG_REQUEST':
			return {
				...state,
				isRequesting: true,
			}
		case 'EVENT_LOG_SUCCESS':
			return {
				...state,
				isRequesting: false,
				data: action.data,
			}
		case 'EVENT_LOG_FAILURE':
			return {
				...state,
				isRequesting: false,
			}
		default:
			return state
	}
}

export function logList() {
	return function (dispatch, getState) {
		dispatch({ type:'EVENT_LOG_REQUEST' })
		request('eventlog','get',function(err,res){
			if (res.body.error) {
				dispatch({ type:'EVENT_LOG_FAILURE' })
			} else{
				dispatch({ type:'EVENT_LOG_SUCCESS', data:res.body.log_list })
			}
		})
	}
}