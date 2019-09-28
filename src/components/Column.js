import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import Cell from './Cell';

export default function Column({ columnIndex }) {

  const rowCount = useSelector(TableSelectors.getRowCount());
  const rows = Array(rowCount).fill(0);
  
  return (
    <div className='column'>
      { rows && rows.map((_, i) => (
        <Cell key={i} columnIndex={columnIndex} rowIndex={i} />
      ))}
    </div>
  )
};
