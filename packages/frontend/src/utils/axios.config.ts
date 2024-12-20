import axios from 'axios';
import { getAccessToken } from './helper';
import { store } from '../store/GlobalStore';
import { toast } from '../store/actions/toast.action';
export const API = axios;

API?.interceptors?.request.use(
  async function (config) {
    config.headers.Authorization = `Bearer ${await getAccessToken()}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API?.interceptors?.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      store.dispatch(toast('Invalid token taking to login page!', true, 3000, 'error'));
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    return Promise.reject(error);
  }
);
