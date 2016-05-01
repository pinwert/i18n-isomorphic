import React, { Component } from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import { Router, Route, RouterContext, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import {PruebaState} from './stores/pruebaStore';
import routes from './routes/routing';

var state = null;
if ( window.$REDUX_STATE ) {
  state = window.$REDUX_STATE;

  state.prueba = new PruebaState({
    datos: state.prueba.datos,
    locale: state.prueba.locale
  });
}

const store = configureStore( state )

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector( '.container' )
);
