import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const storeTemp = store();

console.log("Store Temp in index.js : ");
console.log(storeTemp);

root.render(  
    <Provider store={storeTemp}>
      <App />
    </Provider>  
);

