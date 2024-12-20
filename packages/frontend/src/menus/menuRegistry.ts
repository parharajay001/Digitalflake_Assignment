import { City_Icon, Home_Icon, State_Icon, Warehouse_Icon } from '../assets/icons';
import { CITY, HOME, STATE, WAREHOUSE } from '../routes/CONSTANTS';
import { ISideMenuItem } from '../types';

export const MenuItems: ISideMenuItem[] = [
  {
    title: 'Home',
    key: 'home',
    link: HOME,
    Icon: Home_Icon,
  },
  {
    title: 'State',
    key: 'state',
    link: STATE,
    Icon: State_Icon,
  },
  {
    title: 'City',
    key: 'city',
    link: CITY,
    Icon: City_Icon,
  },
  {
    title: 'Warehouse',
    key: 'warehouse',
    link: WAREHOUSE,
    Icon: Warehouse_Icon,
  },
];
