import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import MarkdownCell from './MarkdownCell';

export default function MarkdownRow({ rowIndex }) {

  const columnCount = useSelector(TableSelectors.getColumnCount());
  
  const columns = Array(columnCount).fill().map((_, i) => (
    <MarkdownCell key={i} rowIndex={rowIndex} columnIndex={i} />
  ));

  return (
    <div>
      { columns }
    </div>
  )
};
