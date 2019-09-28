import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function MarkdownCell({ rowIndex, columnIndex }) {

  const value = useSelector(TableSelectors.getCellValue(rowIndex, columnIndex));
  const lastColumn = useSelector(TableSelectors.isLastColumn(columnIndex));
  const maxColumnLength = useSelector(TableSelectors.getMaxColumnLength(columnIndex));

  console.log(maxColumnLength, rowIndex);
  
  let extraSpaces;
  const cellLength = (value && value.length) || 0;

  if (maxColumnLength - cellLength > 0) {
    extraSpaces = ' '.repeat(maxColumnLength - cellLength);
  }

  return (
    <span>| {value}{extraSpaces} { lastColumn && '|'}</span>
  );
}
