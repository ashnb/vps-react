import React from 'react'

export default class Navbar extends React.Component {
	render () {
		return (
			<div role="navigation" className="navbar navbar-gray">
			<div className="collapse navbar-collapse">
			{this.props.children}
			</div>
			</div>
		)
	}
}