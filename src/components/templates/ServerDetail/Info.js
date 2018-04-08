import React from 'react'

export class ServerIfaces extends React.Component {
	render() {
		return (
			<div className="col-xs-12">
			<div className="box">
				<div className="box-header">
				<h3 className="box-title">ネットワークインターフェース</h3>
				</div>
				<div className="box-body">
				<table className="table table-striped">
				<tbody>
				<tr><th>名前</th><th>MACアドレス</th><th>接続先</th></tr>
				{this.props.ifaces.map((iface, i) => {
					return (
						<tr key={i}>
						<td>{iface.ifname}</td><td>{iface.macaddress}</td><td>{iface.switch_name}</td>
						</tr>
					)
				})}
				</tbody>
				</table>
				</div>
			</div>
			</div>
		)
	}
}

export class ServerGlobalIface extends React.Component {
	render() {
		const iface = this.props.iface
		return (
			<div className="col-md-6">
			<div className="box">
				<div className="box-header">
				<h3 className="box-title">IPv4</h3>
				</div>
				<div className="box-body no-padding">
				<table className="table table-striped">
				<tbody>
				<tr><td>アドレス</td><td>{iface.ipaddress}</td></tr>
				<tr><td>ゲートウェイ</td><td>{iface.gateway}</td></tr>
				<tr><td>ネットマスク</td><td>{iface.netmask}</td></tr>
				<tr><td>プライマリDNS</td><td>{iface.dns_primary}</td></tr>
				</tbody>
				</table>
				</div>
			</div>
			</div>
		)
	}
}

export class ServerInfo extends React.Component {
	render() {
		const server = this.props.server
		return (
			<div className="col-md-6">
			<div className="box">
				<div className="box-header">
				<h3 className="box-title">サーバ情報</h3>
				</div>
				<div className="box-body no-padding">
				<table className="table table-striped">
				<tbody>
				<tr><td>名前</td><td id="serv_name">{server.serv_name}</td></tr>
				<tr><td>メモリ</td><td>{server.serv_memory}GB</td></tr>
				<tr><td>ストレージ</td><td>{server.serv_storage}GB</td></tr>
				<tr><td>CPU</td><td>{server.serv_cpucore}コア</td></tr>
				</tbody>
				</table>
				</div>
			</div>
			</div>
		)
	}
}