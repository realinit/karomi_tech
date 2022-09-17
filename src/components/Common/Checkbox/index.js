import React, { Component, Fragment } from "react";
import './style.less';

class Checkbox extends Component {
	constructor(props) {
		super(props);
		this.handleCheck = this.handleCheck.bind(this);
	}

	handleCheck = (e, value, extraProps) => {
		if (typeof this.props.handleCheck === 'function')
			this.props.handleCheck(e, value, extraProps);
	};

	render() {
		const {
			id = '', value = '', displayLabel = '',
			extraProps = {}, className = '', readOnly = false,
			defaultChecked = false
		} = this.props;
		return (
			<Fragment>
				<input
					type="checkbox"
					id={id}
					className="al-checkfield"
					onClick={e => this.handleCheck(e, value, extraProps)}
					readOnly={readOnly}
					defaultChecked={defaultChecked}
				/>
				<label htmlFor={id} className={`al-label ${className}`}>
					<div className="al-indiv">
						<i className="fa fa-check" />
					</div><span className="label_text">{displayLabel}</span>
				</label>
			</Fragment>
		)
	}
}

export default Checkbox;
