import { TOAST } from '../constants';

export const toast = (msg: string, open?: boolean, duration?: number, type?: string, width?: string) => {
  return {
    type: TOAST,
    payload: {
      msg,
      open,
      duration,
      type,
      width,
    },
  };
};
