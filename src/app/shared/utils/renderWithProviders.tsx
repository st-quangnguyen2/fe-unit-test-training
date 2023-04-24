import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from '@app/app.reducers';
import appMiddleware from '../../app.middleware';
import { render, RenderOptions } from '@testing-library/react';

const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware));
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: typeof store;
}

const renderWithProviders = (
  ui: React.ReactElement,
  { 
    store = createStore(appReducer, applyMiddleware(middleware)),
    ...renderOptions 
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => {
    middleware.run(appMiddleware);
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithProviders;
