import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import classnames from 'classnames';

import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import * as TableUtil from '../utils/TableUtil';

export default function Cell({ rowIndex, columnIndex }) {

  const value = useSelector(TableSelectors.getCellValue(rowIndex, columnIndex));
  const unescapedString = TableUtil.unescapeMarkdown(value);
  
  const editingCell = useSelector(TableSelectors.isEditingCell(rowIndex, columnIndex));
  const isExtraCell = useSelector(TableSelectors.isExtraCell(rowIndex, columnIndex));
  
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
        onBlur={null && clearEditingCell}
        onKeyDown={handleKeyPress}
      />
    );
  }

  const renderCell = () => {
    return (
      <ContentEditable
        html={unescapedString || ''}
        onChange={e => editValue(TableUtil.htmlToMarkdown(e.target.value))}
        className='cell-value'
      />
    );
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
    ? <th className={classnames('cell', {'extra': isExtraCell})}>{editingCell ? renderEditing() : renderCell() }</th>
    : <td className={classnames('cell', {'extra': isExtraCell})}>{editingCell ? renderEditing() : renderCell() }</td>
  )
}
