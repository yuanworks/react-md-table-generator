import React from 'react';
import { useSelector } from 'react-redux';
import * as tableSelectors from '../redux/selectors/tableSelectors';

export default function MarkdownCell({ rowIndex, columnIndex }) {

  const value = useSelector(tableSelectors.getCellValue(rowIndex, columnIndex));
  const lastColumn = useSelector(tableSelectors.isLastColumn(columnIndex));
  return (
    <span>|{value}{ lastColumn && '|'}</span>
  );
}
