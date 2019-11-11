import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function DelimiterCell({ columnIndex }) {
  
  const lastColumn      = useSelector(TableSelectors.isLastColumn(columnIndex));
  const maxColumnLength = useSelector(TableSelectors.getMaxColumnLength(columnIndex));
  const columnAlignment = useSelector(TableSelectors.getColumnAlignment(columnIndex));
  const adjustWidth     = useSelector(TableSelectors.getAdjustWidth());

  let delimiters = '---';

  if (adjustWidth && maxColumnLength > 3) {
    delimiters = Array(maxColumnLength).fill('-').join('');
  }

  const leftAlign = (columnAlignment === 'left' || columnAlignment === 'center')? ':' : ' ';
  const rightAlign = (columnAlignment === 'right' || columnAlignment === 'center')? ':' : ' ';

  return (
    <span>|{leftAlign}{delimiters}{rightAlign}{lastColumn && '|'}</span>
  );

}