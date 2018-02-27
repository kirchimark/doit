import {post} from '../api';
import {push} from 'react-router-redux';

export const signup =  (email , password) => (dispatch) => {
    post('//localhost:3001/api/user/signup', {
        email,
        password,
    })
    .then(data => {
        console.log(data);
        localStorage.setItem('token' , data.token)
        localStorage.setItem('userId', data._id);
    })
    .catch(error => {
        console.log('error', error)
    })
}

export const login = (email , password) => (dispatch) => {
    post('//localhost:3001/api/user/login' , {
        email,
        password,
    })
    .then(data => {
        console.log('login ' , data);
        localStorage.setItem('token' , data.token)
        localStorage.setItem('userId', data._id);
    })
    .catch(error => {
        console.log('error' , error);
    })
}