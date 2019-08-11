import {GYM_PROFILE_LOADING,GET_CURRENT_GYM_PROFILE,GET_GYM_PROFILES} from '../actions/types'
const initialState = {
    gym:null,
    gyms:null,
    loading:false
}

export default function (state = initialState,action) {
    switch(action.type){
       case GYM_PROFILE_LOADING:
        return {
            ...state,
            loading:true
        }
        case GET_GYM_PROFILES:
        return {
            ...state,
            gyms:action.payload,
            loading:false
        }
        case GET_CURRENT_GYM_PROFILE:
            return {
                ...state,
                gym:action.payload,
                loading:false
            }
       
        default:
         return state
    }
}