import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Index from './layout'
import Login from './layout/login'

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component = { Login } />
      {/* <Route path="/" component = { Index } /> */}
      <Route path = "/" render= { () => {
        return sessionStorage.getItem('loginState') === 'true' ? <Index /> : <Redirect to="/login" />
      }} />
    </Switch>
  </Router>
);

export default App;
