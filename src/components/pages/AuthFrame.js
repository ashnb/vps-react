import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { auth } from 'ducks/auth'

import MainHeader from './AuthFrame/MainHeader'
import MainSidebar from './AuthFrame/MainSideMenu'
import MainFooter from './AuthFrame/MainFooter'

class AuthFrame extends React.Component {
	componentWillMount () {
		this.props.dispatch(auth())
	}

	componentDidMount() {
		//力技。。。
		setTimeout(function() {
			const body = document.querySelector('body')
			const script = document.createElement('script')
			script.setAttribute("src","/library/adminlte/dist/js/app.min.js")
			body.appendChild(script)
			body.className = 'test hold-transition skin-blue sidebar-mini'
		},200)
	}

	render() {
		if (!this.props.isAuthed && !this.props.isRequesting) {
			return <Redirect to={{ pathname: '/login' }} />
		}
		if (Object.keys(this.props.user).length === 0) {
			return null
		}

		return (
		<div className="wrapper">
			<MainHeader user={this.props.user} />
			<MainSidebar />
			<div className="content-wrapper">
				{/*
				<section className="content-header">
					<h1><small>コーナータイトル</small></h1>
					<ol className="breadcrumb">
						<li><a href=""><i className="fa fa-dashboard"></i> Level</a></li>
						<li className="active">Here</li>
					</ol>
				</section>
				*/}
				<section className="content">
				{this.props.children}
				</section>
			</div>
			<MainFooter />
			
			<script src="/library/adminlte/dist/js/app.js"></script>
		</div>
		)
	}
}
function mapStateToProps(state) {
	const { isAuthed, isRequesting, user } = state.auth
	return { isAuthed, isRequesting, user }
}

export default connect(mapStateToProps)(AuthFrame)