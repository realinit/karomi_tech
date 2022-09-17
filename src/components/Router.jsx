import PropTypes from 'prop-types';
import React from 'react';


const propTypes = {
    routes: PropTypes.shape({}).isRequired,
};

const Router = ({ router, routes, paths }) => {
    const path = window.location.pathname.split('/')[1] || '';
    let Component = routes.default;

    if (path in routes) {
        Component = routes[path];
    }
    return <Component />;
};

Router.propTypes = propTypes;

export default Router;
