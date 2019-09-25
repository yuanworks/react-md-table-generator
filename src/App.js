import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Table from './components/Table';
import MarkdownTable from './components/MarkdownTable';

function App() {
  return (
    <div className="App">
      <Table />
      <MarkdownTable />
    </div>
  );
}

export default App;
