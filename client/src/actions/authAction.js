import axios from 'axios'
import {GET_ERRORS,SET_CURRENT_USER} from '../actions/types'
import setAuthToken from '../utils/setAuthToken'
import  jwt_decode  from 'jwt-decode'
export const registerUser = (userData,history) => dispatch  =>  {
    axios.post('/register',userData)
    .then(result => history.push('/login'))
    .catch(err => 
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

export const LoginUser = userData => dispatch => {
        axios.post('/',userData)
         .then(result => {
             const {token} = result.data

             //set localstorage
             localStorage.setItem('jwtToken',token)

             //set header auth
             setAuthToken(token)
             const decoded = jwt_decode(token)
             dispatch(setCurrentUser(decoded))
         })
         .catch(err =>  dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

export const setCurrentUser = decoded => {
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
}

export const LogoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch( setCurrentUser({}))
}