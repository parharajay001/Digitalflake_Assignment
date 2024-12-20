import AddCity from '../pages/City/AddCity/AddCity';
import City from '../pages/City/City';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import AddState from '../pages/State/AddState/AddState';
import State from '../pages/State/State';
import AddWarehouse from '../pages/Warehouse/AddWarehouse/AddWarehouse';
import Warehouse from '../pages/Warehouse/Warehouse';
import { IRoute } from '../types';
import { ADD_CITY, ADD_STATE, ADD_WAREHOUSE, CITY, EDIT_CITY, EDIT_STATE, EDIT_WAREHOUSE, HOME, LOGIN, STATE, WAREHOUSE } from './CONSTANTS';

export const publicRoutes: IRoute[] = [{ uniqueKey: 'login', path: LOGIN, component: Login }];
export const privateRoutes: IRoute[] = [
  { uniqueKey: 'home', path: HOME, component: Home },
  { uniqueKey: 'state', path: STATE, component: State },
  { uniqueKey: 'state-add', path: ADD_STATE, component: AddState },
  { uniqueKey: 'state-edit', path: EDIT_STATE, component: AddState },
  { uniqueKey: 'city', path: CITY, component: City },
  { uniqueKey: 'city-add', path: ADD_CITY, component: AddCity },
  { uniqueKey: 'city-edit', path: EDIT_CITY, component: AddCity },
  { uniqueKey: 'warehouse', path: WAREHOUSE, component: Warehouse },
  { uniqueKey: 'warehouse-add', path: ADD_WAREHOUSE, component: AddWarehouse },
  { uniqueKey: 'warehouse-edit', path: EDIT_WAREHOUSE, component: AddWarehouse },
];
