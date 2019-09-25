import React from 'react';
import { useSelector } from 'react-redux';
import * as tableSelectors from '../redux/selectors/tableSelectors';

export default function MarkdownSeparatorCell({ columnIndex }) {
  
  const lastColumn = useSelector(tableSelectors.isLastColumn(columnIndex));
  
  return (
    <span>|---{ lastColumn && '|'}</span>
  );

}