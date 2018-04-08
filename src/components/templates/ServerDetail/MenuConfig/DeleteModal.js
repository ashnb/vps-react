import React from 'react'
import { Link } from 'react-router-dom'
import Modal from 'components/molecules/Modal'
import Alert from 'components/molecules/Alert'

export default class DeleteModal extends React.Component {
	render () {
		const delete_disabled = (this.props.power_status !== 0) ? true : false;
		return (
			<Modal id="modal-server-delete" title="サーバを削除してよろしいですか？" allowClose={false}>
				<div className="modal-body">
					{this.props.alert && 
					<Alert type={this.props.alert.type} icon={this.props.alert.icon} allowHide={false} message={this.props.alert.message} />
					}
					{this.props.power_status !== 0 &&
					<Alert type="alert-warning" icon="fa-warning" allowHide={false} title="サーバ未停止" message="サーバが停止していません。削除するにはサーバを停止してください。" />
					}
				</div>
				<div className="modal-footer">
					{!this.props.alert &&
					<span>
					<button type="button" className="btn btn-default pull-left" data-dismiss="modal">キャンセル</button>
					<button type="button" className="btn btn-primary" onClick={this.props.onDelete} disabled={delete_disabled}>削除する</button>
					</span>
					}
					{this.props.status === 1 &&
					<Link to="/server" className="btn btn-primary" onClick={this.deleteModalBackdrop}>OK</Link>
					}
					{this.props.status === 2 &&
					<button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
					}
				</div>
			</Modal>
		)
	}
}