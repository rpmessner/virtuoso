import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter as Router, routerReducer, routerMiddleware, push } from 'react-router-redux';

import { Route } from 'react-router-dom';
import { InitialState } from './Defaults';

import reducers from './reducers';
import pages from './pages';


const history = createHistory();

const middleware = routerMiddleware(history);

const reducerHash = {...reducers, router: routerReducer};

const reducer = combineReducers(reducerHash, applyMiddleware(middleware));

const Store = createStore(reducer);

export function render() {
  ReactDOM.render(
    <div className="virtuoso">
      <Provider store={Store}>
        <Router history={history}>
          <Route exact path="/" component={pages.ChordSelect}/>
        </Router>
      </Provider>
    </div>,
    document.getElementById('root')
  );
}

