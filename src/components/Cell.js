import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function Cell({ rowIndex, columnIndex }) {

  const value = useSelector(TableSelectors.getCellValue(rowIndex, columnIndex));
  
  const editingCell = useSelector(TableSelectors.isEditingCell(rowIndex, columnIndex));
  
  const dispatch         = useDispatch();
  const editValue        = value => dispatch(TableActions.editValue(rowIndex, columnIndex, value));
  const setEditingCell   = () => dispatch(TableActions.setEditingCell(rowIndex, columnIndex));
  const clearEditingCell = () => dispatch(TableActions.setEditingCell());
  const moveEditingCell  = direction => dispatch(TableActions.moveEditingCell(direction));

  const renderEditing = () => {
    return (
      <input
        type='text'
        autoFocus
        value={value || ''}
        onChange={(e) => editValue(e.target.value)}
        onBlur={clearEditingCell}
        onKeyDown={handleKeyPress}
      />
    );
  }

  const renderCell = () => {
    return <span>{ value }</span>
  }

  const handleKeyPress = e => {
    switch(e.key) {
      case 'Enter':
        moveEditingCell('down');
        break;

      case 'Tab':
        moveEditingCell('right');
        break;

      default:
        break;
    }
  }

  return (
    <div className='cell' onClick={setEditingCell} tabIndex={0}>{editingCell ? renderEditing() : renderCell() }</div>
  )
}
