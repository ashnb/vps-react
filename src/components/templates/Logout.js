import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from 'ducks/auth'

import BoxFrame from 'components/pages/BoxFrame'

class Logout extends React.Component {
	componentWillMount () {
		this.props.dispatch(logout())
	}

	render () {
		let msg;
		if (!this.props.isAuthed) {
			msg = 'ログアウトしました。'
		} else {
			msg = 'ログアウトに失敗しました。'
		}
		return (
			<BoxFrame>
				<p className="login-box-msg">{msg}</p>
				<br />
				<Link to="/login" className="text-center">ログインはこちら</Link>
			</BoxFrame>
		)
	}
}

function mapStateToProps(state) {
	const { isAuthed } = state.auth
	return { isAuthed }
}

export default connect(mapStateToProps)(Logout)