import React from 'react'
import { connect } from 'react-redux'

import { update, erase, networkUpdate } from 'ducks/serverDetail'

import UpdateModal from './MenuConfig/UpdateModal'
import NetworkModal from './MenuConfig/NetworkModal'
import DeleteModal from './MenuConfig/DeleteModal'

class ConfigMenu extends React.Component {
	render () {
		const serverId = this.props.serverId
		return (
			<div className="header-button header-button-last">
			<div className="btn-group">
			<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
			<i className="fa fa-fw fa-cog"></i>各種設定<span className="caret"></span>
			</button>
			<ul className="dropdown-menu" role="menu">
				<li><a data-toggle="modal" data-target="#modal-server-update">サーバ情報編集</a></li>
				<li><a data-toggle="modal" data-target="#modal-server-delete">サーバ削除</a></li>
				<li><a data-toggle="modal" data-target="#modal-network-update">ネットワーク接続</a></li>
				{/*<li><a href="javascript:void(0);">ホスト名逆引き登録</a></li>*/}
			</ul>
			<UpdateModal server={this.props.server} onUpdate={(serverInfo) => this.props.dispatch(update(serverId,serverInfo)) } />
			<NetworkModal power_status={this.props.serverStatus} ifaces={this.props.ifaces} swytchList={this.props.swytchList} onUpdate={(networks) => this.props.dispatch(networkUpdate(networks,serverId))} />
			<DeleteModal power_status={this.props.serverStatus} status={this.props.deleteStatus} alert={this.props.deleteAlert} onDelete={()  => this.props.dispatch(erase(serverId)) }/>
			</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { deleteAlert, deleteStatus, serverStatus } = state.serverDetail
	return {
		server: state.serverDetail.data ? state.serverDetail.data.server : null,
		serverId: state.serverDetail.data ? state.serverDetail.data.server.id : null,
		ifaces: state.serverDetail.data ? state.serverDetail.data.server.iface_list : [],
		swytchList: state.serverDetail.data ? state.serverDetail.data.switch_list : [],
		deleteStatus, deleteAlert, serverStatus
	}
}

export default connect(mapStateToProps)(ConfigMenu)