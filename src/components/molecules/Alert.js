import React from 'react'

export default class Alert extends React.Component {
	constructor (props) {
		super(props)
		this.state = { visible:true }
	}

	componentWillReceiveProps () {
		this.setState({ visible:true })
	}

	handleHide() {
		this.setState({ visible:false })
	}

	render() {
		const allowHide = (this.props.allowHide !== undefined)? this.props.allowHide : true
		return (
			<div>
			{this.state.visible &&
				<div className={`alert alert-dismissible ${this.props.type}`}>
				{allowHide &&
				<button type="button" className="close" onClick={e => this.handleHide()}>&times;</button>
				}

				{this.props.title &&
				<span>
				<h4><i className={`icon fa fa-fw ${this.props.icon}`}></i>{this.props.title}</h4>
				{this.props.message}
				</span>
				}

				{!this.props.title &&
				<b><i className={`icon fa fa-fw ${this.props.icon}`}></i>{this.props.message}</b>
				}
				</div>
			}
			</div>
		)
	}
}