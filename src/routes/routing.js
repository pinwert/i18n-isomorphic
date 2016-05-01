import React from 'react'
import {Route} from 'react-router'
import PruebaApp from '../components/PruebaApp';
import Container from '../components/Container';
import NotFound from '../components/NotFound';

export default (
  <Route component={PruebaApp}>
    <Route path="/"
      components={{main: Container}} />
    <Route path="*"
      components={{main: NotFound}} />
  </Route>
)
