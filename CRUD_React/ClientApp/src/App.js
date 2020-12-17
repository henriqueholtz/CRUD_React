import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchProduct } from './components/FetchProduct';
import { AddProduct } from './components/AddProduct';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
            <Route path='/fetch-product' component={FetchProduct} />
            <Route path='/add-product' component={AddProduct} />
            <Route path='/product/edit/:id' component={AddProduct} />
      </Layout>
    );
  }
}
