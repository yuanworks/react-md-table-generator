import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function CellValueInput() {

  const dispatch = useDispatch();
  const editCell = e => dispatch(TableActions.editActiveCell(e.target.value));
  const value = useSelector(TableSelectors.getEditingCellValue({ removeLastBR: true }));

  return (
    <input className='cell-value-input' value={value || ''} onChange={editCell} disabled={!value} />
  );
}
