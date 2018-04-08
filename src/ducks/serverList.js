import { request } from './common'

export default function reducer(state = {
	isRequesting:false, data: [],
}, action) {
	switch (action.type) {
		case 'SERVER_LIST_REQUEST':
			return {
				...state,
				isRequesting: true,
			}
		case 'SERVER_LIST_SUCCESS':
			return {
				...state,
				isRequesting: false,
				data: action.data,
			}
		case 'SERVER_LIST_FAILURE':
			return {
				...state,
				isRequesting: false,
			}
		default:
			return state
	}
}

export function list() {
	return function (dispatch, getState) {
		dispatch({ type:'SERVER_LIST_REQUEST' })
		request('server','get',function(err,res){
			if (res.body.error) {
				dispatch({ type:'SERVER_LIST_FAILURE' })
			} else{
				dispatch({ type:'SERVER_LIST_SUCCESS', data:res.body.server_list })
			}
		})
	}
}
