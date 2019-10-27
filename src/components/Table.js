import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import Row from './Row';

import '../styles/Table.scss';

export default function Table() {

  const dispatch = useDispatch();
  const rowCount = useSelector(TableSelectors.getRowCount());
  const rows = Array(rowCount+1).fill(0);

  return (
    <table className='editable' onBlur={e => console.log('blur', e.target)}>

      <tbody>
        <Row key='delete-row' deleteRow />
        { rows && rows.map((_, i) => (
          <Row key={i} rowIndex={i} />
        ))}
      </tbody>
    </table>
  )
};
