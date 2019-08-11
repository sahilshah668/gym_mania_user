import axios from 'axios';

import {
    ADD_POST,GET_POST, POST_LOADING, GET_POSTS
} from './types'

export const addPost = postData => dispatch => {
    axios.post('/posts',postData) 
     .then(res => {
         dispatch({
             type:ADD_POST,
             payload: res.data
         })
     }).catch(err => {
         console.log(err)
     })
}

export const getPosts = () => dispatch => {
    dispatch(postLoading())
    axios.get('/posts') 
     .then(res => {
         dispatch({
             type:GET_POSTS,
             payload: res.data
         })
     }).catch(err => {
         console.log(err)
     })
}
export const getPost = id => dispatch => {
    dispatch(postLoading());
    axios
      .get(`/posts/${id}`)
      .then(res =>
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      ).catch(err => {
        console.log(err)
      })
      
  };
  
  
  // Add Like
  export const addLike = id => dispatch => {
    axios
      .post(`/likes/${id}`)
      .then(res => dispatch(getPosts()))
      .catch(err =>
        console.log(err)
      );
  };
  
  // Remove Like
  export const removeLike = id => dispatch => {
    axios
      .post(`/unlike/${id}`)
      .then(res => dispatch(getPosts()))
      .catch(err =>
        console.log(err)
      );
  };
  
export const postLoading =() =>  {
    return  {
        type:POST_LOADING
    }
}