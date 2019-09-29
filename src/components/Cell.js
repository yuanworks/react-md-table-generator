import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import * as TableUtil from '../utils/TableUtil';

export default function Cell({ rowIndex, columnIndex }) {

  const value = useSelector(TableSelectors.getCellValue(rowIndex, columnIndex));
  const unescapedString = TableUtil.unescapeMarkdown(value);
  
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
    return <div className='cell-value'>{ unescapedString }</div>
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

  const isHeader = (rowIndex === 0);

  return (isHeader
    ? <th className='cell' onClick={setEditingCell} tabIndex={0}>{editingCell ? renderEditing() : renderCell() }</th>
    : <td className='cell' onClick={setEditingCell} tabIndex={0}>{editingCell ? renderEditing() : renderCell() }</td>
  )
}
