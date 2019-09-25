import React from 'react';
import { useSelector } from 'react-redux';

import * as tableSelectors from '../redux/selectors/tableSelectors';

import MarkdownRow from './MarkdownRow';
import MarkdownSeparatorRow from './MarkdownSeparatorRow';

export default function MarkdownTable() {

  const rowCount = useSelector(tableSelectors.getRowCount());
  const hasHeadingRow = useSelector(state => state.table.get('hasHeadingRow'));
  
  const rows = [];

  for (let i = 0; i < rowCount; i++) {
    rows.push(<MarkdownRow key={i} rowIndex={i} />);
    
    (hasHeadingRow && i === 0) && rows.push(<MarkdownSeparatorRow key={i} />);
  }

  return (
    <div className='md-table'>
      { rows }
    </div>
  );
}
