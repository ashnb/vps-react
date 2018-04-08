import React from 'react'
import Modal from 'components/molecules/Modal'

class CustomInstallModal extends React.Component {
	constructor (props) {
		super(props)
		this.state = { os_type: 0 }
	}
	render () {
		const changed = (e) => this.setState({[e.target.name]: e.target.value})
		return (
			<Modal id="modal-custom-install" title="カスタムインストール">
				<div className="modal-body">
					<form>
					<div className="form-group">
					<label>インストールOS</label>
					<select className="form-control radius-sm interface_input" name="os_type"
						 defaultValue="0" onChange={e => changed(e)}>
						<option value="0">選択してください</option>
						<option value="1">FreeBSD 10.3</option>
						<option value="2">CentOS 7.4</option>
					</select>
					</div>
					</form>
				</div>
				<div className="modal-footer">
				<button type="button" className="btn btn-default pull-left" data-dismiss="modal">キャンセル</button>
				<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.props.onInstall(this.state.os_type) }>インストール</button>
				</div>
			</Modal>
		)
	}
}

export default class InstallMenu extends React.Component {
	render () {
	//	const serverId = this.props.serverId
		const poweroff_live = (this.props.serverStatus === 1) ? true : false
		return (
			<div className="header-button">
			<div className="btn-group" role="group">
			<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" disabled={poweroff_live}>
			<i className="fa fa-fw fa-wrench"></i>OSインストール<span className="caret"></span>
			</button>
			<ul className="dropdown-menu" role="menu">
				{/*<li><a onClick={e => this.install() }>標準OSインストール</a></li>*/}
				<li><a data-toggle="modal" data-target="#modal-custom-install">カスタムOSインストール</a></li>
				{/*<li><a>ISOイメージインストール</a></li>*/}
			</ul>
			<CustomInstallModal onInstall={this.props.onInstall} />
			</div>
			</div>
		)
	}
}
