import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';

import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';

import { TiDelete } from 'react-icons/ti';

export default function DeleteCell({ rowIndex, columnIndex }) {

  const isExtraCell = useSelector(TableSelectors.isExtraCell(rowIndex, columnIndex));
  const isEditingRow = useSelector(TableSelectors.isEditingRow(rowIndex));
  const isEditingColumn = useSelector(TableSelectors.isEditingColumn(columnIndex));
  
  const dispatch  = useDispatch();
  const deleteRow = () => dispatch(TableActions.deleteRow(rowIndex));
  const deleteColumn = () => dispatch(TableActions.deleteColumn(columnIndex));
  const handleDelete = () => rowIndex !== undefined ? deleteRow() : deleteColumn();

  const isHeader = (rowIndex === 0);
  const visible = isEditingRow || isEditingColumn;

  const opacity = useSpring({ opacity: visible ? 1 : 0, from: { opacity: 0 }, delay: 250 });

  const deleteIcon = visible && (
    <animated.div style={opacity}>
      <TiDelete className='delete-icon' size={24} onClick={handleDelete} />
    </animated.div>
  );

  return (
    <td className='delete-cell'>{ !isHeader && !isExtraCell && deleteIcon }</td>
  );
}
