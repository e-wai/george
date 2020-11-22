import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Main from './components/Main.js';
import Intro from './components/Intro.js';
import Checkout from './components/Checkout.js';
import Success from './components/Success.js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

function App() {

  return (
    <main>
      <Switch>
        {/* Main page is register page for now */}
        <Route path="/" component={Register} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/main" component={Main} exact />
        <Route path="/intro" component={Intro} exact />
        <Route path="/checkout" component={Checkout} key={document.location.href} exact />
        <Route path="/success" component={Success} exact />
      </Switch>
    </main>
  );
 
}

export default App;
export {stripePromise};
