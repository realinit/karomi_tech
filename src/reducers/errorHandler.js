import actionTypes from 'constants/ActionTypes';
const initialState = {
    fetching: false,
    errors: null,
    success: null,
    persistError: null
};

export const errorHandler = (state = initialState, action) => {
    try {
        const { type, payload, status } = action;
        const { errors = [], success = true } = payload;
        switch (type) {
            case actionTypes.ERROR_HANDLER.DISPLAY_ERROR_MESSAGE: {
                return {
                    ...state,
                    success,
                    errors,
                    persistError: null
                };
            }
            case actionTypes.ERROR_HANDLER.HIDE_ERROR_MESSAGE: {
                return {
                    ...state,
                    success,
                    errors: null,
                    persistError: null
                };
            }
            case actionTypes.ERROR_HANDLER.PERSIST_GLOBAL_ERROR: {
                return {
                    ...state,
                    success,
                    errors: null,
                    persistError: payload.persistError
                };
            }
            case actionTypes.ERROR_HANDLER.REMOVE_PERSIST_ERROR: {
                return {
                    ...state,
                    success,
                    errors: null,
                    persistError: null
                };
            }
            case actionTypes.ERROR_HANDLER.PERSIST_GLOBAL_ERROR: {
                return {
                    ...state,
                    success,
                    errors: null,
                    persistError: payload.persistError
                };
            }
            case actionTypes.ERROR_HANDLER.REMOVE_PERSIST_ERROR: {
                return {
                    ...state,
                    success,
                    errors: null,
                    persistError: null
                };
            }
        }
        return state;
    } catch (error) {
        return state;
    }
}
export default errorHandler;