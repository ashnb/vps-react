import React from 'react'

export default class Modal extends React.Component {
	deleteModalBackdrop () {
		const bd = document.getElementsByClassName("modal-backdrop")
		for (let i=0; i<bd.length; i++){ bd[i].parentNode.removeChild(bd[i]) }
	}
	
	render() {
		const allowClose = (this.props.allowClose !== undefined)? this.props.allowClose : true
		const backdrop = (allowClose)? true : false
		return (
			<div className="modal fade" id={this.props.id} data-backdrop={backdrop}>
			<div className="modal-dialog">
			<div className="modal-content radius-lg">
				<div className="modal-header">
				{allowClose &&
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">×</span></button>
				}
				<h4 className="modal-title">{this.props.title}</h4>
				</div>
				{this.props.children}
			</div>
			</div>
			</div>
		)
	}
}