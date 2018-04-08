import React from 'react'

export class InputRadio extends React.Component {
	render () {
		return (
			<div className="form-group">
			<label className="col-sm-2 control-label">{this.props.title}</label>
			<div className="input-group">
			{this.props.dataList.map(data => {
				return (
				<div className="radio-inline" key={data}><label>
				<input type="radio" name={this.props.name} value={data} checked={this.props.checkedValue === data}
					onChange={e => this.props.changed(e)} />
				{data}{this.props.unit}
				</label></div>
				)
			})}
			</div>
			</div>
		)
	}
}

export class InputText extends React.Component {
	render () {
		return (
			<div className="form-group">
			<label className="col-sm-2 control-label">{this.props.title}</label>
			<div className="col-xs-3">
			<input type="text" name={this.props.name} className="form-control" placeholder={this.props.title}
				value={this.props.defaultValue} onChange={e => this.props.changed(e)} />
			</div>
			</div>
		)
	}
}

export class InputView extends React.Component {
	render () {
		return (
			<div className="form-control-static">
			<div className="col-sm-3"><b>{this.props.title}</b></div>
			{this.props.value}{this.props.unit}
			</div>
		)
	}
}