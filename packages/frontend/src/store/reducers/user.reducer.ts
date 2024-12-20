import { GET_USER, GET_USER_SUCESS, GET_USER_FAILURE } from '../constants';

export let initialState = {
  data: null,
  loading: false,
  error: null,
};

const user = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_USER_SUCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default user;
