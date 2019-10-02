import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import Cell from './Cell';
import DeleteCell from './DeleteCell';

export default function Row({ rowIndex }) {

  const columnCount = useSelector(TableSelectors.getColumnCount());
  const columns = Array(columnCount+1).fill(0);
  
  return (
    <tr>
      <DeleteCell rowIndex={rowIndex} />
      { columns && columns.map((_, i) => (
        <Cell key={i} rowIndex={rowIndex} columnIndex={i} />
      ))}
    </tr>
  )
};
