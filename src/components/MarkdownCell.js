import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function MarkdownCell({ rowIndex, columnIndex }) {

  let value = useSelector(TableSelectors.getCellValue(rowIndex, columnIndex, { removeLastBR: true }));
  const lastColumn = useSelector(TableSelectors.isLastColumn(columnIndex));
  let maxColumnLength = useSelector(TableSelectors.getMaxColumnLength(columnIndex));

  maxColumnLength = Math.max(maxColumnLength, 3);

  let extraSpaces;
  const cellLength = (value && value.length) || 0;

  if (maxColumnLength - cellLength > 0) {
    extraSpaces = ' '.repeat(maxColumnLength - cellLength);
  }

  return (
    <span>| {value}{extraSpaces} { lastColumn && '|'}</span>
  );
}
