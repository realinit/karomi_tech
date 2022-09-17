import React, { Component } from 'react';
import './switchButton.less';
import utility from '../../../utils/utility';



class SwitchButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            interval: 1,
            seconds: '00',
            minutes: '00'
        }
        this.handleChange = this.handleChange.bind(this);
        this.secondsRemaining;
        this.startCountDown = this.startCountDown.bind(this);
        this.tick = this.tick.bind(this);
        this.intervalHandle;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.interval != this.secondsRemaining && newProps.value == true) {
            this.secondsRemaining = newProps.interval * 60;
            clearInterval(this.intervalHandle);
            this.startCountDown();
        } else {
            this.secondsRemaining = 0
            clearInterval(this.intervalHandle);
        }
    }


    handleChange(e) {
        const { showprompt = false } = this.props;
        let interval = "1";
        if (showprompt && e.target.checked) {
            interval = prompt(`Note :- Auto Refresh Will be reset after refresh page.
            Enter Time Interval (In Min.) `, "1") || 1;
            if (interval <= 1) {
                utility.errorToaster("Interval can not be less then 1 Min. Default vaule 1 is given.", "3000", "warning");
            }
        }
        this.setState({
            value: e.target.checked,
            minutes: interval,
            interval
        });
        clearInterval(this.intervalHandle);
        this.props.onChange({ value: e.target.checked, time: interval });
        this.secondsRemaining = interval * 60;
        this.startCountDown();

    }
    tick() {
        let min = Math.floor(this.secondsRemaining / 60);
        let sec = this.secondsRemaining - (min * 60);
        this.setState({
            minutes: min,
            seconds: sec
        })
        if (min === 0 & sec === 0) {
            this.setState({
                minutes: `0${min}`,
                seconds: `0${sec}`
            })
            this.secondsRemaining = this.props.interval * 60;
            clearInterval(this.intervalHandle);
        }
        this.secondsRemaining--;
    }

    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    render() {
        return (
            <div className="button-switch clearfix">
                <div className="switch_label">{this.props.label}</div>
                <div className="switch_label">{this.state.minutes}:{this.state.seconds}</div>
                <div className="">
                    <input
                        type="checkbox"
                        id="switch-orange"
                        className="switch"
                        onChange={e => this.handleChange(e)}
                        checked={this.state.value}
                        value={this.state.value}
                    />
                    <label htmlFor="switch-orange" className="lbl-off">{this.props.offContent}</label>
                    <label htmlFor="switch-orange" className="lbl-on">{this.props.onContent}</label>
                </div>
            </div>
        )
    }
}

export default SwitchButton;