import React, { Fragment } from 'react';
import Cart from './page/Cart';
import Home from './page/Home';
import ListPr from './page/ListPr';
import Login from './page/Login';
import Product from './page/Product';
import Register from './page/Register';
import {BrowserRouter as Router,
    Switch,
    Route,
    Redirect,} from 'react-router-dom';
import Succes from './page/Succes';
import { useSelector } from 'react-redux';

const App = () => {
    const user=useSelector(state=>state.user.currentUser)

    return (
        <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/:category">
            <ListPr/>
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/success">
            <Succes/>
          </Route>
         
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
          <Register/>
        {/*     {user ? <Redirect to="/" /> : <Register />} */}
          </Route>
        </Switch>
      </Router>
    );
};

export default App;