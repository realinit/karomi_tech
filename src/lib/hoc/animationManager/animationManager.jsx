import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import Transition from 'react-transition-group/Transition';


const AnimationManager = () => {
    return class Animation extends Component {
        constructor(props) {
            super(props);
            this.state = {
                animating: false
            };
            this.stopAnimation = this.stopAnimation.bind(this);
        }

        componentWillReceiveProps(newProps) {
            if (!isEmpty(newProps.isToggle)) {
                this.setState({
                    animating: true
                }, this.stopAnimation);
            }
        }

        stopAnimation() {
            setTimeout(() => {
                this.setState({
                    animating: false
                });
            }, this.props.animationDuration);
        }

        componentDidMount() {
            if (this.props.isToggle || isEmpty(this.props.isToggle)) {
                this.setState({
                    animating: true
                }, this.stopAnimation);
            }
        }

        render() {
            const { zIndex = "" } = this.props;
            return (
                <div className="animation__container">
                    <Transition in={!this.state.animating} timeout={200} unmountOnExit>
                        {state => (
                            <div className={this.props.baseClass} style={{
                                width: '100%',
                                display: state == 'exited' ? 'none' : state === 'exiting' ? 'none' : 'block',
                                position: state == 'entered' ? 'relative' : 'absolute',
                                opacity: state === 'exited' ? 0 : state === 'exiting' ? 0 : state === 'entering' ? 0 : 1,
                                transform: state == 'entering' ? `translateX(-25%)` : state == 'exiting' ? 'translateX(-25%)' : state == "entered" ? '' : 'translateX(-25%)',
                                transition: 'all 0.5s linear',
                                zIndex: zIndex
                            }}>
                                {this.state.animating ? null : this.props.children}
                            </div>
                        )}
                    </Transition>
                </div>

            );
        }
    }
}

export default AnimationManager;
