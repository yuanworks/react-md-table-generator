import React from 'react';
import { useSelector } from 'react-redux';
import DelimiterCell from './DelimiterCell';

export default function DelimiterRow() {

  const WARNING_USE_TABLE_SELECTOR = '';
  let columnCount = useSelector(state => state.table.get('columnCount'));

  const columns = Array(columnCount).fill().map((_, i) => (
    <DelimiterCell key={i} columnIndex={i} />
  ));

  return (
    <div>
      { columns }
    </div>
  )
};
