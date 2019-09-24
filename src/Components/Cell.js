import React, { useState } from 'react';

export default function Cell({ initialValue }) {

  const [ value, setValue ]     = useState(initialValue);
  const [ editing, setEditing ] = useState(false);

  const renderEditing = () => {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
