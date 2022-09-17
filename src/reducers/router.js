import actionTypes from 'constants/ActionTypes';
import { INITIAL_ROUTE } from '../constants/RouterConstants';

const initialState = {
    route: { ...INITIAL_ROUTE },
};

const router = (state = initialState, action) => {
    try {
        switch (action.type) {
            case actionTypes.CHANGE_ROUTE:
                return {
                    ...state,
                    route: action.route,
                }
            case actionTypes.RESET_STATE_DATA:
                state = {};
                return state;
            case actionTypes.SAVE_UTM_DATA:
                return {
                    ...state,
                    utmData: action.utmData
                };

            default:
                return state;
        }
    } catch (error) {
        return state;
    }
};

export default router;
