import { SET_MENU } from '../constants';

export const setMenu = (payload: any) => {
  return {
    type: SET_MENU,
    payload,
  };
};
