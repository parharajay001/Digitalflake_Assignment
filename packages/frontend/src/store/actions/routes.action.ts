import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../constants';

export const setPublicRoutes = (payload: any) => {
  return {
    type: PUBLIC_ROUTES,
    payload,
  };
};

export const setPrivateRoutes = (payload: any) => {
  return {
    type: PRIVATE_ROUTES,
    payload,
  };
};
