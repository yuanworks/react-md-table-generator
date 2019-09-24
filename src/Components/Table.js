import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';

export default function Table() {

  const rows = useSelector(state => state.table.get('rows'));

  return (
    <div className='table'>
      { rows && rows.map((row, i) => (
        <Row key={i} rowIndex={i} />
      ))}
    </div>
  )
};
