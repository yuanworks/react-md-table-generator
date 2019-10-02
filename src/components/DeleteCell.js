import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';

import { TiDelete } from 'react-icons/ti';

export default function DeleteCell({ rowIndex }) {

  const isExtraCell = useSelector(TableSelectors.isExtraCell(rowIndex));

  const dispatch  = useDispatch();
  const deleteRow = () => dispatch(TableActions.deleteRow(rowIndex));

  const isHeader = (rowIndex === 0);

  const deleteIcon = <TiDelete className='delete-icon' size={24} color='#c3c3c3' onClick={deleteRow} />;

  return ((isHeader || isExtraCell)
    ? <th className='delete-cell' />
    : <td className='delete-cell'>{ deleteIcon }</td>
  );
}
