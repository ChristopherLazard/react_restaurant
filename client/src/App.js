import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Menu from './components/Menu';
import ProductForm from './components/ProductForm';
import Login from './components/Login';
import { Segment } from 'semantic-ui-react';


const App = () => (

  <Segment>
  <Navbar />
   <Route exact path="/" component={Home} />
   <Route exact path="/about" component={About} />
   <Route exact path='/login' component={Login} />
   <ProtectedRoute exact path='/menu' component={Menu} />
  
  </Segment>
);

export default App;