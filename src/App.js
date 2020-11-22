import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Main from './components/Main.js';
import Intro from './components/Intro.js';

function App() {

  return (
    <main>
      <Switch>
        {/* Main page is register page for now */}
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/main" component={Main} exact />
        <Route path="/intro" component={Intro} exact />
      </Switch>
    </main>
  );
 
}

export default App;
