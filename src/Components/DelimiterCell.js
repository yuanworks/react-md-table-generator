import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function DelimiterCell({ columnIndex }) {
  
  const lastColumn = useSelector(TableSelectors.isLastColumn(columnIndex));
  
  return (
    <span>| --- { lastColumn && '|'}</span>
  );

}