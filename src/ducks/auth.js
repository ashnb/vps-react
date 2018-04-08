import { request, clearAccount, authedAccount, storeAccount } from './common'

export default function reducer(state = {
	isRequesting:true, isAuthed:false, user:{}, errormsg: '',
}, action) {
	switch (action.type) {
		case 'LOGIN_REQUEST':
		case 'AUTH_REQUEST':
			return {
				...state,
				isRequesting: true,
				isAuthed: false,
			}
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isRequesting: false,
				isAuthed: true,
			}
		case 'LOGIN_FAILURE':
			return {
				...state,
				isRequesting: false,
				isAuthed: false,
				errorMsg:action.errorMsg
			}
		case 'AUTH_SUCCESS':
			return {
				...state,
				isRequesting: false,
				isAuthed: true,
				user: action.user
			}
		case 'AUTH_FAILURE':
			return {
				...state,
				isRequesting: false,
				isAuthed: false,
			}
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				isAuthed:false
			}
		case 'LOGOUT_FAILURE':
			return {
				...state,
				isAuthed:true
			}
		case 'LOGIN_PRE':
			return {
				...state,
				isRequesting:false,
				isAuthed:false,
			}
		default:
			return state
	}
}

export function auth() {
	return function (dispatch, getState) {
		const account = authedAccount()
		if(!account){
			dispatch({ type: 'AUTH_FAILURE' })
			return
		}
		dispatch({ type:'AUTH_REQUEST' })
		request('user/auth','post',function(err,res){
			if (res.body.error || !res.body.user) {
				dispatch({ type: 'AUTH_FAILURE' })
			} else{
				dispatch({ type:'AUTH_SUCCESS', user:res.body.user })
			}
		})
	}
}

export function loginPre() {
	return { type: 'LOGIN_PRE' }
}

export function login(user_id, password) {
	return function (dispatch, getState) {
		dispatch({ type:'LOGIN_REQUEST' })
		const data = {user_id, password}
		request('user/login','post',function(err,res){
			if (res.body.error) {
				dispatch({ type:'LOGIN_FAILURE', errorMsg:res.body.error })
			} else{
				storeAccount(res.body)
				dispatch({ type:'LOGIN_SUCCESS'})
			}
		},data,false)
	}
}

export function logout() {
	clearAccount()
	const item = authedAccount()
	if (item) {
		return { type: 'LOGOUT_FAILURE'}
	} else {
		return { type: 'LOGOUT_SUCCESS'}
	}
}