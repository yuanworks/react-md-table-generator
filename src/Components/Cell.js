import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as tableActions from '../redux/actions/tableActions';

export default function Cell({ rowIndex, columnIndex }) {

  const [ editing, setEditing ] = useState(false);
  
  const value = useSelector(state => state.table.getIn([ 'rows', rowIndex, columnIndex ]));
  const dispatch = useDispatch();
  const editCell = value => dispatch(tableActions.editCell(rowIndex, columnIndex, value));

  const renderEditing = () => {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => editCell(e.target.value)}
        onBlur={() => setEditing(false)}
        onKeyPress={handleKeyPress}
      />
    );
  }

  const renderCell = () => {
    return <span>{ value }</span>
  }

  const handleKeyPress = e => {
    switch(e.key) {
      case 'Enter':
        setEditing(false);
        break;
    }
  }

  return (
    <div className='cell' onClick={() => setEditing(true)}>{editing ? renderEditing() : renderCell() }</div>
  )
}
