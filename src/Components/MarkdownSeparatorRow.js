import React from 'react';
import { useSelector } from 'react-redux';
import MarkdownSeparatorCell from './MarkdownSeparatorCell';

export default function MarkdownSeparatorRow() {

  let columnCount = useSelector(state => state.table.get('columnCount'));
  
  const columns = Array(columnCount).fill().map((_, i) => (
    <MarkdownSeparatorCell key={i} columnIndex={i} />
  ));

  return (
    <div>
      { columns }
    </div>
  )
};
