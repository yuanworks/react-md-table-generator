import React from 'react';
import { useDispatch } from 'react-redux';

import logo from './logo.svg';
import './App.scss';
import Table from './components/Table';
import MarkdownTable from './components/MarkdownTable';

import * as TableActions from './redux/actions/TableActions';
import { TABLE_SAMPLE } from './constants/TableConstants';

function App() {

  const dispatch          = useDispatch();
  const importSampleTable = () => dispatch(TableActions.importMarkdownTable(TABLE_SAMPLE));

  return (
    <div className="App">
      <Table />
      <MarkdownTable />
      <button onClick={importSampleTable}>Import Sample</button>
    </div>
  );
}

export default App;
