import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirm, regist, back } from 'ducks/userRegist'

import BoxFrame from 'components/pages/BoxFrame'

class RegistForm extends React.Component {
	constructor (props) {
		super(props)
		const userInfo = this.props.userInfo
		this.state = { name: userInfo.name, user_id: userInfo.user_id, password: userInfo.password, password_cf: userInfo.password_cf }
	}
	render () {
		const changed = (e) => this.setState({[e.target.name]: e.target.value})
		return (
			<div>
			<div className="form-group has-feedback">
			<input type="text" name="name" className="form-control" placeholder="名前"
				value={this.state.name} onChange={e => changed(e)} />
			<span className="glyphicon glyphicon-user form-control-feedback"></span>
			</div>

			<div className="form-group has-feedback">
			<input type="text" name="user_id" className="form-control" placeholder="会員ID"
				value={this.state.user_id} onChange={e => changed(e)} />
			<span className="glyphicon glyphicon-envelope form-control-feedback"></span>
			</div>

			<div className="form-group has-feedback">
			<input type="password" name="password" className="form-control" placeholder="パスワード"
				value={this.state.password} onChange={e => changed(e)} />
			<span className="glyphicon glyphicon-lock form-control-feedback"></span>
			</div>

			<div className="form-group has-feedback">
			<input type="password" name="password_cf" className="form-control" placeholder="パスワード確認"
				value={this.state.password_cf} onChange={e => changed(e)} />
			<span className="glyphicon glyphicon-log-in form-control-feedback"></span>
			</div>

			<div className="pull-right">
			<button type="button" className="btn btn-block btn-primary btn-flat" onClick={e => this.props.onConfirm(this.state)}>確認画面へ</button>
			</div>
			</div>
		)
	}
}
class RegistConfirm extends React.Component {
	render () {
		return (
			<div>
				<div className="form-group has-feedback">
				<p className="form-control-static">{this.props.userInfo.name}</p>
				</div>
				<div className="form-group has-feedback">
				<p className="form-control-static">{this.props.userInfo.user_id}</p>
				</div>
				<div className="form-group has-feedback">
				<p className="form-control-static">パスワードは表示されません。</p>
				</div>

				{this.props.alert ?
				<div className={`alert alert-dismissible ${this.props.alert.type}`}>
				<b><span><i className={`icon fa fa-fw ${this.props.alert.icon}`}></i>{this.props.alert.message}</span></b>
					{this.props.alert.type === 'alert-success' &&
					<p>ログインは<Link to="/login">こちら</Link></p>
					}
				</div>
				:
				<div className="pull-right">
				<button type="button" className="btn btn-block btn-primary btn-flat" onClick={this.props.onBack}>戻る</button>
				<button type="button" className="btn btn-block btn-primary btn-flat" onClick={e => this.props.onRegist()}>登録する</button>
				</div>
				}
			</div>
		)
	}
}

class UserRegist extends React.Component {
	render () {
		return (
			<BoxFrame>
					<p className="login-box-msg">ユーザー登録</p>
					{this.props.errorMsg &&
					<div className="alert alert-danger alert-dismissible">
					<p><strong><i className="icon fa fa-ban"></i> 内容を確認してください。</strong></p>
					<p>{this.props.errorMsg}</p>
					</div>
					}

					{this.props.isConfirm ?
					<RegistConfirm onRegist={() => this.props.dispatch(regist())} onBack={() => this.props.dispatch(back())}
						userInfo={this.props.userInfo} alert={this.props.alert} />
					:
					<RegistForm onConfirm={(userInfo) => this.props.dispatch(confirm(userInfo))} userInfo={this.props.userInfo} />
					}
			</BoxFrame>
		)
	}
}

function mapStateToProps(state, ownProps) {
	const { alert, isConfirm, errorMsg, userInfo } = state.userRegist
	return { alert, isConfirm, errorMsg, userInfo }
}

export default connect(mapStateToProps)(UserRegist)