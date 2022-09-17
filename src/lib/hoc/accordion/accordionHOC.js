import React from 'react';
import { isUndefined } from 'lodash';
import Helper from 'utils/helper';
import Constants from 'constants/FormModule';
import messageBus from 'utils/messageBus';
import './accordion.less';

const AccordionHOC = (
    WrappedView
) => {

    return class Accordion extends React.Component {

        /**
         * Constructor function.
         * Sets initial state and calls other functions to perform initialization steps.
         * @param props
         */
        constructor(props) {
            super(props);
            this.bindFunctions();
            this.state = {
                isOpen: this.props.defaultState
            };
            messageBus.on(Constants.EVENT.ACCORDION_SWITCH, this.handleAccordionSwitch, this);
        }

        /**
         * render function
         */
        render() {
            const _seletedClass = Helper.classNames('accordion', {
                'accordion__show': this.state.isOpen
            });
            const _data = { ...this.props.data, isOpen: this.state.isOpen, handleClick: this.handleClick };
            return (
                <li className={this.props.wrapperClass} ref={this.cacheNode}>
                    {WrappedView.head(_data)}
                    <div className={_seletedClass}>
                        {WrappedView.body(_data)}
                    </div>
                </li>
            );
        }

        /**
         * Performs bindings for context resolution and avoid problems due to lexical scoping.
         */
        bindFunctions() {
            this.handleClick = this.handleClick.bind(this);
            this.handleOutsideClick = this.handleOutsideClick.bind(this);
            this.cacheNode = this.cacheNode.bind(this);
            this.handleAccordionSwitch = this.handleAccordionSwitch.bind(this);
        }

        /**
         * handles click on icon
         */
        handleClick() {
            this.setState(
                {
                    isOpen: !this.state.isOpen
                }
            );
        }

        /**
         * handle outside click
         */
        handleOutsideClick(event) {
            if (0 === this.el.querySelector(event.target).length && this.state.isOpen) {
                this.setState(
                    {
                        isOpen: false
                    }
                );
            }
        }

        /**
         * cache node
         */
        cacheNode(ref) {
            this.el = ref;
            if (!isUndefined(this.props.cacheNode)) {
                this.props.cacheNode(ref);
            }
        }

        handleAccordionSwitch(payload) {
            if (this.state.isOpen && payload.id !== this.props.data.id) {
                this.setState({
                    isOpen: false
                });
            } else if (!this.state.isOpen && payload.id === this.props.data.id) {
                this.setState({
                    isOpen: true
                });
            }
        }

    };
};
export default AccordionHOC;

