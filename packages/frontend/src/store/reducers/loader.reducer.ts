import { LOADER } from '../constants';

let initialState = { loader: false };

export const Loader = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case LOADER:
      return { ...state, loader: action.payload };
    default:
      return state;
  }
};
