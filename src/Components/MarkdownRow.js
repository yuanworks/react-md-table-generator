import React from 'react';
import { useSelector } from 'react-redux';
import MarkdownCell from './MarkdownCell';

export default function MarkdownRow({ rowIndex }) {

  let columnCount = useSelector(state => state.table.get('columnCount'));
  
  const columns = Array(columnCount).fill().map((_, i) => (
    <MarkdownCell key={i} rowIndex={rowIndex} columnIndex={i} />
  ));

  return (
    <div>
      { columns }
    </div>
  )
};
