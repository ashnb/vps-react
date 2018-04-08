import React from 'react'
import Modal from 'components/molecules/Modal'

export default class UpdateModal extends React.Component {
	constructor (props) {
		super(props)
		this.state = { name:this.props.swytch.name }
	}
	render () {
		const changed = (e) => this.setState({[e.target.name]: e.target.value})
		return (
			<Modal id="modal-swytch-update" title="スイッチ情報編集">
				<div className="modal-body">
					<form>
					<div className="form-group">
						<label>名前</label>
						<input type="text" name="name" className="form-control radius-sm"
							value={this.state.name} onChange={e => changed(e)} />
					</div>
					</form>
				</div>
				<div className="modal-footer">
				<button type="button" className="btn btn-default pull-left" data-dismiss="modal">キャンセル</button>
				<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.props.onUpdate(this.state) }>設定する</button>
				</div>
			</Modal>
		)
	}
}