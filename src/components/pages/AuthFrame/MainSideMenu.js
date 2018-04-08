import React from 'react'
import { NavLink } from 'react-router-dom'

const MainSidebar = () => (
	<aside className="main-sidebar">
	<section className="sidebar">
	<ul className="sidebar-menu">
		<li className="header">サーバ</li>
		<li>
		<NavLink exact to={'/server'} activeClassName="active"><i className="fa fa-server"></i><span>サーバ一覧</span></NavLink>
		</li>
		<li>
		<NavLink exact to={'/server/create'} activeClassName="active"><i className="fa fa-plus-circle"></i><span>サーバ追加</span></NavLink>
		</li>
		<li className="header">スイッチ</li>
		<li>
		<NavLink exact to={'/switch'} activeClassName="active"><i className="fa fa-random"></i><span>スイッチ一覧</span></NavLink>
		</li>
		<li>
		<NavLink exact to={'/switch/create'} activeClassName="active"><i className="fa fa-plus-circle"></i><span>スイッチ追加</span></NavLink>
		</li>
		<li className="header">ログ</li>
		<li>
		<NavLink exact to={'/eventlog'} activeClassName="active"><i className="fa fa-floppy-o"></i><span>操作履歴</span></NavLink>
		</li>
	</ul>
	</section>
	</aside>
)

export default MainSidebar