import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function MarkdownCell({ rowIndex, columnIndex }) {

  const value           = useSelector(TableSelectors.getCellValue(rowIndex, columnIndex, { removeLastBR: true }));
  const lastColumn      = useSelector(TableSelectors.isLastColumn(columnIndex));
  const adjustWidth     = useSelector(TableSelectors.getAdjustWidth());
  let   maxColumnLength = useSelector(TableSelectors.getMaxColumnLength(columnIndex));

  let extraSpaces = '';

  if (adjustWidth) {

    maxColumnLength = Math.max(maxColumnLength, 3);

    const cellLength = (value && value.length) || 0;

    if (maxColumnLength - cellLength > 0) {
      extraSpaces = ' '.repeat(maxColumnLength - cellLength);
    }
  }

  return (
    <span>| {value}{extraSpaces} { lastColumn && '|'}</span>
  );
}
