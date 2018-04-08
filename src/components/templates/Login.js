import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { login, loginPre } from 'ducks/auth'

import BoxFrame from 'components/pages/BoxFrame'

class Login extends React.Component {
	constructor (props) {
		super(props)
		this.state = { user_id: '', password: '' }
	}

	componentWillMount () {
		this.props.dispatch(loginPre())
	}

	handleLogin() {
		this.props.dispatch(login(this.state.user_id, this.state.password))
	}

	render() {
		if (this.props.isAuthed) {
			return <Redirect to={{ pathname: '/server' }} />
		}
		const changed = (e) => this.setState({[e.target.name]: e.target.value})

		return (
			<BoxFrame>
			<p className="login-box-msg">ログイン</p>
			
			{this.props.errorMsg &&
				<div className="alert alert-danger alert-dismissible">
				<p><strong><i className="icon fa fa-ban"></i>内容を確認してください。</strong></p>
				<p>{this.props.errorMsg}</p>
				</div>
			}

			{this.props.isRequesting && 
				<div>ログイン中</div>
			}

			{!this.props.isRequesting && 
			<div>
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
			
			<div className="pull-right">
			<button className="btn btn-block btn-primary btn-flat" onClick={e => this.handleLogin() }>ログイン</button>
			</div>
			</div>
			}
			
			<br /><br />
			{/*<a href="">パスワードを忘れた方はこちら</a><br />*/}
			<Link to="/user/regist" className="text-center">会員登録はこちら</Link>
			</BoxFrame>
		)
	}
}
function mapStateToProps(state) {
	const { isAuthed, isRequesting, errorMsg } = state.auth
	return { isAuthed, isRequesting, errorMsg }
}

export default connect(mapStateToProps)(Login)