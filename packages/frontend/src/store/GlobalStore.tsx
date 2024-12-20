import rootReducer from './reducers';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';

export const store = createStore(rootReducer as any, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
const GlobalStore: React.FC<{ children: any }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default GlobalStore;
