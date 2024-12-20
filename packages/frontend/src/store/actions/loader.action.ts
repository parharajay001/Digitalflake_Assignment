import { LOADER } from "../constants";

export const loader = (payload: boolean) => {
  return {
    type: LOADER,
    payload,
  };
};
