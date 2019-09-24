import React from 'react';
import { useSelector } from 'react-redux';
import Cell from './Cell';

export default function Row({ rowIndex }) {

  const columns = useSelector(state => state.table.get('rows').get(rowIndex));

  return (
    <div className='row'>
      { columns && columns.map((_, i) => (
        <Cell key={i} rowIndex={rowIndex} columnIndex={i} />
      ))}
    </div>
  )
};
