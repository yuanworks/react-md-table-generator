import React from 'react';
import { useSelector } from 'react-redux';
import MarkdownRow from './MarkdownRow';
import MarkdownSeparatorRow from './MarkdownSeparatorRow';

export default function MarkdownTable() {

  const rowCount = useSelector(state => state.table.get('rowCount'));
  //const rows = Array(rowCount).fill().map((_, i) => <MarkdownRow key={i} rowIndex={i} />);

  const rows = [];

  for (let i = 0; i < rowCount; i++) {
    rows.push(<MarkdownRow key={i} rowIndex={i} />);
    
    (i === 0) && rows.push(<MarkdownSeparatorRow key={i} />);
  }

  return (
    <div>
      { rows }
    </div>
  );
}
