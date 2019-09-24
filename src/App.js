import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Cell from './Components/Cell';

function App() {
  return (
    <div className="App">
      <div className='table'>
        <div className='row'>
          <Cell initialValue='hi' />
          <Cell initialValue='hi' />
          <Cell initialValue='hi' />
          <Cell initialValue='hi' />
        </div>

        <div className='row'>
          <Cell initialValue='hi' />
          <Cell initialValue='hi' />
          <Cell initialValue='hi' />
          <Cell initialValue='hi' />
        </div>
      </div>
    </div>
  );
}

export default App;
