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
  const columnAlignment = useSelector(TableSelectors.getColumnAlignment(columnIndex));
  
  const dispatch         = useDispatch();
  const editCell         = e => dispatch(TableActions.editCell(rowIndex, columnIndex, TableUtil.htmlToMarkdown(e.target.value), true));
  const moveActiveCell  = direction => dispatch(TableActions.moveActiveCell(direction));
  const setActiveCell   = () => dispatch(TableActions.setActiveCell(rowIndex, columnIndex));
  const clearEditingCell = () => dispatch(TableActions.setActiveCell());
  const insertRow        = () => dispatch(TableActions.insertRow(rowIndex));
  const insertColumn     = () => dispatch(TableActions.insertColumn(columnIndex));

  const editableRef = useRef();

  if (editingCell && editableRef) {
    editableRef.current.el.current.focus();
  }

  const handleKeyPress = e => {
    switch(e.key) {
      case 'ArrowDown':
        moveActiveCell('down');
        break;

      case 'ArrowUp':
        moveActiveCell('up');
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
        onChange={editCell}
        onFocus={setActiveCell}
        /*onBlur={clearEditingCell}*/
        className={classnames('cell-value', { ['align-'+columnAlignment]: columnAlignment })}
        onKeyDown={handleKeyPress}
      />
    </td>
  )
}
