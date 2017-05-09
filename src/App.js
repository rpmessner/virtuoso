import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router, routerReducer, routerMiddleware } from 'react-router-redux';
import { Route } from 'react-router-dom';

import reducers from './reducers';
import pages from './pages';

import ModeSelector from './containers/ModeSelector';

const history = createHistory();

const middleware = routerMiddleware(history);

const reducerHash = {...reducers, router: routerReducer};

const reducer = combineReducers(reducerHash);

const Store = createStore(reducer, applyMiddleware(middleware));

export function render() {
  ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <div className="virtuoso">
          <ModeSelector/>
          <Route exact path="/" component={pages.ChordSelect}/>
          <Route path="/detector" component={pages.ChordDetect}/>
          <Route path="/selector" component={pages.ChordSelect}/>
        </div>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

