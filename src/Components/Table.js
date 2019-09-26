import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function Table() {

  const rowCount = useSelector(TableSelectors.getRowCount());
  const rows = Array(rowCount).fill(0);

  return (
    <div className='table'>
      { rows && rows.map((row, i) => (
        <Row key={i} rowIndex={i} />
      ))}
    </div>
  )
};
