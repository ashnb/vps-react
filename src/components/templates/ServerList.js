import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { list } from 'ducks/serverList'

class ServerList extends React.Component {
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
			{!this.props.isRequesting && this.props.serverList.length === 0  &&
				<div>
					<p>サーバが作成されていません</p>
					<p><Link to="/server/create">→サーバの追加へ</Link></p>
				</div>
			}
			{!this.props.isRequesting && this.props.serverList.length > 0 &&
				<table className="table table-bordered table-hover">
				<thead><tr><th>ステータス</th><th>サーバ名</th><th>CPU</th><th>メモリ</th><th>ストレージ</th><th>インタフェース</th><th>詳細</th></tr></thead>
				<tbody>
				{this.props.serverList.map((server, i) => {
					return (
						<tr key={i}>
						<td>
							{server.status === 1 ?
								<span className="text-green"><i className="icon fa fa-check-circle"></i><b>稼働中</b></span>
								:
								<span className="text-red"><i className="icon fa fa-ban"></i><b>停止中</b></span>
							}
						</td>
						<td>{server.serv_name}</td><td>{server.serv_cpucore}コア</td><td>{server.serv_memory}GB</td>
						<td>{server.serv_storage}GB</td><td>{server.global_if.ipaddress}</td><td><Link to={'/server/'+server.id}>詳細</Link></td>
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
		isRequesting: state.serverList.isRequesting,
		serverList: state.serverList.data,
	}
}

export default connect(mapStateToProps)(ServerList)