import { TOAST } from '../constants';

interface IToast {
  open: boolean;
  duration: number;
  type: string;
  width: string | number;
  msg: string;
}

let intiState = {
  open: false,
  duration: 5000,
  type: 'success',
  width: '100%',
  msg: '',
};

const toast = (state = intiState, action: { type: string; payload: IToast }) => {
  switch (action.type) {
    case TOAST:
      return {
        ...state,
        ...action.payload,
        open: action.payload.open,
        duration: action.payload.duration ? action.payload.duration : state.duration,
        type: action.payload.type ? action.payload.type : state.type,
        width: action.payload.width ? action.payload.width : state.width,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export default toast;
