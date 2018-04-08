import superagent from 'superagent'
import base64 from 'base-64'

export function request(path, method, endCallback, data = null, isAuth = true, useCookie = false) {
	const url = '/api/'+path
	let req = superagent[method](url)
	if (isAuth) {
		const account = authedAccount()
		req.set('Authorization','Basic '+AuthBasicStr(account))
	}
	if (method === 'post' || data) {
		req.type('form')
	}
	if (useCookie) {
		req.withCredentials()
	}
	if (data) {
		req.send(data)
	}
	req.accept('application/json')
	req.end(endCallback)
}

export function alertAction(ActionType, message, key) {
	const types = {
		'loading': {icon: 'my-fa-spin fa-circle-o-notch', alert: 'alert-info'},
		'success': {icon: 'fa-check-circle-o', alert: 'alert-success'},
		'failure': {icon: 'fa-times-circle-o', alert: 'alert-danger'},
	}
	return { type: ActionType, alert: {icon: types[key]['icon'], type: types[key]['alert'], message} }
}

export function authedAccount() {
	return window.sessionStorage.getItem('account')
}

export function storeAccount(json) {
	window.sessionStorage.setItem('account',JSON.stringify(json))
}

export function clearAccount() {
	window.sessionStorage.clear()
}

function AuthBasicStr(account_str) {
	const account = JSON.parse(account_str)
	return base64.encode(account['user_id']+':'+account['access_token'])
}