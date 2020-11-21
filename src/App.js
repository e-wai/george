import './App.css';
import SignupModalComponent from './components/SignupModalComponent';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SignupModalComponent/>
        </header>
      </div>
    );
  }
}

export default App;
