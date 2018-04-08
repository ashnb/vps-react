import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { list } from 'ducks/swytchList'

class SwytchList extends React.Component {
	componentWillMount () {
		this.props.dispatch(list())
	}

	render () {
		return (
			<div className="box">
			<div className="box-body">
			{this.props.isRequesting &&
				<div>読み込み中</div>
			}
			{!this.props.isRequesting && this.props.swytchList.length === 0  &&
				<div>
					<p>スイッチが作成されていません</p>
					<p><Link to="/switch/create">→スイッチの追加へ</Link></p>
				</div>
			}
			{!this.props.isRequesting && this.props.swytchList.length > 0 &&
				<table className="table table-bordered table-hover">
				<thead><tr><th>スイッチ名</th><th>接続台数</th><th>詳細</th></tr></thead>
				<tbody>
				{this.props.swytchList.map((swytch, i) => {
					return (
						<tr key={i}>
						<td>{swytch.name}</td><td>{swytch.link_qty}台</td><td><Link to={'/switch/'+swytch.id}>詳細</Link></td>
						</tr>
					)
				})}
				</tbody>
				</table>
			}
			</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		isRequesting: state.swytchList.isRequesting,
		swytchList: state.swytchList.data,
	}
}

export default connect(mapStateToProps)(SwytchList)