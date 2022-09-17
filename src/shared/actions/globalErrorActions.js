import actionTypes from 'constants/ActionTypes';
import utility from "utils/utility";

export const emitGlobalError = (payload) => {
    return {
        type: actionTypes.ERROR_HANDLER.DISPLAY_ERROR_MESSAGE,
        payload
    };
}

export const removeGlobalError = (payload) => {
    return {
        type: actionTypes.ERROR_HANDLER.HIDE_ERROR_MESSAGE,
        payload
    };
}


export const emitPersistErrorAction = (payload) => {
    return {
        type: actionTypes.ERROR_HANDLER.PERSIST_GLOBAL_ERROR,
        payload
    };
}

export const removePersistError = (payload = {}) => {
    utility.hideErrorMessage();
    return {
        type: actionTypes.ERROR_HANDLER.REMOVE_PERSIST_ERROR,
        payload
    };
}