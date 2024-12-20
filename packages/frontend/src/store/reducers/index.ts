import { combineReducers } from 'redux';
import MenusItems from './menu.reducer';
import Routes from './routes.reducer';
import Toast from './toast.reducer';
import { Loader } from './loader.reducer';
import User from './user.reducer';

const rootReducer = combineReducers({
  // Add your reducers here
  MenusItems,
  Routes,
  Toast,
  Loader,
  User
});

export default rootReducer;
