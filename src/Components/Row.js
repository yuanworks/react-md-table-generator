import React from 'react';
import { useSelector } from 'react-redux';
import * as tableSelectors from '../redux/selectors/tableSelectors';
import Cell from './Cell';

export default function Row({ rowIndex }) {

  const columnCount = useSelector(tableSelectors.getColumnCount());
  const columns = Array(columnCount).fill(0);
  
  return (
    <div className='row'>
      { columns && columns.map((_, i) => (
        <Cell key={i} rowIndex={rowIndex} columnIndex={i} />
      ))}
    </div>
  )
};
