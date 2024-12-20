import { API } from './axios.config';

export const loginUser = async (payload: any) => {
  try {
    return await API.post(`${process.env.REACT_APP_BACKEND_BASE_URL}auth/login`, payload);
  } catch (e) {
    return e;
  }
};
