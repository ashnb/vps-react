import React from 'react'
import ConfigMenuContainer from './MenuConfig'
import NavBar from 'components/molecules/NavBar'

export default class SwytchMenu extends React.Component {
	render () {
		return (
			<NavBar>
				<div className="navbar-right">
					<ConfigMenuContainer />
				</div>
			</NavBar>
		)
	}

}
