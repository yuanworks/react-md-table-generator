import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function DelimiterCell({ columnIndex }) {
  
  const lastColumn = useSelector(TableSelectors.isLastColumn(columnIndex));
  const maxColumnLength = useSelector(TableSelectors.getMaxColumnLength(columnIndex));

  let delimiters = '---';

  if (maxColumnLength > 3) {
    delimiters = Array(maxColumnLength).fill('-').join('');
  }

  return (
    <span>| {delimiters} { lastColumn && '|'}</span>
  );

}