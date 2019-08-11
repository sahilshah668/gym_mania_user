import axios from 'axios';

import {GET_CURRENT_GYM_PROFILE,GET_GYM_PROFILES,GYM_PROFILE_LOADING} from './types'

export const getGymProfiles = () => dispatch => {
    dispatch(setProfileLoading())

    axios.get('/gymfinder')
     .then(res => {
         dispatch({
             type:GET_GYM_PROFILES,
             payload:res.data
         })
         console.log(res.data)
     }).catch(err => {
         console.log(err)
     })
}

export const getGymProfileDetail = id => dispatch => {
    dispatch(setProfileLoading())
     axios.get(`/gymfinder/${id}`)
      .then(res => {
          dispatch({
              type:GET_CURRENT_GYM_PROFILE,
              payload:res.data
          })
      }).catch(err => {
        console.log(err)
      })
}

export const setProfileLoading = () =>  {
    return {
        type:GYM_PROFILE_LOADING
    }
}