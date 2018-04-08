import React from 'react'

export default class BoxFrame extends React.Component {
	render () {
		const body = document.querySelector('body')
		body.className = "test hold-transition register-page"

		return (
			<div className="hold-transition register-page">
			<div className="register-box">
				<div className="register-logo"><b>iVPS</b></div>
				<div className="register-box-body">
					{this.props.children}
				</div>
			</div>
			</div>
		)
	}
}
