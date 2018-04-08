import React from 'react'
import Modal from 'components/molecules/Modal'

export default class UpdateModal extends React.Component {
	constructor (props) {
		super(props)
		this.state = { serv_name:'', serv_explain:''}
	}

	componentWillMount () {
		if (this.props.server) {
			this.setState({ serv_name: this.props.server.serv_name })
		}
	}

	render () {
		const changed = (e) => this.setState({[e.target.name]: e.target.value})
		return (
			<Modal id="modal-server-update" title="サーバ情報編集">
				<div className="modal-body">
					<form>
					<div className="form-group">
						<label>名前</label>
						<input type="text" name="serv_name" className="form-control radius-sm"
							value={this.state.serv_name} onChange={e => changed(e)} />
					</div>
					<div className="form-group">
						<label>説明</label>
						<textarea name="serv_explain" className="form-control radius-sm" rows="3"
							value={this.state.serv_explain} onChange={e => changed(e)} />
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