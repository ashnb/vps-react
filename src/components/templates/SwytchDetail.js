import React from 'react'
import { connect } from 'react-redux'

import { detail } from 'ducks/swytchDetail'

import SwytchMenuContainer from './SwytchDetail/Menu'

import Alert from 'components/molecules/Alert'

class SwytchDetail extends React.Component {
	componentWillMount () {
		this.props.dispatch(detail(this.props.swytchId))
	}

	render () {
		return (
			<div>
				{this.props.isRequesting &&
					<div>読み込み中</div>
				}
				{!this.props.isRequesting && !this.props.swytch  &&
					<div>データがありません</div>
				}
				{!this.props.isRequesting && this.props.swytch &&
				<span>
				<SwytchMenuContainer />
				<div className="row">
					<div className="col-xs-12">
					<div className="box">
						<div className="box-header">
						<h3 className="box-title">スイッチ情報</h3>
						</div>
						<div className="box-body">
						<table className="table table-striped">
							<tbody>
							<tr><td>名前</td><td>{this.props.swytch.name}</td></tr>
							<tr><td>接続台数</td><td>{this.props.swytch.link_qty}台{/*<br /><a href="">接続中のサーバ一覧へ</a>*/}</td></tr>
							</tbody>
						</table>
						</div>
					</div>
					</div>
					
					{this.props.alert && 
					<div className="col-xs-12">
					<Alert type={this.props.alert.type} icon={this.props.alert.icon} message={this.props.alert.message} />
					</div>
					}
				</div>
				</span>
				}
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	const { isRequesting, alert } = state.swytchDetail
	return {
		swytch: state.swytchDetail.data ? state.swytchDetail.data.switch : null,
		swytchId: parseInt(ownProps.match.params.id, 10),
		isRequesting, alert
	}
}

export default connect(mapStateToProps)(SwytchDetail)