import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducer/reducer';
import connectToElectron from './actions/connectToElectron';

let store = createStore(reducer, applyMiddleware(thunk));

connectToElectron(store);

store.subscribe(() => {
  console.log(`state: ${JSON.stringify(store.getState())}`);
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Provider>,
document.getElementById('root'));
registerServiceWorker();
