import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';


export const getProfiles = (profileData) => dispatch => {
      dispatch(setProfileLoading());
      axios.get('/useraccount/all',profileData)
       .then(res => dispatch({
         type:GET_PROFILES,
         payload:res.data
       }))

}

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/useraccount')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/useraccount', profileData)
    .then(res => history.push('/profile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editProfile = (profileData,history) => dispatch => {
  axios.put('/useraccount',profileData) 
   .then(res => history.push('/profile'))
   .catch(err => dispatch({
     type:GET_ERRORS,
     payload:err.response.data
   }))
}

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
