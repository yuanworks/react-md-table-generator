import React from 'react';
import { useSelector } from 'react-redux';

import * as TableSelectors from '../redux/selectors/TableSelectors';
import Row from './Row';

import '../styles/Table.scss';

export default function Table() {

  const rowCount = useSelector(TableSelectors.getRowCount());
  const rows = Array(rowCount+1).fill(0);

  return (
    <table className='editable'>

      <tbody>
        <Row key='delete-row' deleteRow />
        { rows && rows.map((_, i) => (
          <Row key={i} rowIndex={i} />
        ))}
      </tbody>
    </table>
  )
};
