import fs from 'fs';
import express from 'express';
import path from 'path';

import React from 'react'
import { renderToString } from 'react-dom/server'

import { Router, RouterContext, match } from 'react-router';
import routes from './src/routes/routing';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import promiseMiddleware from './src/middlewares/PromiseMiddleware';
import combinedReducers from './src/reducers';

import fetchComponentData from './src/utils/fetchComponentData';

const finalCreateStore = applyMiddleware(promiseMiddleware)( createStore );

const app = express();

app.use(express.static('public'),express.static('build'));

// server rendering
app.use( ( req, res, next ) => {

  const store = finalCreateStore(combinedReducers);

  // react-router
  match( {routes, location: req.url}, ( error, redirectLocation, renderProps ) => {

    if ( error )
      return res.status(500).send( error.message );

    if ( redirectLocation )
      return res.redirect( 302, redirectLocation.pathname + redirectLocation.search );

    if ( renderProps == null ) {
      return res.status(404).send( 'Not found' );
    }
    // this is where universal rendering happens,
    // fetchComponentData() will trigger actions listed in static "needs" props in each container component
    // and wait for all of them to complete before continuing rendering the page,
    // hence ensuring all data needed was fetched before proceeding
    //
    // renderProps: contains all necessary data, e.g: routes, router, history, components...
    fetchComponentData( store.dispatch, renderProps.components, renderProps.params)

      .then(() => renderFullPage(
          renderToString((
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          )),
          JSON.stringify(store.getState())
        )
      )

      .then( page => res.status(200).send(page) )

      .catch( err => res.end(err.message) );
  })
})


function renderFullPage(html, initialState) {
  return `
    <!doctype html>
      <html lang="utf-8">
        <head>
        <title>Universal Redux Example</title>
          <link rel="shortcut icon" type="image/png" href="assets/images/react.png">
          <!--link rel="stylesheet" href="/assets/css/uikit.almost-flat.min.css"-->
        </head>
        <body>
          <div class="container">${html}</div>
          <script>window.$REDUX_STATE = ${initialState}</script>
          <script src="/app.js"></script>
        </body>
      </html>
    `
}

// example of handling 404 pages
app.get('*', function(req, res) {
  res.status(404).send('Server.js > 404 - Page Not Found');
})

// global error catcher, need four arguments
app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log( 'uncaughtException: ', evt );
})

app.listen(3000, function(){
  console.log('Listening on port 3000');
});


