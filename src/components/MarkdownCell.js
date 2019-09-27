import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function MarkdownCell({ rowIndex, columnIndex }) {

  const value = useSelector(TableSelectors.getCellValue(rowIndex, columnIndex));
  const lastColumn = useSelector(TableSelectors.isLastColumn(columnIndex));
  const maxCellLength = useSelector(TableSelectors.getMaxCellLength());

  let extraSpaces;
  const cellLength = (value && value.length) || 0;

  if (maxCellLength - cellLength > 0) {
    extraSpaces = ' '.repeat(maxCellLength - cellLength);
  }

  return (
    <span>| {value}{extraSpaces} { lastColumn && '|'}</span>
  );
}
