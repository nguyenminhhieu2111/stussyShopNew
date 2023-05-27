import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from '../page/Home'
import ListPr from '../page/ListPr';
import Product from '../page/Product';
import Cart from '../page/Cart'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/listPr/:slug' component={Product}/>
            <Route path='/listPr' component={ListPr}/>
            <Route path='/Product' component={Cart}/>
        </Switch>
    );
};

export default Routes;