import React from 'react'
import { connect } from 'react-redux'

import { detail } from 'ducks/serverDetail'

import ServerMenu from './ServerDetail/Menu'
import { ServerInfo, ServerGlobalIface, ServerIfaces } from './ServerDetail/Info'
import Alert from 'components/molecules/Alert'

class ServerDetail extends React.Component {
	componentWillMount () {
		this.props.dispatch(detail(this.props.serverId))
	}

	render () {
		return (
			<div>
				{this.props.isRequesting &&
					<div>読み込み中</div>
				}
				{!this.props.isRequesting && !this.props.server  &&
					<div>データがありません</div>
				}
				{!this.props.isRequesting && this.props.server &&
				<span>
				<ServerMenu />
				<div className="row">
					<ServerInfo server={this.props.server} />
					<ServerGlobalIface iface={this.props.server.iface_list[0]} />
					<ServerIfaces ifaces={this.props.server.iface_list} />
					{this.props.alert && 
					<div className="col-xs-12">
					<Alert type={this.props.alert.type} icon={this.props.alert.icon} message={this.props.alert.message} />
					</div>
					}
				</div>
				</span>
				}
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	const { isRequesting, alert } = state.serverDetail
	return {
		 server: state.serverDetail.data ? state.serverDetail.data.server : null,
		 serverId: parseInt(ownProps.match.params.id, 10),
		 isRequesting, alert
	}
}

export default connect(mapStateToProps)(ServerDetail)