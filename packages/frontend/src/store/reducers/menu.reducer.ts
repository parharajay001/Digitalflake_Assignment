import { SET_MENU } from '../constants';

let intiState = {
  menu: [],
};

const MenusItems = (state = intiState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case SET_MENU:
      return {
        ...state,
        menu: action.payload,
      };
    default:
      return state;
  }
};

export default MenusItems;
