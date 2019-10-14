import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import classnames from 'classnames';

import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import * as TableUtil from '../utils/TableUtil';
import { TiPlusOutline } from 'react-icons/ti';

export default function Cell({ rowIndex, columnIndex }) {
  const value = useSelector(TableSelectors.getCellValue(rowIndex, columnIndex));
  const unescapedString = TableUtil.unescapeMarkdown(value);
  
  const editingCell = useSelector(TableSelectors.isEditingCell(rowIndex, columnIndex));
  const isExtraCell = useSelector(TableSelectors.isExtraCell(rowIndex, columnIndex));
  
  const dispatch         = useDispatch();
  const editValue        = e => dispatch(TableActions.editValue(rowIndex, columnIndex, TableUtil.htmlToMarkdown(e.target.value)));
  const moveEditingCell  = direction => dispatch(TableActions.moveEditingCell(direction));
  const setEditingCell   = () => dispatch(TableActions.setEditingCell(rowIndex, columnIndex));
  const clearEditingCell = () => dispatch(TableActions.setEditingCell());
  const insertRow        = () => dispatch(TableActions.insertRow(rowIndex));
  const insertColumn     = () => dispatch(TableActions.insertColumn(columnIndex));

  const editableRef = useRef();

  if (editingCell && editableRef) {
    editableRef.current.el.current.focus();
  }

  const handleKeyPress = e => {
    switch(e.key) {
      case 'ArrowDown':
        moveEditingCell('down');
        break;

      case 'ArrowUp':
        moveEditingCell('up');
        break;

      default:
        break;
    }
  }

  const isHeader = (rowIndex === 0);
  const showInsertIcons = editingCell && editableRef && !isExtraCell && !isHeader;

  return (
    <td className={classnames({'extra': isExtraCell, 'table-head': isHeader})}>
      { showInsertIcons &&
        <>
          <div className='insert-row'><TiPlusOutline className='insert-icon' onClick={insertRow} /></div>
          <div className='insert-column'><TiPlusOutline className='insert-icon' onClick={insertColumn} /></div>
        </>
      }
      <ContentEditable
        ref={editableRef}
        html={unescapedString || ''}
        onChange={editValue}
        onFocus={setEditingCell}
        /*onBlur={clearEditingCell}*/
        className='cell-value'
        onKeyDown={handleKeyPress}
      />
    </td>
  )
}
