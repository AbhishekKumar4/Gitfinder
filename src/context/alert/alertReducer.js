import {SET_ALERT, REMOVE_ALERT} from '../types'

export default (state, action) => {
    switch(action.type) {
        case SET_ALERT:
            return {
                ...state,
                user : action.payload
            }
        case REMOVE_ALERT :
            return null
        default :
            return state;
    }
}