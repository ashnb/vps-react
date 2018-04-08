import React from 'react'
import { connect } from 'react-redux'

import { create,view } from 'ducks/serverCreate'

import Modal from 'components/molecules/Modal'
import Alert from 'components/molecules/Alert'
import { InputText, InputView } from 'components/molecules/Input'

class CreateModal extends React.Component {
	render () {
		const error = (this.props.serverInfo.serv_name === '') ? true : false
		return (
			<span>
			{error === true &&
			<Modal id="modal-server-create" title="入力エラー">
				<div className="modal-body">
					<Alert type="alert-warning" icon="fa-warning" allowHide={false} title="サーバ名入力エラー" message="サーバ名を入力してください。" />
				</div>
				<div className="modal-footer">
				<button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
				</div>
			</Modal>
			}
			{error === false &&
			<Modal id="modal-server-create" title="この内容でサーバを作成してよろしいですか？">
				<div className="modal-body">
					<InputView title="サーバ名" value={this.props.serverInfo.serv_name} />
					<InputView title="CPU" value={this.props.serverInfo.serv_cpucore} unit="コア" />
					<InputView title="メモリ" value={this.props.serverInfo.serv_memory} unit="GB" />
					<InputView title="ストレージ" value={this.props.serverInfo.serv_storage} unit="GB" />
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

class ServerCreate extends React.Component {
	constructor (props) {
		super(props)
		this.state = { serv_name: '', serv_memory:'1', serv_storage:'5', serv_cpucore:'1' }
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
					<InputText title="サーバ名" name="serv_name" defaultValue={this.state.serv_name} changed={changed.bind(this)} />

					{/*<InputRadio dataList={["1","2"]} title="CPU" name="serv_cpucore" checkedValue={this.state.serv_cpucore}
						unit="コア" changed={changed.bind(this)} />*/}
					<div className="form-group">
					<label className="col-sm-2 control-label">CPU</label>
					<div className="input-group">
						<div className="radio-inline" key="1"><label>
						<input type="radio" name="serv_cpucore" value="1" checked="true" />1コア
						</label></div>
						<div className="radio-inline" key="2"><label>
						<input type="radio" name="serv_cpucore" value="2" disabled="true" />2コア(選択できません)
						</label></div>
					</div>
					</div>

					{/*<InputRadio dataList={["1","2"]} title="メモリ" name="serv_memory" checkedValue={this.state.serv_memory}
						unit="GB" changed={changed.bind(this)} />*/}
					<div className="form-group">
					<label className="col-sm-2 control-label">メモリ</label>
					<div className="input-group">
						<div className="radio-inline" key="1"><label>
						<input type="radio" name="serv_memory" value="1" checked="true" />1GB
						</label></div>
						<div className="radio-inline" key="2"><label>
						<input type="radio" name="serv_memory" value="2" disabled="true" />2GB(選択できません)
						</label></div>
					</div>
					</div>

					{/*<InputRadio dataList={["5","10"]} title="ストレージ（HDD）" name="serv_storage" checkedValue={this.state.serv_storage}
						unit="GB" changed={changed.bind(this)} />*/}
					<div className="form-group">
					<label className="col-sm-2 control-label">ストレージ（HDD）</label>
					<div className="input-group">
						<div className="radio-inline" key="5"><label>
						<input type="radio" name="serv_storage" value="5" checked="true" />5GB
						</label></div>
						<div className="radio-inline" key="10"><label>
						<input type="radio" name="serv_storage" value="10" disabled="true" />10GB(選択できません)
						</label></div>
					</div>
					</div>
				</form>
				<button type="button" className="btn btn-info" data-toggle="modal"  data-target="#modal-server-create">作成する</button>
				<CreateModal onCreate={() => this.props.dispatch(create(this.state))} serverInfo={this.state} />
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
	const { alert } = state.serverCreate
	return { alert }
}

export default connect(mapStateToProps)(ServerCreate)