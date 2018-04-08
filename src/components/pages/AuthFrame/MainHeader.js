import React from 'react'
import { Link } from 'react-router-dom'

export default class MainHeader extends React.Component {
	render () {
		const user = this.props.user
		return (
			<header className="main-header">
				<span className="logo">
				<span className="logo-mini">iVPS</span>
				<span className="logo-lg"><b>iVPS</b></span>
				</span>
				
				<div className="navbar navbar-static-top" role="navigation">
					<a href="" className="sidebar-toggle" data-toggle="offcanvas" role="button">
					<span className="sr-only">Toggle navigation</span>
					</a>
					
					<div className="navbar-custom-menu">
					<ul className="nav navbar-nav">
						<li className="user user-menu my-header-username">
						<span className="hidden-xs">{user.name}</span>
						</li>
						<li className="user user-menu">
						<a>
						<Link to="/logout" className="btn-sm btn-default">ログアウト</Link>
						</a>
						</li>
						{/*
						<li className="dropdown user user-menu">
						<a href="" className="dropdown-toggle" data-toggle="dropdown">
						<span className="hidden-xs">{user.name}</span>
						</a>
						<ul className="dropdown-menu">
							<li className="user-header">
							<p>{user.name}</p>
							<div className="pull-right">
							<Link to="/logout" className="btn btn-default btn-flat">ログアウト</Link>
							</div>
							</li>
							
							<li className="user-footer">
							<div className="pull-right">
							<a href="/logout" className="btn btn-default btn-flat">ログアウト</a>
							</div>
							</li>
							
						</ul>
						</li>
						*/}
						{/*
						<li>
						<a href="" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
						</li>
						*/}
					</ul>
					</div>
				</div>
			</header>
		)
	}
}

