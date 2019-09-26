import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import Cell from './Cell';

export default function Row({ rowIndex }) {

  const columnCount = useSelector(TableSelectors.getColumnCount());
  const columns = Array(columnCount).fill(0);
  
  return (
    <div className='row'>
      { columns && columns.map((_, i) => (
        <Cell key={i} rowIndex={rowIndex} columnIndex={i} />
      ))}
    </div>
  )
};
