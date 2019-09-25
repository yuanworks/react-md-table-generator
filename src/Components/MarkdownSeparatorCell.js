import React from 'react';
import { useSelector } from 'react-redux';

export default function MarkdownSeparatorCell({ columnIndex }) {
  
  const lastColumn = useSelector(state => state.table.get('columnCount') === columnIndex+1);
  
  console.log('markdown', columnIndex);
  
  return (
    <span>|---{ lastColumn && '|'}</span>
  );

}