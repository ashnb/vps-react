import React from 'react'
import { connect } from 'react-redux'

import { update, erase } from 'ducks/swytchDetail'

import UpdateModal from './MenuConfig/UpdateModal'
import DeleteModal from './MenuConfig/DeleteModal'

class ConfigMenu extends React.Component {
	render () {
		const swytchId = this.props.swytchId
		return (
			<span>
			<div className="header-button">
				<div className="btn-group">
					<button type="button" className="btn btn-default navbar-btn" data-toggle="modal" data-target="#modal-swytch-update">
					<i className="fa fa-fw fa-cog"></i>設定
					</button>
				</div>
			</div>
			<div className="header-button header-button-last">
				<div className="btn-group">
					<button type="button" className="btn btn-danger navbar-btn" data-toggle="modal"　data-target="#modal-swytch-delete">
					<i className="fa fa-fw fa-trash"></i>削除
					</button>
				</div>
			</div>
			<UpdateModal swytch={this.props.swytch} onUpdate={(swytchInfo) => this.props.dispatch(update(swytchId,swytchInfo)) } />
			<DeleteModal status={this.props.deleteStatus} alert={this.props.deleteAlert} onDelete={()  => this.props.dispatch(erase(swytchId)) }/>
			</span>
		)
	}
}

function mapStateToProps(state) {
	const { deleteStatus, deleteAlert } = state.swytchDetail
	return {
		swytch: state.swytchDetail.data ? state.swytchDetail.data.switch : null,
		swytchId: state.swytchDetail.data ? state.swytchDetail.data.switch.id : null,
		deleteStatus, deleteAlert
	}
}

export default connect(mapStateToProps)(ConfigMenu)