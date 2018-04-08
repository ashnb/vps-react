import React from 'react'
import { connect } from 'react-redux'

import { create, view } from 'ducks/swytchCreate'

import Modal from 'components/molecules/Modal'
import Alert from 'components/molecules/Alert'
import { InputText, InputView } from 'components/molecules/Input'

class CreateModal extends React.Component {
	render () {
		const error = (this.props.swytchInfo.name === '') ? true : false
		return (
			<span>
			{error === true &&
			<Modal id="modal-swytch-create" title="入力エラー">
				<div className="modal-body">
					<Alert type="alert-warning" icon="fa-warning" allowHide={false} title="スイッチ名入力エラー" message="スイッチ名を入力してください。" />
				</div>
				<div className="modal-footer">
				<button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
				</div>
			</Modal>
			}
			{error === false &&
			<Modal id="modal-swytch-create" title="この内容でスイッチを作成してよろしいですか？">
				<div className="modal-body">
					<InputView title="スイッチ名" value={this.props.swytchInfo.name} />
				</div>
				<div className="modal-footer">
				<button type="button" className="btn btn-default pull-left" data-dismiss="modal">キャンセル</button>
				<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.props.onCreate() }>作成する</button>
				</div>
			</Modal>
			}
			</span>
		)
	}
}

class SwytchCreate extends React.Component {
	constructor (props) {
		super(props)
		this.state = { name:'' }
	}

	componentWillMount () {
		this.props.dispatch(view())
	}

	render () {
		const changed = (e) => this.setState({[e.target.name]: e.target.value})
		return (
			<div className="row">
				<div className="col-md-12">
				<div className="box box-info">
				<div className="box-body">
		
				<form className="form-horizontal">
				<InputText title="スイッチ名" name="name" defaultValue={this.state.name} changed={changed.bind(this)} />
				</form>
				
				<button type="button" className="btn btn-info" data-toggle="modal"  data-target="#modal-swytch-create">作成する</button>
				<CreateModal onCreate={() => this.props.dispatch(create(this.state))} swytchInfo={this.state} />
				</div>
				</div>
				</div>
				
				{this.props.alert && 
				<div className="col-xs-12">
				<Alert type={this.props.alert.type} icon={this.props.alert.icon} message={this.props.alert.message} />
				</div>
				}
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	const { alert } = state.swytchCreate
	return { alert }
}

export default connect(mapStateToProps)(SwytchCreate)