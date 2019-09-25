import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as tableActions from '../redux/actions/tableActions';
import * as tableSelectors from '../redux/selectors/tableSelectors';

export default function Cell({ rowIndex, columnIndex }) {

  const value = useSelector(tableSelectors.getCellValue(rowIndex, columnIndex));
  
  const editingCell = useSelector(state => (
    state.table.get('editingRow') === rowIndex && state.table.get('editingColumn') === columnIndex
  ));
  
  const dispatch         = useDispatch();
  const editValue        = value => dispatch(tableActions.editValue(rowIndex, columnIndex, value));
  const setEditingCell   = () => dispatch(tableActions.setEditingCell(rowIndex, columnIndex));
  const clearEditingCell = () => dispatch(tableActions.setEditingCell());
  const moveEditingCell  = direction => dispatch(tableActions.moveEditingCell(direction));

  const renderEditing = () => {
    return (
      <input
        autoFocus
        value={value}
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
    }
  }

  return (
    <div className='cell' onClick={setEditingCell} tabIndex={0}>{editingCell ? renderEditing() : renderCell() }</div>
  )
}
