import React from 'react';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login.js';

function App() {

  return (
    <main>
      <Switch>
        {/* Main page is register page for now */}
        <Route path="/" component={Register} exact />
        <Route path="/login" component={Login} exact />
      </Switch>
    </main>
  );
}

export default App;
