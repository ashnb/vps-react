import React from 'react'
import { Link } from 'react-router-dom'
import Modal from 'components/molecules/Modal'
import Alert from 'components/molecules/Alert'

export default class DeleteModal extends React.Component {
	render () {
		return (
			<Modal id="modal-swytch-delete" title="スイッチを削除してよろしいですか？" allowClose={false}>
				<div className="modal-body">
					{this.props.alert && 
					<Alert type={this.props.alert.type} icon={this.props.alert.icon} allowHide={false} message={this.props.alert.message} />
					}
				</div>
				<div className="modal-footer">
					{!this.props.alert &&
					<span>
					<button type="button" className="btn btn-default pull-left" data-dismiss="modal">キャンセル</button>
					<button type="button" className="btn btn-primary" onClick={this.props.onDelete}>削除する</button>
					</span>
					}
					{this.props.status === 1 &&
					<Link to="/switch" className="btn btn-primary" onClick={this.deleteModalBackdrop}>OK</Link>
					}
					{this.props.status === 2 &&
					<button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
					}
				</div>
			</Modal>
		)
	}
}