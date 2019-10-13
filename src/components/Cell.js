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
  const editValue        = e => dispatch(TableActions.editValue(rowIndex, columnIndex, TableUtil.htmlToMarkdown(e.target.value)));
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
        onChange={editValue}
        onFocus={setEditingCell}
        /*onBlur={clearEditingCell}*/
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

  return (
    <td className={classnames({'extra': isExtraCell, 'table-head': isHeader})}>
      { renderCell() }
    </td>
  )
}
