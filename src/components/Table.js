import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import Row from './Row';

import '../styles/Table.scss';

export default function Table() {

  const dispatch = useDispatch();
  const clearActiveCell = () => dispatch(TableActions.clearActiveCell());
  const rowCount = useSelector(TableSelectors.getRowCount());
  const rows = Array(rowCount+1).fill(0);

  return (
    <table className='editable' onBlur={clearActiveCell}>

      <tbody>
        <Row key='delete-row' deleteRow />
        { rows && rows.map((_, i) => (
          <Row key={i} rowIndex={i} />
        ))}
      </tbody>
    </table>
  )
};
