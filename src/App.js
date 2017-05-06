import ReactDOM from 'react-dom';
import React from 'react';
import Virtuoso from './Virtuoso';
import { Provider } from 'react-redux';
import Store from './Stores';

import './App.scss';

export function render() {
  ReactDOM.render(
    <Provider store={Store}>
      <Virtuoso/>
    </Provider>,
    document.getElementById('root')
  );
}

