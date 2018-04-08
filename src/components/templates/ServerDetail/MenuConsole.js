import React from 'react'

export default class ConsoleMenu extends React.Component {

	openConsole (e) {
		e.preventDefault();
		const url = '/noVNC/vnc_auto.html?server_id='+this.props.serverId;
		window.open(url,'console'+this.props.serverId,'width=700,height=450,resizable=yes,scrollbars=yes');
		return false
	}
	render () {
		const poweron_live = (this.props.serverStatus === 1) ? false : true
		return (
		<div className="header-button">
			<div className="btn-group" role="group">
			<button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" disabled={poweron_live}>
			コンソール<span className="caret"></span>
			</button>
			<ul className="dropdown-menu" role="menu">
				<li><a onClick={e => this.openConsole(e) }>VNCコンソール</a></li>
			</ul>
			</div>
		</div>
		)
	}
}
