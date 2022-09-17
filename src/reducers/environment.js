import actionTypes from 'constants/ActionTypes';

const initialState = {
    height: 0,
    width: 0,
};

const environment = (state = initialState, action) => {
    try {
        switch (action.type) {
            case actionTypes.WINDOW_RESIZE:
                return {
                    ...state,
                    height: action.height,
                    width: action.width,
                };

            default:
                return state;
        }
    } catch (error) {
        return state;
    }
};

export default environment;
