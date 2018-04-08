import React from 'react'
import { connect } from 'react-redux'
import { start, stop, restart } from 'ducks/serverDetail'
import Modal from 'components/molecules/Modal'

class PowerSwitchModal extends React.Component {
	render () {
		return (
			<Modal id={this.props.target} title={`サーバを${this.props.title}してよろしいですか？`}>
				<div className="modal-footer">
					<button type="button" className="btn btn-default pull-left" data-dismiss="modal">キャンセル</button>
					<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.onPowerSwitch}>{this.props.title}する</button>
				</div>
			</Modal>
		)
	}
}

class PowerMenu extends React.Component {
	render () {
		const poweron_live = (this.props.serverStatus === 1) ? false : true
		const poweroff_live = (this.props.serverStatus === 1) ? true : false
		const serverId = this.props.serverId
		return (
			<span>
			<div className="header-button">
				<button type="button" className="btn btn-success" data-toggle="modal"  data-target="#modal-server-start" disabled={poweroff_live}>
				<i className="icon fa fa-fw fa-power-off"></i>起動
				</button>
				<PowerSwitchModal title="起動" target="modal-server-start" onPowerSwitch={() => this.props.dispatch(start(serverId)) } />
			</div>
			<div className="header-button">
				<button type="button" className="btn btn-warning" data-toggle="modal"  data-target="#modal-server-restart" disabled={poweron_live}>
				<i className="icon fa fa-fw fa-refresh"></i>再起動
				</button>
				<PowerSwitchModal title="再起動" target="modal-server-restart" onPowerSwitch={() => this.props.dispatch(restart(serverId)) } />
			</div>
			<div className="header-button">
				<button type="button" className="btn btn-danger" data-toggle="modal"  data-target="#modal-server-stop" disabled={poweron_live}>
				<i className="icon fa fa-fw fa-times-circle-o"></i>強制停止
				</button>
				<PowerSwitchModal title="強制停止" target="modal-server-stop" onPowerSwitch={() => this.props.dispatch(stop(serverId)) } />
			</div>
			</span>
		)
	}
}

export default connect()(PowerMenu)