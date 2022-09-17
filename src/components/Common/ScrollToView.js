import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';

export default (WrappedComponent) => {
    class ResetWindowScroll extends Component {
        componentDidUpdate = (prevProps) => {
            if (this.props.location !== prevProps.location) window.scrollTo(0, 130);
        }
        render = () => (<WrappedComponent {...this.props} />)
    }
    return withRouter(ResetWindowScroll);
}