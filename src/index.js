import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Provider } from 'react-redux';
import { store } from "./utilities/Store"
import { setToken } from "./utilities/Slice";

import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Chargement initial du token depuis le localStorage
const storedToken = localStorage.getItem('token');
if (storedToken) {
    store.dispatch(setToken(storedToken));
}


root.render(
    <Provider store={store}>
        <App />
    </Provider>
);