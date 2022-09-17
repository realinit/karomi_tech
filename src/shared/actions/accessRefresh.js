import actionTypes from 'constants/ActionTypes';

export const refreshNavigation = (response) => {
    return {
        type: actionTypes.LEFT_NAV,
        payload: response
    }
}

export const subNavigation = (response) => {
    return {
        type: actionTypes.SUB_NAV,
        payload: response
    }
}
