import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function Table() {

  const rowCount = useSelector(TableSelectors.getRowCount());
  const rows = Array(rowCount-1).fill(0);

  return (
    <table>
      <thead>
        <Row key={0} rowIndex={0} />
      </thead>

      <tbody>
        { rows && rows.map((_, i) => (
          <Row key={i+1} rowIndex={i+1} />
        ))}
      </tbody>

    </table>
  )
};
