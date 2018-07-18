import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// TODO: Add back RecordSelector in the root div once it's working.
//import RecordSelector from './components/RecordSelector';
import RecordViewerWrapper from './containers/RecordViewerWrapper';
import rootReducer from './reducers'
import rootSaga from './sagas/rootSaga'

// Root renderer for record viewer.
global.renderRoot = function(instanceUrl, accessToken, recordId, rootNode) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, {login:{instanceUrl, accessToken}, record:{recordId}}, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  ReactDOM.render(
    <Provider store={store}>
      <div>
        <RecordViewerWrapper />
      </div>
    </Provider>,
    rootNode);
}
