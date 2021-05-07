import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';

const App = () => <>
  <Router>
    <Switch>
      <Route path='/' component={ProductsPage} />
    </Switch>
  </Router>
</>

export default App;
