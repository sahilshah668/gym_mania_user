import axios from 'axios'

 import {GET_PROFILE,PROFILE_LOADING,GET_ERRORS,CLEAR_CURRENT_PROFILE,GET_PROFILES} from '../actions/types'

 export const getCurrentProfile = () => dispatch =>  {
        dispatch(setProfileLoading())
        axios.get('/useraccount')
         .then (result => dispatch({
             type:GET_PROFILE,
             payload:result.data
         }))
         .catch(err => dispatch({
             type:GET_PROFILE,
             payload: {}
         }))
 }

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
      .post('/useraccount', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  // Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};
// Get profile by handle
export const getProfileByHandle = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/useraccount/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};
  // Profile loading
  export const setProfileLoading = () => {
    return {
      type: PROFILE_LOADING
    };
  };
  
  // Clear profile
  export const clearCurrentProfile = () => {
    return {
      type: CLEAR_CURRENT_PROFILE
    };
  };
  