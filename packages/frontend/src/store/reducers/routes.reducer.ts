import { PUBLIC_ROUTES, PRIVATE_ROUTES } from '../constants';

let intiState = {
  publicRoutes: [],
  privateRoutes: [],
};

const Routes = (state = intiState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case PRIVATE_ROUTES:
      return {
        ...state,
        privateRoutes: action.payload,
      };
    case PUBLIC_ROUTES:
      return {
        ...state,
        publicRoutes: action.payload,
      };
    default:
      return state;
  }
};

export default Routes;
