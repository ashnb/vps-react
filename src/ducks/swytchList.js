import { request } from './common'

export default function reducer(state = {
	isRequesting:false, data: [],
}, action) {
	switch (action.type) {
		case 'SWYTCH_LIST_REQUEST':
			return {
				...state,
				isRequesting: true,
			}
		case 'SWYTCH_LIST_SUCCESS':
			return {
				...state,
				isRequesting: false,
				data: action.data,
			}
		case 'SWYTCH_LIST_FAILURE':
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
		dispatch({ type:'SWYTCH_LIST_REQUEST' })
		request('switch','get',function(err,res){
			if (res.body.error) {
				dispatch({ type:'SWYTCH_LIST_FAILURE' })
			} else{
				dispatch({ type:'SWYTCH_LIST_SUCCESS', data:res.body.switch_list })
			}
		})
	}
}