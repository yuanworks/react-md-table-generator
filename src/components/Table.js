import React from 'react';
import { useSelector } from 'react-redux';
import Column from './Column';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function Table() {

  const columnCount = useSelector(TableSelectors.getColumnCount());
  const columns = Array(columnCount).fill(0);

  return (
    <div className='table'>
      { columns && columns.map((_, i) => (
        <Column key={i} columnIndex={i} />
      ))}
    </div>
  )
};
