import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './sass/App.scss'
import Layout from './components/Layout'
import Home from './page/Home'
import ListPr from './page/ListPr'
import Product from './page/Product'
import Login from './page/Login'
import Products from './components/Products'
import Register from './page/Register'
import Cart from './page/Cart'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import {store,persistor} from '../redux/store'
import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
   <App/>
  </PersistGate>
  </Provider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
