import React from 'react'
import { connect } from 'react-redux'

import { install, status } from 'ducks/serverDetail'

import PowerMenuContainer from './MenuPower'
import InstallMenuContainer from './MenuInstall'
import ConfigMenuContainer from './MenuConfig'
import ConsoleMenu from './MenuConsole'
import NavBar from 'components/molecules/NavBar'


class ServerMenu extends React.Component {
	constructor (props) {
		super(props)
		this.state = { statusCheck:null }
	}
	componentWillUnmount(){
		clearInterval(this.state.statusCheck)
	}
	componentWillMount () {
	//	this.props.dispatch(statusCheck(this.props.serverId))
		const intervalId = setInterval(() => {
			this.props.dispatch(status(this.props.serverId)) 
		},5000)
		this.setState({ statusCheck:intervalId })
	}
	
	render () {
		return (
			<NavBar>
				<div className="navbar-left">
					<div className="header-status">
					{this.props.serverStatus === 1 ?
					<span className="text-green text-middle"><i className="icon fa fa-fw fa-check-circle"></i><b>稼働中</b></span>
					:
					<span className="text-red text-middle"><i className="icon fa fa-fw fa-ban"></i><b>停止中</b></span>
					}
					</div>
					<PowerMenuContainer serverId={this.props.serverId} serverStatus={this.props.serverStatus} />
					<ConsoleMenu serverId={this.props.serverId} serverStatus={this.props.serverStatus} />
				</div>
				<div className="navbar-right">
					<InstallMenuContainer onInstall={(osType) => this.props.dispatch(install(this.props.serverId,osType)) }
						serverStatus={this.props.serverStatus} />
					<ConfigMenuContainer />
				</div>
			</NavBar>
		)
	}

}

function mapStateToProps(state) {
	return {
		serverStatus: state.serverDetail.serverStatus,
		serverId: state.serverDetail.data ? state.serverDetail.data.server.id : null
	}
}

export default connect(mapStateToProps)(ServerMenu)