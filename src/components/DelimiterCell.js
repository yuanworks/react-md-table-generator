import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function DelimiterCell({ columnIndex }) {
  
  const lastColumn = useSelector(TableSelectors.isLastColumn(columnIndex));
  const maxCellLength = useSelector(TableSelectors.getMaxCellLength());

  let delimiters = '---';

  if (maxCellLength) {
    delimiters = Array(maxCellLength).fill('-').join('');
  }

  return (
    <span>| {delimiters} { lastColumn && '|'}</span>
  );

}