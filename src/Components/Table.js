import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';

export default function Table() {

  const rowCount = useSelector(state => state.table.get('rowCount'));
  const rows = Array(rowCount).fill(0);

  return (
    <div className='table'>
      { rows && rows.map((row, i) => (
        <Row key={i} rowIndex={i} />
      ))}
    </div>
  )
};
