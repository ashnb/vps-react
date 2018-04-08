import React from 'react'
import { connect } from 'react-redux'

import { logList } from 'ducks/logList'

class EventLog extends React.Component {
	componentWillMount () {
		this.props.dispatch(logList())
	}

	render () {
		return (
			<div className="box">
			<div className="box-body">
			{this.props.isRequesting &&
				<div>読み込み中</div>
			}
			{!this.props.isRequesting && this.props.logList.length === 0  &&
				<div>
					<p>操作履歴はありません</p>
				</div>
			}
			{!this.props.isRequesting && this.props.logList.length > 0 &&
				<table className="table table-bordered table-hover">
				<thead><tr><th>日時</th><th>接続元</th><th>種別</th><th>内容</th></tr></thead>
				<tbody>
				{this.props.logList.map((log, i) => {
					return (
						<tr key={i}>
						<td>{log.create_time}</td><td>{log.sourceip}</td><td>{log.type_name}</td><td>{log.description}</td>
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
		isRequesting: state.logList.isRequesting,
		logList: state.logList.data,
	}
}

export default connect(mapStateToProps)(EventLog)