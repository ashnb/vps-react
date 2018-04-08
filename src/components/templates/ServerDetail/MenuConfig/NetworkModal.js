import React from 'react'
import Modal from 'components/molecules/Modal'
import Alert from 'components/molecules/Alert'

export default class NetworkModal extends React.Component {
	constructor (props) {
		super(props)
		this.state = { update_enable: false, swytch_dup: false }
	}

	componentWillMount() {
		this.initSelected()
	}

	initSelected () {
		this.props.ifaces.map((iface,key) => {
			const select_name = 'eth'+key
			const init_value = iface.id+'_'+iface.switch_id
			this.setState({ [select_name]: init_value, [select_name+'_default']: init_value })
			return true
		})
	}

	checkUpdated (e) {
		let is_updated = false
		if (e.target.value !== this.state[e.target.name+'_default']) {
			is_updated = true
		}
		this.props.ifaces.map((iface,key) => {
			const select_name = 'eth'+key
			if (select_name === e.target.name) return true

			if (this.state[select_name] !== this.state[select_name+'_default']) {
				is_updated = true
			}
			return true
		})
		return is_updated
	}

	checkDuplication (e) {
		let selected_swytches = []
		let is_dup = false

		const [, swytch_id] = e.target.value.split('_')
		if (swytch_id !== 0) { selected_swytches.push(swytch_id) }

		this.props.ifaces.map((iface,key) => {
			const select_name = 'eth'+key
			if (select_name === e.target.name) return true

			const [, swytch_id] = this.state[select_name].split('_')
			if (swytch_id !== 0) { selected_swytches.push(swytch_id) }
			return true
		})

		const dup_swytches = selected_swytches.filter((x, i, self) => {
			return self.indexOf(x) === i && i !== self.lastIndexOf(x)
		})
		if (dup_swytches.length > 0) {
			is_dup = true
		}
		return is_dup
	}

	changed(e) {
		let is_updated = false
		let is_dup = false
		is_updated = this.checkUpdated(e)
		if (is_updated) {
			is_dup = this.checkDuplication(e)
			if (is_dup) {
				is_updated = false
			}
		}
		this.setState({
			[e.target.name]: e.target.value,
			update_enable: is_updated,
			swytch_dup: is_dup
		})
	}

	update () {
		let data = []
		this.props.ifaces.map((iface,key) => {
			const select_name = 'eth'+key
			if (this.state[select_name] !== this.state[select_name+'_default']) {
				data.push(this.state[select_name])
			}
			return true
		})
		this.props.onUpdate(data)
	}

	render () {
		return (
			<Modal id="modal-network-update" title="ネットワーク接続">
				<div className="modal-body">
					{this.props.power_status === 0 &&
						<span>
						{this.props.ifaces.map((iface,key) => {
							const select_name = 'eth'+key
							return (
								<div className="form-group" key={key}>
								<label>eth{key} - {iface.macaddress}</label>
								<select className="form-control radius-sm interface_input" name={select_name}
									value={this.state.select_name} defaultValue={`${iface.id}_${iface.switch_id}`} onChange={e => this.changed(e)}>
									<option value={`${iface.id}_0`} key="0">{key===0 ? 'インターネット' : '接続しない'}</option>
									{this.props.swytchList.map((swytch,key) => {
										return (
											<option value={`${iface.id}_${swytch.id}`} key={swytch.id}>{swytch.name}</option>
										)
									})}
								</select>
								</div>
							)
						})}
						</span>
					}
					{this.props.power_status !== 0 &&
					<Alert type="alert-warning" icon="fa-warning" allowHide={false} title="サーバ未停止" message="サーバが停止していません。接続先の変更を行うにはサーバを停止してください。" />
					}
					{this.state.swytch_dup &&
					<Alert type="alert-warning" icon="fa-warning" allowHide={false} title="スイッチ選択エラー" message="複数のインターフェイスを同じスイッチに接続できません。別々のスイッチを選択してください。" />
					}
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-default pull-left" data-dismiss="modal">キャンセル</button>
					<button type="button" className="btn btn-primary" data-dismiss="modal" disabled={!this.state.update_enable} onClick={e => this.update() }>設定する</button>
				</div>
			</Modal>
		)
	}
	
}