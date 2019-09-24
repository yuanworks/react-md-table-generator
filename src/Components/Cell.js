import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Cell({ initialValue }) {

  const [ value, setValue ]     = useState(initialValue);
  const [ editing, setEditing ] = useState(false);
  
  const test = useSelector(state => state.table.get('test'));
  const dispatch = useDispatch();
  
  const testDispatch = value => dispatch({
    type    : 'test',
    payload : value
  });

  console.log('test', test);

  const renderEditing = () => {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => { setValue(e.target.value); testDispatch(e.target.value) }}
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
