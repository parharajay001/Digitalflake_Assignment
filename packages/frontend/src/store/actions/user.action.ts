import { GET_USER, GET_USER_SUCESS, GET_USER_FAILURE } from '../constants';
import { API } from '../../utils/axios.config';
import { loader } from './loader.action';

export const getUser = () => {
  return {
    type: GET_USER,
  };
};

export const getUserSucess = (payload: any) => {
  return {
    type: GET_USER_SUCESS,
    payload,
  };
};

export const getUserFailure = (error: any) => {
  return {
    type: GET_USER_FAILURE,
    payload: error,
  };
};

const getUserDetail = () => {
  return API.get(`${process.env.REACT_APP_BACKEND_BASE_URL}user/profile`);
};

export function fetchUser() {
  return (dispatch: any) => {
    dispatch(getUser());
    dispatch(loader(true));
    const rowUserString = localStorage.getItem('user');
    let user = null;
    if (rowUserString && rowUserString !== 'undefined') {
      user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    if (!user || Object.keys(user).length === 0) {
      getUserDetail()
        .then(async (response) => {
          const userData = {
            ...response.data,
          };
          dispatch(getUserSucess(userData));
          localStorage.setItem('user', JSON.stringify(userData));
          dispatch(loader(false));
        })
        .catch((error) => {
          dispatch(loader(false));
          dispatch(getUserFailure(error));
        });
    } else {
      dispatch(getUserSucess(user));
      dispatch(loader(false));
    }
  };
}
