import { request, alertAction } from './common'

export default function reducer(state = { 
	isRequesting: false, data: null, alert: null, serverStatus: null, deleteStatus: null, deleteAlert: null
}, action) {
	switch (action.type) {
		case 'SERVER_DETAIL_REQUEST':
			return {
			//	...state,
				isRequesting: true,
				data: null,
				serverStatus: null,
				alert: null,
				deleteAlert: null,
				deleteStatus: null,
			}
		case 'SERVER_DETAIL_SUCCESS':
			return {
				...state,
				isRequesting: false,
				data: action.data,
			}
		case 'SERVER_DETAIL_FAILURE':
			return {
				...state,
				isRequesting: false,
			}
		case 'SERVER_DETAIL_ALERT':
			return {
				...state,
				alert: action.alert
			}
		case 'SERVER_DETAIL_STATUS':
			return {
				...state,
				serverStatus: action.status
			}
		case 'SERVER_DETAIL_DELETE':
			return {
				...state,
				deleteStatus: action.deleteStatus,
				deleteAlert: action.alert
			}
		default:
			return state
	}
}

export function detail(serverId) {
	return function (dispatch, getState) {
		dispatch({ type:'SERVER_DETAIL_REQUEST' })
		request('server/'+serverId+'/detail','get',function(err,res){
			if (res.body.error) {
				dispatch({ type:'SERVER_DETAIL_FAILURE' })
			} else{
				dispatch(status(serverId))
				dispatch({ type:'SERVER_DETAIL_SUCCESS', data:res.body })
			}
		})
	}
}

export function start (serverId) {
	return function (dispatch, getState) {
		dispatch(alertAction('SERVER_DETAIL_ALERT','サーバを起動中','loading'))
		request('server/'+serverId+'/power','put',function(err,res){
			dispatch(status(serverId))
			dispatch(alertAction('SERVER_DETAIL_ALERT','サーバを起動しました','success'))
		})
	}
}

export function restart (serverId) {
	return function (dispatch, getState) {
		dispatch(alertAction('SERVER_DETAIL_ALERT','サーバを再起動中','loading'))
		request('server/'+serverId+'/reset','put',function(err,res){
			dispatch(status(serverId))
			dispatch(alertAction('SERVER_DETAIL_ALERT','サーバを再起動しました','success'))
		})
	}
}

export function stop (serverId) {
	return function (dispatch, getState) {
		dispatch(alertAction('SERVER_DETAIL_ALERT','サーバを停止中','loading'))
		request('server/'+serverId+'/power','del',function(err,res){
			dispatch(status(serverId))
			dispatch(alertAction('SERVER_DETAIL_ALERT','サーバを停止しました','success'))
		})
	}
}

export function install(serverId, osType) {
	return function (dispatch, getState) {
		dispatch(alertAction('SERVER_DETAIL_ALERT','インストールを開始しています。しばらくお待ち下さい。','loading'))
		const data = { install: osType }
		request('server/'+serverId+'/install','put',function(err,res){
			dispatch(status(serverId))
			const mes = 'インストールを開始しました。コンソールを開いてインストール作業を行ってください。';
			dispatch(alertAction('SERVER_DETAIL_ALERT',mes,'success'))
		},data)
	}
}

export function update(serverId, serverInfo) {
	return function (dispatch, getState) {
		dispatch(alertAction('SERVER_DETAIL_ALERT','サーバ情報編集中','loading'))
		request('server/'+serverId,'put',function(err,res){
			dispatch(detail(serverId))
			dispatch(alertAction('SERVER_DETAIL_ALERT','サーバ情報を編集しました。','success'))
		},serverInfo)
	}
}

export function erase(serverId) {
	return function (dispatch, getState) {
		dispatch(alertAction('SERVER_DETAIL_DELETE','サーバを削除中','loading'))
		request('server/'+serverId,'del',function(err,res){
			let action;
			if (res.body.return_code === 1) {
				action = alertAction('SERVER_DETAIL_DELETE',res.body.err_message,'failure')
				action['deleteStatus'] = 2
			} else{
				action = alertAction('SERVER_DETAIL_DELETE','サーバを削除しました','success')
				action['deleteStatus'] = 1
			}
			dispatch(action)
		})
	}
}

export function networkUpdate(networks, serverId) {
	return function (dispatch, getState) {
		dispatch(alertAction('SERVER_DETAIL_ALERT','ネットワーク接続を編集中','loading'))
		Promise.all(
			networks.map((network) => {
				return new Promise((resolve, reject) => {
					const [iface_id, swytch_id] = network.split('_')
					request('interface/'+iface_id+'/to/switch/'+swytch_id,'put',function(err,res){
						if (res.body.error) {
							reject(res.body.error)
							return
						}
					//	res.body.select_name = select_name
						resolve(res.body)
					},{server_id:serverId})
				})
			})
		)
		.then((results) => {
			dispatch(detail(serverId))
			dispatch(alertAction('SERVER_DETAIL_ALERT','ネットワーク接続を完了しました。','success'))
		})
		.catch((result) => {
			dispatch(alertAction('SERVER_DETAIL_ALERT','ネットワーク接続に失敗しました。','failure'))
		})
		
	
	}
}

export function status(serverId) {
	return function (dispatch, getState) {
		request('server/'+serverId+'/power','get',function(err,res){
			dispatch({ type: 'SERVER_DETAIL_STATUS', status: res.body.status})
		})
	}
}